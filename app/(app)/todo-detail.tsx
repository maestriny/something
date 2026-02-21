import { useState, useCallback, useRef } from 'react';
import { View, TextInput, ScrollView, Keyboard, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@/components/atoms/AppButton';
import { AppCard } from '@/components/atoms/AppCard';
import { AppText } from '@/components/atoms/AppText';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { DueDateRow } from '@/components/molecules/DueDateRow';
import { CategoryRow } from '@/components/molecules/CategoryRow';
import { CategoryForm } from '@/components/molecules/CategoryForm';
import { useTodoStore } from '@/stores/todo';
import Animated, { FadeIn } from 'react-native-reanimated';
import dayjs from '@/lib/dayjs';
import { Fonts, FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/providers/theme';
import { useKeyboardShift } from '@/hooks/useKeyboardShift';

export default function TodoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return null;

  return <TodoDetailContent key={id} id={id} />;
}

function TodoDetailContent({ id }: { id: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { colors } = useTheme();
  const scrollRef = useRef<ScrollView>(null);

  const todo = useTodoStore(s => s.todos.find(item => item.id === id));
  const updateTodo = useTodoStore(s => s.updateTodo);
  const removeTodo = useTodoStore(s => s.removeTodo);

  // local state for editable fields
  const [text, setText] = useState(todo?.text ?? '');
  const [dueDate, setDueDate] = useState<string | undefined>(todo?.due_date ?? undefined);
  const [categoryId, setCategoryId] = useState<string | undefined>(todo?.category_id ?? undefined);
  // currently expanded section
  const [expandedSection, setExpandedSection] = useState<'date' | 'category' | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { animatedStyle: containerAnimatedStyle, onLayout: onCardLayout } = useKeyboardShift();

  // save changes and go back to home screen
  const handleClose = useCallback(() => {
    if (!todo) return;
    const trimmed = text.trim();
    if (trimmed) {
      updateTodo(todo.id, {
        text: trimmed,
        due_date: dueDate || null,
        category_id: categoryId || null,
      });
    }
    router.back();
  }, [todo, text, dueDate, categoryId, updateTodo, router]);

  // toggle expand/collapse of due date and category rows (mutually exclusive)
  // also dismiss keyboard when toggling
  const toggleSection = useCallback((section: 'date' | 'category') => {
    Keyboard.dismiss();
    setExpandedSection(current => (current === section ? null : section));
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (!todo) return;
    removeTodo(todo.id);
    router.back();
  }, [todo, removeTodo, router]);

  if (!todo) return null;

  return (
    <>
      <AppCard
        onClose={handleClose}
        animated
        containerStyle={containerAnimatedStyle}
        onCardLayout={onCardLayout}
        style={styles.card}
      >
        {!showCategoryForm ? (
          <>
            {/* Header: close button + todo creation date  */}
            <View style={styles.header}>
              <AppButton
                icon="IconX"
                iconOnly
                variant="ghost"
                color={colors.textMuted}
                onPress={handleClose}
              />
              <AppText style={[styles.createdAt, { color: colors.textMuted }]}>
                {dayjs(todo.created_at).format('LL')}
              </AppText>
            </View>

            <ScrollView
              ref={scrollRef}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Todo text */}
              <TextInput
                value={text}
                onChangeText={setText}
                placeholder={t('todo.detail.textPlaceholder')}
                placeholderTextColor={colors.placeholder}
                cursorColor={colors.primary}
                selectionColor={colors.primary}
                style={[styles.textInput, { color: colors.textPrimary }]}
                multiline
                autoCapitalize="sentences"
                maxLength={220}
              />

              {/* Due date row */}
              <DueDateRow
                dueDate={dueDate}
                onDueDateChange={setDueDate}
                expanded={expandedSection === 'date'}
                onToggle={() => toggleSection('date')}
                disabled={todo.done}
              />

              {/* Category row */}
              <CategoryRow
                categoryId={categoryId}
                onCategoryChange={setCategoryId}
                expanded={expandedSection === 'category'}
                onToggle={() => toggleSection('category')}
                onEdit={() => setShowCategoryForm(true)}
                disabled={todo.done}
              />
            </ScrollView>

            {/* Delete button */}
            <View style={styles.actions}>
              <AppButton
                title={t('todo.detail.delete')}
                variant="danger"
                size="sm"
                icon="IconTrash"
                onPress={() => setShowDeleteDialog(true)}
              />
            </View>
          </>
        ) : (
          <Animated.View
            entering={FadeIn.duration(200)}
            style={{ backgroundColor: colors.surface }}
          >
            {/* Category Form subscreen */}
            <View style={[styles.header, styles.formHeader]}>
              <AppButton
                icon="IconArrowLeft"
                iconOnly
                variant="ghost"
                color={colors.textMuted}
                onPress={() => setShowCategoryForm(false)}
              />
            </View>
            <CategoryForm
              onDone={newCategoryId => {
                if (newCategoryId) setCategoryId(newCategoryId);
                setShowCategoryForm(false);
              }}
            />
          </Animated.View>
        )}
      </AppCard>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        visible={showDeleteDialog}
        title={t('todo.detail.deleteConfirmTitle')}
        message={t('todo.detail.deleteConfirmMessage')}
        confirmText={t('todo.detail.deleteConfirmYes')}
        cancelText={t('todo.detail.deleteConfirmNo')}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteDialog(false)}
        destructive
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.lg,
    maxHeight: '90%',
  },
  scrollView: {
    flexShrink: 1,
  },
  scrollContent: {
    marginVertical: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  createdAt: {
    fontSize: FontSize.sm,
  },
  textInput: {
    fontSize: FontSize.md,
    fontFamily: Fonts.regular,
    minHeight: Spacing.xxl,
    textAlignVertical: 'top',
    marginBottom: Spacing.sm,
  },
  formHeader: {
    marginBottom: Spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
