import { useState, useCallback, useEffect, useRef } from 'react';
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
import { useKeyboardHeight } from '@/hooks/useKeyboardHeight';
import dayjs from '@/lib/dayjs';
import { Fonts, FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/providers/theme';

export default function TodoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const router = useRouter();
  const { colors } = useTheme();
  const scrollRef = useRef<ScrollView>(null);

  const todo = useTodoStore(s => s.todos.find(item => item.id === id));
  const updateTodo = useTodoStore(s => s.updateTodo);
  const removeTodo = useTodoStore(s => s.removeTodo);

  // local state for editable fields
  const [text, setText] = useState(todo?.text ?? '');
  const [dueDate, setDueDate] = useState<string | undefined>(todo?.dueDate);
  const [categoryId, setCategoryId] = useState<string | undefined>(todo?.categoryId);
  // currently expanded section
  const [expandedSection, setExpandedSection] = useState<'date' | 'category' | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const keyboardHeight = useKeyboardHeight();

  useEffect(() => {
    if (!todo) {
      router.back();
    }
  }, [todo, router]);

  // save changes and go back to home screen
  const handleClose = useCallback(() => {
    if (!todo) return;
    const trimmed = text.trim();
    if (trimmed) {
      updateTodo(todo.id, { text: trimmed, dueDate, categoryId });
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
        containerStyle={
          keyboardHeight > 0 && {
            justifyContent: 'flex-end',
            paddingBottom: keyboardHeight + Spacing.lg,
          }
        }
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
                {dayjs(todo.createdAt).format('LL')}
              </AppText>
            </View>

            <ScrollView
              ref={scrollRef}
              scrollEnabled={expandedSection !== null} // only allow scrolling when a section is expanded
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              style={styles.scrollView}
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
                autoCapitalize="none"
                maxLength={220}
                autoFocus
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
          <View style={{ backgroundColor: colors.surface }}>
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
          </View>
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
    flexGrow: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  createdAt: {
    fontSize: FontSize.sm,
  },
  textInput: {
    fontSize: FontSize.md,
    fontFamily: Fonts.regular,
    minHeight: Spacing.xxl,
    textAlignVertical: 'top',
    marginBottom: Spacing.md,
  },
  formHeader: {
    marginBottom: Spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
});
