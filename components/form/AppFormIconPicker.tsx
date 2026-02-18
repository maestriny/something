import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { IconPicker } from '@/components/atoms/IconPicker';

interface AppFormIconPickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  color?: string;
}

export function AppFormIconPicker<T extends FieldValues>({
  control,
  name,
  color,
}: AppFormIconPickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <IconPicker selected={value} onSelect={onChange} color={color} />
      )}
    />
  );
}
