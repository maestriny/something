import { useCallback, useState } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { AppRow } from '@/components/atoms/AppRow';
import { AppButton } from '@/components/atoms/AppButton';
import dayjs from '@/lib/dayjs';
import { Colors, Spacing } from '@/constants/theme';

interface DueDateRowProps {
  dueDate: string | undefined;
  onDueDateChange: (date: string | undefined) => void;
  expanded: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function DueDateRow({
  dueDate,
  onDueDateChange,
  expanded,
  onToggle,
  disabled,
}: DueDateRowProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Due date row */}
      <AppRow
        icon="IconCalendar"
        label={t('todo.detail.dueDate')}
        value={dueDate ? dayjs(dueDate).format('LL') : undefined}
        onPress={onToggle}
        onClear={dueDate ? () => onDueDateChange(undefined) : undefined}
        expanded={expanded}
        disabled={disabled}
      />

      {expanded && (
        <DueDatePicker dueDate={dueDate} onDueDateChange={onDueDateChange} onToggle={onToggle} />
      )}
    </>
  );
}

interface DueDatePickerProps {
  dueDate: string | undefined;
  onDueDateChange: (date: string | undefined) => void;
  onToggle: () => void;
}

function DueDatePicker({ dueDate, onDueDateChange, onToggle }: DueDatePickerProps) {
  const { t } = useTranslation();
  // internal state for selected date, initialized to current due date or today
  const [date, setDate] = useState<Date>(dueDate ? new Date(dueDate) : new Date());

  const handleDateChange = useCallback((_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, []);

  const handleConfirm = useCallback(() => {
    onDueDateChange(date.toISOString());
    onToggle();
  }, [date, onDueDateChange, onToggle]);

  return (
    <>
      {/* Date picker */}
      <View style={styles.datePickerWrapper}>
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          minimumDate={new Date()}
          onChange={handleDateChange}
          accentColor={Colors.primary}
        />
      </View>

      {/* Confirm button */}
      <AppButton
        title={t('common.confirm')}
        variant="primary"
        size="md"
        onPress={handleConfirm}
        style={styles.confirm}
      />
    </>
  );
}

const styles = StyleSheet.create({
  datePickerWrapper: {
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 0.95 }],
    transformOrigin: 'center',
  },
  confirm: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.lg,
  },
});
