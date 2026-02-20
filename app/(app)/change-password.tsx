import { StyleSheet, Keyboard, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@/components/atoms/AppButton';
import { AppFormInput } from '@/components/form/AppFormInput';
import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { useAuthStore } from '@/stores/auth';
import { toast } from '@/lib/toast';
import { Spacing } from '@/constants/theme';
import { useKeyboardScroll } from '@/hooks/useKeyboardScroll';
import {
  createChangePasswordSchema,
  type ChangePasswordFormData,
} from '@/lib/schemas/changePassword';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const updatePassword = useAuthStore(s => s.updatePassword);

  const scrollRef = useKeyboardScroll(Spacing.xl);
  const schema = useMemo(() => createChangePasswordSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    Keyboard.dismiss();
    try {
      await updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success({
        message: t('settings.changePassword.toast.successMessage'),
        description: t('settings.changePassword.toast.successDescription'),
      });
      router.back();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ScreenLayout
      title={t('settings.changePassword.heading')}
      subtitle={t('settings.changePassword.subheading')}
      leftButton="back"
    >
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        contentInset={{ bottom: Spacing.xl }}
        scrollEnabled={false}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* current password */}
        <AppFormInput
          control={control}
          name="currentPassword"
          label={t('settings.changePassword.labels.currentPassword')}
          placeholder={t('settings.changePassword.placeholders.currentPassword')}
          isPassword
          textContentType="password"
          autoComplete="current-password"
          returnKeyType="next"
        />

        {/* new password */}
        <AppFormInput
          control={control}
          name="newPassword"
          label={t('settings.changePassword.labels.newPassword')}
          placeholder={t('settings.changePassword.placeholders.newPassword')}
          isPassword
          textContentType="newPassword"
          autoComplete="new-password"
          returnKeyType="next"
        />

        {/* confirm new password */}
        <AppFormInput
          control={control}
          name="confirmPassword"
          label={t('settings.changePassword.labels.confirmPassword')}
          placeholder={t('settings.changePassword.placeholders.confirmPassword')}
          isPassword
          textContentType="newPassword"
          autoComplete="new-password"
          returnKeyType="done"
        />

        <AppButton
          title={t('common.confirm')}
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          style={styles.button}
        />
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl + Spacing.xs,
  },
  button: {
    marginTop: Spacing.sm,
  },
});
