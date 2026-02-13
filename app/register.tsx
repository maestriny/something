import { View, StyleSheet, ScrollView, Keyboard, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { AppText } from '../components/atoms/AppText';
import { AppButton } from '../components/atoms/AppButton';
import { AppFormInput } from '../components/form/AppFormInput';
import { AuthPrompt } from '../components/molecules/AuthPrompt';
import { useWave } from '../providers/waves';
import { useToast } from '../providers/toast';
import { z } from 'zod';
import { saveUser } from '../lib/storage';
import { Colors, Spacing } from '../constants/theme';
import { useKeyboardScroll } from '../hooks/useKeyboardScroll';
import { USERNAME_REGEX, USERNAME_MAX_LENGTH, EMAIL_REGEX, PASSWORD_REGEX } from '../lib/utils';

const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'Please enter a username')
    .min(3, 'Username should be at least 3 characters')
    .max(USERNAME_MAX_LENGTH, `Username can't exceed ${USERNAME_MAX_LENGTH} characters`)
    .regex(USERNAME_REGEX, 'Only letters, numbers, underscores and hyphens'),
  email: z
    .string()
    .min(1, 'Please enter your email')
    .regex(EMAIL_REGEX, 'Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Please enter a password')
    .min(8, 'Password should be at least 8 characters')
    .regex(PASSWORD_REGEX.uppercase, 'Password needs at least one uppercase letter')
    .regex(PASSWORD_REGEX.special, 'Password needs at least one special character'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const { setScreen } = useWave();
  const { showToast } = useToast();
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
    }, [setScreen, clearErrors])
  );

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await saveUser({
        username: data.username.trim(),
        email: data.email.trim(),
        password: data.password,
      });
      showToast({
        type: 'success',
        message: "You're all set!",
        description: 'Your account has been created.',
      });
      router.replace('/login');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      showToast({ type: 'error', message: 'Oops', description: message });
    }
  };

  return (
    <Pressable style={styles.screen} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <AppText variant="heading">Create account</AppText>
            <AppText variant="subheading" style={styles.subtitle}>
              Let's get you started
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
              label="Username"
              placeholder="What should we call you?"
              autoCapitalize="none"
              textContentType="username"
              autoComplete="username"
              returnKeyType="next"
            />
            <AppFormInput
              control={control}
              name="email"
              label="Email"
              placeholder="your@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
              autoComplete="email"
              returnKeyType="next"
            />
            <AppFormInput
              control={control}
              name="password"
              label="Password"
              placeholder="At least 8 characters"
              isPassword
              textContentType="newPassword"
              autoComplete="new-password"
              returnKeyType="done"
            />

            <AppButton
              title="Get started"
              onPress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              style={styles.button}
            />
          </ScrollView>

          <AuthPrompt
            message="Already have an account?"
            actionText="Sign In"
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
