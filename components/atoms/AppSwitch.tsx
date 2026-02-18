import { Switch } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/theme';

interface AppSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function AppSwitch({ value, onValueChange }: AppSwitchProps) {
  return (
    <Switch
      value={value}
      onValueChange={v => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onValueChange(v);
      }}
      trackColor={{ false: Colors.switchTrack, true: Colors.primary }}
      thumbColor={Colors.surface}
    />
  );
}
