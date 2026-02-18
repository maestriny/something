import { Platform, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface AppSelectProps<T extends string> {
  value: T;
  onValueChange: (value: T) => void;
  options: { label: string; value: T }[];
}

export function AppSelect<T extends string>({ value, onValueChange, options }: AppSelectProps<T>) {
  return (
    <Picker
      selectedValue={value}
      onValueChange={v => onValueChange(v as T)}
      style={Platform.OS === 'android' ? styles.android : undefined}
    >
      {options.map(option => (
        <Picker.Item key={option.value} label={option.label} value={option.value} />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  android: {
    width: '100%',
  },
});
