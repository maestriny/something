import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@/components/atoms/AppButton';
import { AppTag } from '@/components/atoms/AppTag';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { useCategoryStore } from '@/stores/category';
import { Spacing } from '@/constants/theme';
import { useCategoryLabel } from '@/hooks/useCategoryLabel';
import { useTheme } from '@/providers/theme';
import type { Category } from '@/types/category';

interface CategoryPickerProps {
  selectedId?: string;
  onSelect: (categoryId: string | undefined) => void;
  onEdit?: () => void;
}

export function CategoryPicker({ selectedId, onSelect, onEdit }: CategoryPickerProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const categoryLabel = useCategoryLabel();
  const categories = useCategoryStore(s => s.categories);
  const removeCategory = useCategoryStore(s => s.removeCategory);

  // state for category pending deletion
  const [toDelete, setToDelete] = useState<Category | null>(null);

  // toggle selection: if already selected, deselect. otherwise select new
  const handleTagPress = useCallback(
    (category: Category) => {
      onSelect(selectedId === category.id ? undefined : category.id);
    },
    [selectedId, onSelect],
  );

  const handleConfirmDelete = useCallback(() => {
    if (!toDelete) return;
    if (selectedId === toDelete.id) onSelect(undefined);
    removeCategory(toDelete.id);
    setToDelete(null);
  }, [toDelete, selectedId, onSelect, removeCategory]);

  //  button to add new category
  const addButton = (
    <AppButton
      iconOnly
      icon="IconPlus"
      size="md"
      variant="secondary"
      color={colors.textMuted}
      onPress={onEdit}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.tagRow}>
        {categories.map((category: Category, index: number) => {
          const isSelected = category.id === selectedId;
          const isLast = index === categories.length - 1;
          const tag = (
            <View key={category.id} style={styles.tagWrapper}>
              {/* Category Tag */}
              <AppTag
                icon={category.icon}
                label={categoryLabel(category)}
                color={category.color}
                size="md"
                selected={isSelected}
                onPress={() => handleTagPress(category)}
              />
              {!category.isDefault && (
                // remove button for non-default categories (default ones can't be deleted)
                <AppButton
                  iconOnly
                  icon="IconX"
                  size="sm"
                  variant="secondary"
                  color={colors.textMuted}
                  hitSlop={4}
                  onPress={() => setToDelete(category)}
                  style={styles.removeButton}
                />
              )}
            </View>
          );

          // if it's the last tag, wrap it with the add button to keep them together
          if (isLast) {
            return (
              <View key={category.id} style={styles.lastTagGroup}>
                {tag}
                {addButton}
              </View>
            );
          }
          return tag;
        })}

        {categories.length === 0 && addButton}
      </View>

      <ConfirmDialog
        visible={toDelete !== null}
        title={t('categories.deleteConfirmTitle')}
        message={t('categories.deleteConfirmMessage')}
        confirmText={t('categories.deleteConfirmYes')}
        cancelText={t('categories.deleteConfirmNo')}
        onConfirm={handleConfirmDelete}
        onCancel={() => setToDelete(null)}
        destructive
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  tagWrapper: {
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: -(Spacing.sm - Spacing.xxs),
    right: -(Spacing.sm - Spacing.xxs),
  },
  lastTagGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
});
