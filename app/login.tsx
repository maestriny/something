import {
  View,
  StyleSheet,
  ScrollView,
  Keyboard,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { AppText } from "../components/atoms/AppText";
import { AppButton } from "../components/atoms/AppButton";
import { AppFormInput } from "../components/form/AppFormInput";
import { AuthPrompt } from "../components/molecules/AuthPrompt";
import { useWave } from "../providers/waves";
import { useToast } from "../providers/toast";
import { z } from "zod";
import { verifyCredentials } from "../lib/storage";
import { Colors, Spacing } from "../constants/theme";
import { useKeyboardScroll } from "../hooks/useKeyboardScroll";
import { EMAIL_REGEX } from "../lib/utils";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .regex(EMAIL_REGEX, "Please enter a valid email address"),
  password: z.string().min(1, "Please enter a password"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const { setScreen } = useWave();
  const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const scrollRef = useKeyboardScroll(Spacing.xl);

  useFocusEffect(
    useCallback(() => {
      setScreen("login");
      clearErrors();
    }, [setScreen, clearErrors])
  );

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await verifyCredentials(data);
      if (!user) {
        showToast({
          type: "error",
          message: "Hmm, that didn't work",
          description: "Check your email and password.",
        });
        return;
      }
      showToast({
        type: "success",
        message: "Welcome back!",
        description: `Good to see you, ${user.username}.`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      showToast({ type: "error", message: "Oops", description: message });
    }
  };

  return (
    <Pressable style={styles.screen} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <AppText variant="heading">Welcome back</AppText>
            <AppText variant="subheading" style={styles.subtitle}>
              Sign in to continue
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
            showsVerticalScrollIndicator={false}>
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
              placeholder="Your password"
              isPassword
              textContentType="password"
              autoComplete="current-password"
              returnKeyType="done"
            />

            <AppButton
              title="Sign In"
              onPress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              style={styles.button}
            />
          </ScrollView>

          <AuthPrompt
            message="Don't have an account?"
            actionText="Sign Up"
            onPress={() => router.push("/register")}
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
    justifyContent: "center",
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
