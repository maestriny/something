import { type TextInputProps } from 'react-native';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { AppInput } from '@/components/atoms/AppInput';

interface AppFormInputProps<T extends FieldValues> extends Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onBlur'
> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  isPassword?: boolean;
  variant?: 'default' | 'minimal';
}

export function AppFormInput<T extends FieldValues>({
  control,
  name,
  label,
  isPassword,
  variant,
  ...inputProps
}: AppFormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <AppInput
          label={label}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          isPassword={isPassword}
          variant={variant}
          {...inputProps}
        />
      )}
    />
  );
}
