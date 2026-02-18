import { useState, useEffect } from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import { AppText } from '@/components/atoms/AppText';
import { AppButton } from '@/components/atoms/AppButton';
import { AppSelect } from '@/components/atoms/AppSelect';
import { useLanguageStore } from '@/stores/language';
import { type SupportedLanguage, SUPPORTED_LANGUAGES, LANGUAGE_LABELS } from '@/lib/i18n';
import { useTranslation } from 'react-i18next';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

// create options for picker from supported languages
// map each language code to its label
const languageOptions = SUPPORTED_LANGUAGES.map(lang => ({
  label: LANGUAGE_LABELS[lang],
  value: lang,
}));

interface LanguagePickerProps {
  visible: boolean;
  onClose: () => void;
}

export function LanguagePicker({ visible, onClose }: LanguagePickerProps) {
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<SupportedLanguage>(language);

  useEffect(() => {
    if (visible) setSelected(language);
  }, [visible, language]);

  const handleConfirm = () => {
    setLanguage(selected);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet}>
          <AppText variant="subheading" style={styles.title}>
            {t('settings.language')}
          </AppText>
          <AppSelect value={selected} onValueChange={setSelected} options={languageOptions} />
          <AppButton title={t('common.confirm')} onPress={handleConfirm} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.overlay,
  },
  sheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.sm,
    color: Colors.textPrimary,
  },
});
