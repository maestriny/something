import { Modal, View, StyleSheet } from 'react-native';
import { AppText } from '@/components/atoms/AppText';
import { AppButton } from '@/components/atoms/AppButton';
import { AppCard } from '@/components/atoms/AppCard';
import { Fonts, FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/providers/theme';

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  destructive,
}: ConfirmDialogProps) {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <AppCard onClose={onCancel} style={styles.card}>
        <AppText style={[styles.title, { color: colors.textPrimary }]}>{title}</AppText>
        <AppText style={[styles.message, { color: colors.textSecondary }]}>{message}</AppText>

        <View style={styles.actions}>
          <AppButton title={cancelText} variant="secondary" size="sm" onPress={onCancel} full />
          <AppButton
            title={confirmText}
            variant={destructive ? 'destructive' : 'primary'}
            size="sm"
            onPress={onConfirm}
            full
          />
        </View>
      </AppCard>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: '80%',
    maxWidth: 320,
  },
  title: {
    fontSize: FontSize.md,
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  message: {
    fontSize: FontSize.sm,
    textAlign: 'center',
    lineHeight: FontSize.sm * 1.5,
    marginBottom: Spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
});
