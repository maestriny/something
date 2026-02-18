import { View, FlatList, StyleSheet } from 'react-native';
import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/components/atoms/AppText';
import { TodoItem } from '@/components/molecules/TodoItem';
import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { useTodoStore } from '@/stores/todo';
import { useDoneTodos } from '@/hooks/useTodos';
import { Routes } from '@/constants/routes';
import { Spacing, FontSize, Colors } from '@/constants/theme';
import type { Todo } from '@/types/todo';

export default function CompletedScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const done = useDoneTodos();
  const toggleTodo = useTodoStore(s => s.toggleTodo);

  const handlePress = useCallback(
    (id: string) => {
      router.push({ pathname: Routes.app.todoDetail, params: { id } });
    },
    [router],
  );

  const renderItem = useCallback(
    ({ item }: { item: Todo }) => (
      <TodoItem todo={item} onToggle={toggleTodo} onPress={handlePress} />
    ),
    [toggleTodo, handlePress],
  );

  const keyExtractor = useCallback((item: Todo) => item.id, []);

  return (
    <ScreenLayout title={t('todo.completed')} leftButton="back">
      <FlatList
        data={done}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={[styles.list, done.length === 0 && styles.listEmpty]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={done.length > 0}
        ListEmptyComponent={<AppText style={styles.emptyText}>{t('todo.emptyCompleted')}</AppText>}
        ListFooterComponent={<View style={styles.listFooter} />}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  listEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: Spacing.xxl * 2,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: FontSize.md * 1.6,
  },
  listFooter: {
    height: Spacing.xxl * 3,
  },
});
