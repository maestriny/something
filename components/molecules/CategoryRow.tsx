import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppRow } from '@/components/atoms/AppRow';
import { AppTag } from '@/components/atoms/AppTag';
import { CategoryPicker } from '@/components/molecules/CategoryPicker';
import { useCategoryStore } from '@/stores/category';
import { useCategoryLabel } from '@/hooks/useCategoryLabel';
import { Spacing } from '@/constants/theme';

interface CategoryRowProps {
  categoryId: string | undefined;
  onCategoryChange: (id: string | undefined) => void;
  expanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  disabled?: boolean;
}

export function CategoryRow({
  categoryId,
  onCategoryChange,
  expanded,
  onToggle,
  onEdit,
  disabled,
}: CategoryRowProps) {
  const { t } = useTranslation();
  const categoryLabel = useCategoryLabel();
  const categories = useCategoryStore(s => s.categories);

  const selectedCategory = categoryId ? categories.find(cat => cat.id === categoryId) : undefined;

  return (
    <>
      {/* Category row */}
      <AppRow
        icon="IconTag"
        label={t('todo.detail.category')}
        onPress={onToggle}
        onClear={selectedCategory ? () => onCategoryChange(undefined) : undefined}
        expanded={expanded}
        disabled={disabled}
        style={styles.categoryRow}
      >
        {selectedCategory && (
          <AppTag
            icon={selectedCategory.icon}
            label={categoryLabel(selectedCategory)}
            color={selectedCategory.color}
            size="sm"
          />
        )}
      </AppRow>

      {/* Category picker */}
      {expanded && (
        <View style={styles.pickerContainer}>
          <CategoryPicker selectedId={categoryId} onSelect={onCategoryChange} onEdit={onEdit} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  categoryRow: {
    marginTop: Spacing.md,
    minHeight: Spacing.xl,
  },
  pickerContainer: {
    marginTop: Spacing.md,
  },
});
