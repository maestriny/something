import { View, StyleSheet, ScrollView, Keyboard, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/components/atoms/AppText';
import { AppButton } from '@/components/atoms/AppButton';
import { AppFormInput } from '@/components/form/AppFormInput';
import { AuthPrompt } from '@/components/molecules/AuthPrompt';
import { useWave } from '@/providers/waves';
import { useToast } from '@/providers/toast';
import { useAuthStore } from '@/stores/auth';
import { getAuthError } from '@/api/errors';
import { Colors, Spacing } from '@/constants/theme';
import { useKeyboardScroll } from '@/hooks/useKeyboardScroll';
import { Routes } from '@/constants/routes';
import { createRegisterSchema, type RegisterFormData } from '@/lib/schemas/register';

export default function RegisterScreen() {
  const router = useRouter();
  const { setScreen } = useWave();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const registerUser = useAuthStore(s => s.register);

  const registerSchema = useMemo(() => createRegisterSchema(t), [t]);

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const scrollRef = useKeyboardScroll(Spacing.xl);

  useFocusEffect(
    useCallback(() => {
      setScreen('register');
      clearErrors();
    }, [setScreen, clearErrors]),
  );

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        username: data.username.trim(),
        email: data.email.trim(),
        password: data.password,
      });
      showToast({
        type: 'success',
        message: t('register.toast.successMessage'),
        description: t('register.toast.successDescription'),
      });
      router.replace(Routes.auth.login);
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
    <Pressable style={styles.screen} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <AppText variant="heading">{t('register.heading')}</AppText>
            <AppText variant="subheading" style={styles.subtitle}>
              {t('register.subheading')}
            </AppText>
          </View>

          <ScrollView
            ref={scrollRef}
            style={styles.formScroll}
            contentContainerStyle={styles.formScrollContent}
            keyboardShouldPersistTaps="handled"
            contentInset={{ bottom: Spacing.xl }}
            scrollEnabled={false}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <AppFormInput
              control={control}
              name="username"
              label={t('register.labels.username')}
              placeholder={t('register.placeholders.username')}
              autoCapitalize="none"
              textContentType="username"
              autoComplete="username"
              returnKeyType="next"
            />
            <AppFormInput
              control={control}
              name="email"
              label={t('register.labels.email')}
              placeholder={t('register.placeholders.email')}
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
              autoComplete="email"
              returnKeyType="next"
            />
            <AppFormInput
              control={control}
              name="password"
              label={t('register.labels.password')}
              placeholder={t('register.placeholders.password')}
              isPassword
              textContentType="newPassword"
              autoComplete="new-password"
              returnKeyType="done"
            />

            <AppButton
              title={t('register.button')}
              onPress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              style={styles.button}
            />
          </ScrollView>

          <AuthPrompt
            message={t('register.prompt.message')}
            actionText={t('register.prompt.action')}
            onPress={() => router.back()}
          />
        </View>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: Spacing.md,
  },
  subtitle: {
    marginTop: Spacing.sm,
  },
  formScroll: {
    flexGrow: 0,
    marginBottom: Spacing.lg,
  },
  formScrollContent: {
    paddingTop: Spacing.xl,
  },
  button: {
    marginTop: Spacing.sm,
  },
});
