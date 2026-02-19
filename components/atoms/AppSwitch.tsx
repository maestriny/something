import { Switch } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/providers/theme';

interface AppSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function AppSwitch({ value, onValueChange }: AppSwitchProps) {
  const { colors } = useTheme();

  return (
    <Switch
      value={value}
      onValueChange={v => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onValueChange(v);
      }}
      trackColor={{ false: colors.switchTrack, true: colors.primary }}
      thumbColor={colors.surface}
    />
  );
}
