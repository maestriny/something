import { View, StyleSheet, ScrollView, Keyboard, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppText } from '../../components/atoms/AppText';
import { AppButton } from '../../components/atoms/AppButton';
import { AppFormInput } from '../../components/form/AppFormInput';
import { AuthPrompt } from '../../components/molecules/AuthPrompt';
import { useWave } from '../../providers/waves';
import { useWaveTransition } from '../../providers/waveTransition';
import { useToast } from '../../providers/toast';
import { useAuthStore } from '../../stores/auth';
import { getAuthError } from '../../api/errors';
import { Routes } from '../../constants/routes';
import { Colors, Spacing } from '../../constants/theme';
import { useKeyboardScroll } from '../../hooks/useKeyboardScroll';
import { createLoginSchema, type LoginFormData } from '../../lib/schemas/login';

export default function LoginScreen() {
  const router = useRouter();
  const { setScreen } = useWave();
  const { startTransition } = useWaveTransition();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const login = useAuthStore(s => s.login);

  const loginSchema = useMemo(() => createLoginSchema(t), [t]);

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const scrollRef = useKeyboardScroll(Spacing.xl);

  useFocusEffect(
    useCallback(() => {
      setScreen('login');
      clearErrors();
    }, [setScreen, clearErrors]),
  );

  const onSubmit = async (data: LoginFormData) => {
    Keyboard.dismiss();
    try {
      const user = await login({ email: data.email, password: data.password });
      startTransition(router, Routes.app.home);
      setTimeout(() => {
        showToast({
          type: 'success',
          message: t('login.toast.successMessage'),
          description: t('login.toast.successDescription', { username: user.username }),
          color: Colors.surface,
        });
      }, 200);
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
            <AppText variant="heading">{t('login.heading')}</AppText>
            <AppText variant="subheading" style={styles.subtitle}>
              {t('login.subheading')}
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
              name="email"
              label={t('login.labels.email')}
              placeholder={t('login.placeholders.email')}
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
              autoComplete="email"
              returnKeyType="next"
            />
            <AppFormInput
              control={control}
              name="password"
              label={t('login.labels.password')}
              placeholder={t('login.placeholders.password')}
              isPassword
              textContentType="password"
              autoComplete="current-password"
              returnKeyType="done"
            />

            <AppButton
              title={t('login.button')}
              onPress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              style={styles.button}
            />
          </ScrollView>

          <AuthPrompt
            message={t('login.prompt.message')}
            actionText={t('login.prompt.action')}
            onPress={() => router.push(Routes.auth.register)}
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
