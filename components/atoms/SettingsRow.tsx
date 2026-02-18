import { View, Pressable, StyleSheet } from 'react-native';
import { AppText } from '@/components/atoms/AppText';
import { AppIcon, type IconName } from '@/components/atoms/AppIcon';
import { AppSwitch } from '@/components/atoms/AppSwitch';
import { Colors, FontSize, Fonts, IconSize, Spacing, Opacity } from '@/constants/theme';

// props for pressable settings row (e.g. user info, change password)
interface PressRowProps {
  type: 'press';
  icon: IconName;
  label: string;
  onPress: () => void;
}

// props for toggle settings row (e.g. dark mode)
interface ToggleRowProps {
  type: 'toggle';
  icon: IconName;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

// union type for settings row props
type SettingsRowProps = PressRowProps | ToggleRowProps;

export function SettingsRow(props: SettingsRowProps) {
  if (props.type === 'press') {
    return (
      <Pressable
        onPress={props.onPress}
        style={({ pressed }) => [styles.row, pressed && { opacity: Opacity.active }]}
        accessibilityRole="button"
      >
        {/* left */}
        <AppIcon name={props.icon} size={IconSize.md} color={Colors.textPrimary} />
        <AppText style={styles.label}>{props.label}</AppText>

        {/* right */}
        <AppIcon name="IconChevronRight" size={IconSize.xs} color={Colors.textPrimary} />
      </Pressable>
    );
  }

  return (
    <View
      style={styles.row}
      accessibilityRole="switch"
      accessibilityState={{ checked: props.value }}
      accessibilityLabel={props.label}
    >
      {/* left */}
      <AppIcon name={props.icon} size={IconSize.md} color={Colors.textPrimary} />
      <AppText style={styles.label}>{props.label}</AppText>

      {/* right */}
      <AppSwitch value={props.value} onValueChange={props.onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  label: {
    flex: 1,
    fontSize: FontSize.sm,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
  },
});
