import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { ColorPicker } from '@/components/atoms/ColorPicker';

interface AppFormColorPickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  colors: readonly string[];
}

export function AppFormColorPicker<T extends FieldValues>({
  control,
  name,
  colors,
}: AppFormColorPickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <ColorPicker colors={colors} selected={value} onSelect={onChange} />
      )}
    />
  );
}
