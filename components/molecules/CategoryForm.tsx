import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppText } from '@/components/atoms/AppText';
import { AppButton } from '@/components/atoms/AppButton';
import { AppFormInput } from '@/components/form/AppFormInput';
import { AppFormColorPicker } from '@/components/form/AppFormColorPicker';
import { AppFormIconPicker } from '@/components/form/AppFormIconPicker';
import { useCategoryStore } from '@/stores/category';
import { categorySchema, type CategoryFormData } from '@/lib/schemas/category';
import { capitalize } from '@/lib/utils';
import { CATEGORY_ICON_NAMES } from '@/constants/categories';
import { Palette, Colors, FontSize, Spacing } from '@/constants/theme';
import { ScrollView } from 'react-native-gesture-handler';

interface CategoryFormProps {
  onDone: (newCategoryId?: string) => void;
}

export function CategoryForm({ onDone }: CategoryFormProps) {
  const { t } = useTranslation();
  const addCategory = useCategoryStore(s => s.addCategory);

  const {
    control,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      icon: CATEGORY_ICON_NAMES[0],
      color: Palette[0],
    },
    mode: 'onChange',
  });

  // subscribe to color changes to pass to icon picker
  const color = watch('color');

  const handleSave = useCallback(
    (data: CategoryFormData) => {
      const name = capitalize(data.name.trim());
      const newCat = addCategory({ name, icon: data.icon, color: data.color });
      onDone(newCat);
    },
    [addCategory, onDone],
  );

  return (
    <View style={styles.form}>
      <ScrollView>
        {/* Category name */}
        <AppFormInput
          control={control}
          name="name"
          variant="minimal"
          placeholder={t('categories.namePlaceholder')}
          maxLength={20}
          autoFocus
        />

        {/* Color Picker */}
        <AppText style={styles.label}>{t('categories.color')}</AppText>
        <AppFormColorPicker control={control} name="color" colors={Palette} />

        {/* Icon Picker */}
        <AppText style={styles.label}>{t('categories.icon')}</AppText>
        <AppFormIconPicker control={control} name="icon" color={color} />
      </ScrollView>

      {/* Actions */}
      <View style={styles.actions}>
        <AppButton
          title={t('categories.cancel')}
          variant="ghost"
          size="sm"
          onPress={() => onDone()}
        />
        <AppButton
          title={t('categories.save')}
          variant="primary"
          size="sm"
          disabled={!isValid}
          onPress={handleSubmit(handleSave)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingTop: Spacing.md - Spacing.xxs,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
});
