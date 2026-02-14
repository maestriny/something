import { View, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { IconChevronDown, IconPlus } from '@tabler/icons-react-native';
import { AppText } from '@/components/atoms/AppText';
import { TodoItem } from '@/components/molecules/TodoItem';
import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { useTodoStore } from '@/stores/todo';
import { Routes } from '@/constants/routes';
import { Colors, Spacing, Fonts, FontSize, IconSize, Opacity } from '@/constants/theme';
import type { Todo } from '@/types/todo';

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const todos = useTodoStore(s => s.todos);
  const addTodo = useTodoStore(s => s.addTodo);
  const toggleTodo = useTodoStore(s => s.toggleTodo);

  const activeTodos = todos.filter(todo => !todo.done);
  const [inputText, setInputText] = useState('');

  const handleAdd = useCallback(() => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setInputText('');
  }, [inputText, addTodo]);

  const renderItem = useCallback(
    ({ item }: { item: Todo }) => <TodoItem todo={item} onToggle={toggleTodo} />,
    [toggleTodo],
  );

  const keyExtractor = useCallback((item: Todo) => item.id, []);

  return (
    <ScreenLayout
      title={t('todo.heading')}
      rightButton="settings"
      footer={
        // link to completed todos
        <Pressable
          onPress={() => router.push(Routes.app.completed)}
          style={({ pressed }) => [styles.completedLink, pressed && { opacity: Opacity.active }]}
          accessibilityRole="link"
          accessibilityLabel={t('todo.completed')}
        >
          <IconChevronDown size={IconSize.lg} color={Colors.textPrimary} />
          <AppText style={styles.completedText}>{t('todo.completed')}</AppText>
        </Pressable>
      }
    >
      {/* input + add button for new todo item */}
      <View style={styles.inputRow}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder={t('todo.placeholder')}
          placeholderTextColor={Colors.placeholder}
          style={styles.input}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
          maxLength={220}
        />
        <Pressable
          onPress={handleAdd}
          hitSlop={8}
          style={({ pressed }) => [pressed && { opacity: Opacity.active }]}
          accessibilityRole="button"
          accessibilityLabel={t('todo.add')}
        >
          <IconPlus size={IconSize.md} color={Colors.primary} />
        </Pressable>
      </View>

      {/* list of active todos */}
      <FlatList
        data={activeTodos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={[styles.list, activeTodos.length === 0 && styles.listEmpty]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={activeTodos.length > 0}
        ListEmptyComponent={<AppText style={styles.emptyText}>{t('todo.emptyHome')}</AppText>}
        ListFooterComponent={<View style={styles.listFooter} />}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
    paddingBottom: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
  },
  list: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  listEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: Spacing.xxl * 2,
  },
  completedLink: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: Spacing.lg,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: FontSize.md * 1.6,
  },
  completedText: {
    marginLeft: Spacing.sm,
    fontFamily: Fonts.semiBold,
    fontSize: FontSize.lg,
  },
  listFooter: {
    height: Spacing.xxl * 3,
  },
});
