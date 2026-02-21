import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import i18n from '@/lib/i18n';
import dayjs from '@/lib/dayjs';
import { isUrgent } from '@/lib/utils';
import {
  MORNING_HOUR,
  MORNING_MINUTE,
  CHANNEL_DAILY,
  CHANNEL_REMINDER,
} from '@/constants/notifications';
import type { ParseKeys } from 'i18next';
import type { Todo } from '@/types/todo';

// show notifications as banners even when the app is in foreground
export function configureNotificationHandler(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

// create android notification channels (no-op on ios)
export async function setupAndroidChannels(): Promise<void> {
  if (Platform.OS !== 'android') return;

  await Notifications.setNotificationChannelAsync(CHANNEL_DAILY, {
    name: i18n.t('notifications.channels.daily'),
    importance: Notifications.AndroidImportance.DEFAULT,
  });

  await Notifications.setNotificationChannelAsync(CHANNEL_REMINDER, {
    name: i18n.t('notifications.channels.reminder'),
    importance: Notifications.AndroidImportance.HIGH,
  });
}

// request notification permissions (returns true if granted, false if denied or dismissed)
export async function requestPermissions(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// cancel all previously scheduled notifications
export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// cancel existing notifications, requests permissions, and schedules all reminders
export async function scheduleAllNotifications(todos: Todo[]): Promise<boolean> {
  await cancelAllNotifications();

  const granted = await requestPermissions();
  if (!granted) return false;

  const pendingTodos = todos.filter(t => !t.done);

  await scheduleMorningBriefing(pendingTodos);
  await scheduleTaskReminders(pendingTodos);
  return true;
}

// schedule a daily briefing with the total and urgent todo count
async function scheduleMorningBriefing(pendingTodos: Todo[]): Promise<void> {
  if (pendingTodos.length === 0) return;

  const urgentCount = pendingTodos.filter(t => isUrgent(t)).length;
  const totalCount = pendingTodos.length;

  const body =
    urgentCount > 0
      ? i18n.t('notifications.morningBriefing.bodyWithUrgent', {
          total: totalCount,
          urgent: urgentCount,
        })
      : i18n.t('notifications.morningBriefing.body', { total: totalCount });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: i18n.t('notifications.morningBriefing.title'),
      body,
      ...(Platform.OS === 'android' ? { channelId: CHANNEL_DAILY } : {}),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: MORNING_HOUR,
      minute: MORNING_MINUTE,
    },
  });
}

// schedules a notification at MORNING_HOUR relative to a due date, only if the date is in the future
function scheduleAtMorning(
  baseDay: dayjs.Dayjs,
  offsetDays: number,
  titleKey: ParseKeys,
  bodyKey: ParseKeys,
  taskText: string,
): Promise<string> | undefined {
  const date = baseDay.add(offsetDays, 'day').hour(MORNING_HOUR).minute(MORNING_MINUTE).second(0);

  if (!date.isAfter(dayjs())) return;

  return Notifications.scheduleNotificationAsync({
    content: {
      title: i18n.t(titleKey),
      body: i18n.t(bodyKey, { task: taskText }),
      ...(Platform.OS === 'android' ? { channelId: CHANNEL_REMINDER } : {}),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: date.toDate(),
    },
  });
}

// schedules due tomorrow and overdue reminders for each todo with a due date
async function scheduleTaskReminders(pendingTodos: Todo[]): Promise<void> {
  const todosWithDueDate = pendingTodos.filter(t => t.due_date !== null);

  for (const todo of todosWithDueDate) {
    const dueDay = dayjs(todo.due_date);
    await scheduleAtMorning(
      dueDay,
      -1,
      'notifications.taskDueTomorrow.title',
      'notifications.taskDueTomorrow.body',
      todo.text,
    );
    await scheduleAtMorning(
      dueDay,
      +1,
      'notifications.taskOverdue.title',
      'notifications.taskOverdue.body',
      todo.text,
    );
  }
}
