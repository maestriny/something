import { useState, useMemo } from 'react';
import { View, StyleSheet, Keyboard, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@/components/atoms/AppButton';
import { AppFormInput } from '@/components/form/AppFormInput';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { useAuthStore } from '@/stores/auth';
import { useToast } from '@/providers/toast';
import { useWaveTransition } from '@/providers/waveTransition';
import { getAuthError } from '@/api/errors';
import { Routes } from '@/constants/routes';
import { Spacing } from '@/constants/theme';
import { createAccountInfoSchema, type AccountInfoFormData } from '@/lib/schemas/accountInfo';

export default function AccountInfoScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { startTransition } = useWaveTransition();
  const user = useAuthStore(s => s.user);
  const updateProfile = useAuthStore(s => s.updateProfile);
  const deleteAccount = useAuthStore(s => s.deleteAccount);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const schema = useMemo(() => createAccountInfoSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AccountInfoFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: user?.username ?? '',
      email: user?.email ?? '',
    },
  });

  const emailChanged = (data: AccountInfoFormData) => data.email !== user?.email;

  const onSubmit = async (data: AccountInfoFormData) => {
    Keyboard.dismiss();
    try {
      await updateProfile({ username: data.username, email: data.email });
      showToast({
        type: 'success',
        message: t('settings.accountInfo.toast.successMessage'),
        description: emailChanged(data)
          ? t('settings.accountInfo.toast.emailConfirmation')
          : t('settings.accountInfo.toast.successDescription'),
      });
      router.back();
    } catch (error) {
      // supabase sends the confirmation email but returns 500 — treat as success
      if (emailChanged(data) && (error as { status?: number }).status === 500) {
        showToast({
          type: 'success',
          message: t('settings.accountInfo.toast.successMessage'),
          description: t('settings.accountInfo.toast.emailConfirmation'),
        });
        router.back();
        return;
      }
      const { title, description } = getAuthError(error);
      showToast({
        type: 'error',
        message: t(title),
        description: t(description),
      });
    }
  };

  const handleDeleteAccount = async () => {
    setShowDeleteDialog(false);
    try {
      startTransition(router, Routes.auth.login);
      await deleteAccount();
    } catch (error) {
      const { title, description } = getAuthError(error);
      showToast({
        type: 'error',
        message: t(title),
        description: t(description),
      });
    }
  };

  return (
    <ScreenLayout title={t('settings.accountInfo.heading')} leftButton="back">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* username*/}
        <AppFormInput
          control={control}
          name="username"
          label={t('settings.accountInfo.labels.username')}
          placeholder={t('settings.accountInfo.placeholders.username')}
          autoCapitalize="none"
          autoComplete="username"
          returnKeyType="next"
        />

        {/* email */}
        <AppFormInput
          control={control}
          name="email"
          label={t('settings.accountInfo.labels.email')}
          placeholder={t('settings.accountInfo.placeholders.email')}
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
          autoComplete="email"
          returnKeyType="done"
        />

        <AppButton
          title={t('common.confirm')}
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          style={styles.button}
        />

        {/* delete account button */}
        <View style={styles.danger}>
          <AppButton
            title={t('settings.deleteAccount.button')}
            variant="danger"
            icon="IconUserOff"
            onPress={() => setShowDeleteDialog(true)}
          />
        </View>
      </ScrollView>

      {/* confirm delete account dialog */}
      <ConfirmDialog
        visible={showDeleteDialog}
        title={t('settings.deleteAccount.confirmTitle')}
        message={t('settings.deleteAccount.confirmMessage')}
        confirmText={t('settings.deleteAccount.confirmYes')}
        cancelText={t('settings.deleteAccount.confirmNo')}
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteDialog(false)}
        destructive
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
  },
  button: {
    marginTop: Spacing.sm,
  },
  danger: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Spacing.xxl * Spacing.xxs,
  },
});
