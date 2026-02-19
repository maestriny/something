import { View, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import DraggableFlatList, { type RenderItemParams } from 'react-native-draggable-flatlist';
import { AppInput } from '@/components/atoms/AppInput';
import { AppText } from '@/components/atoms/AppText';
import { TodoItem } from '@/components/molecules/TodoItem';
import { QuickMenu } from '@/components/molecules/QuickMenu';
import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { useTodoStore } from '@/stores/todo';
import { useAuthStore } from '@/stores/auth';
import { useActiveTodos } from '@/hooks/useTodos';
import { useWaveTransition } from '@/providers/waveTransition';
import { useTheme } from '@/providers/theme';
import { Routes } from '@/constants/routes';
import { Spacing, FontSize } from '@/constants/theme';
import type { Todo } from '@/types/todo';
import { AppButton } from '@/components/atoms/AppButton';

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { startTransition } = useWaveTransition();
  const { colors } = useTheme();
  const { user, logout } = useAuthStore();

  // state for quick menu visibility
  const [showMenu, setShowMenu] = useState(false);

  const handleQuickLogout = () => {
    startTransition(router, Routes.auth.login);
    logout();
  };

  // store and state
  const activeTodos = useActiveTodos();
  const addTodo = useTodoStore(s => s.addTodo);
  const toggleTodo = useTodoStore(s => s.toggleTodo);
  const reorderTodos = useTodoStore(s => s.reorderTodos);
  const [inputText, setInputText] = useState('');

  // trim input and add new todo
  const handleAdd = useCallback(() => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setInputText('');
  }, [inputText, addTodo]);

  // navigate to todo detail screen
  const handlePress = useCallback(
    (id: string) => {
      router.push({ pathname: Routes.app.todoDetail, params: { id } });
    },
    [router],
  );

  // reorder todos after drag and drop
  const handleDragEnd = useCallback(
    ({ data }: { data: Todo[] }) => {
      reorderTodos(data.map(t => t.id));
    },
    [reorderTodos],
  );

  // render function for each todo item in the list
  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<Todo>) => (
      <TodoItem
        todo={item}
        onToggle={toggleTodo}
        onPress={handlePress}
        drag={drag}
        isActive={isActive}
      />
    ),
    [toggleTodo, handlePress],
  );

  // extract unique key for each todo item
  const keyExtractor = useCallback((item: Todo) => item.id, []);

  return (
    <ScreenLayout
      title={t('todo.heading')}
      rightButton="settings"
      rightSecondaryButton="completed"
      onSettingsLongPress={() => setShowMenu(true)}
      fadeIn
    >
      {/* input + add button for new todo item */}
      <View style={styles.inputRow}>
        <AppInput
          variant="minimal"
          value={inputText}
          onChangeText={setInputText}
          placeholder={t('todo.placeholder')}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
          autoCapitalize="none"
          maxLength={220}
          rightSection={
            <AppButton
              icon="IconPlus"
              iconOnly
              variant="ghost"
              color={colors.primary}
              size="lg"
              onPress={handleAdd}
            />
          }
        />
      </View>

      {/* list of active todos */}
      {activeTodos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AppText style={[styles.emptyText, { color: colors.textSecondary }]}>
            {t('todo.emptyHome')}
          </AppText>
        </View>
      ) : (
        <DraggableFlatList
          data={activeTodos}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onDragEnd={handleDragEnd}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={styles.listFooter} />}
        />
      )}

      {/* quick menu for theme settings and logout */}
      <QuickMenu
        visible={showMenu}
        onClose={() => setShowMenu(false)}
        username={user?.username ?? ''}
        email={user?.email ?? ''}
        onLogout={handleQuickLogout}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  list: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: Spacing.xxl * 2,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: FontSize.md,
    lineHeight: FontSize.md * 1.6,
  },
  listFooter: {
    height: Spacing.xxl * 3,
  },
});
