import { Platform, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@/providers/theme';

interface AppSelectProps<T extends string> {
  value: T;
  onValueChange: (value: T) => void;
  options: { label: string; value: T }[];
}

export function AppSelect<T extends string>({ value, onValueChange, options }: AppSelectProps<T>) {
  const { colors } = useTheme();

  return (
    <Picker
      selectedValue={value}
      onValueChange={v => onValueChange(v as T)}
      style={Platform.OS === 'android' ? styles.android : undefined}
      dropdownIconColor={colors.textPrimary}
    >
      {options.map(option => (
        <Picker.Item
          key={option.value}
          label={option.label}
          value={option.value}
          color={colors.textPrimary}
        />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  android: {
    width: '100%',
  },
});
