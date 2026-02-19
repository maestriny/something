import { Pressable, StyleSheet } from 'react-native';
import { AppIcon } from '@/components/atoms/AppIcon';
import { PickerGrid } from '@/components/atoms/PickerGrid';
import { CATEGORY_ICON_NAMES, type CategoryIconName } from '@/constants/categories';
import { BorderRadius, IconSize } from '@/constants/theme';
import { darkenHex, lightenHex, setOpacity } from '@/lib/utils';
import { useTheme } from '@/providers/theme';

interface IconPickerProps {
  selected: CategoryIconName;
  onSelect: (icon: CategoryIconName) => void;
  color?: string;
}

export function IconPicker({ selected, onSelect, color }: IconPickerProps) {
  const { colors, isDark } = useTheme();
  const baseColor = color ?? colors.primary;

  return (
    <PickerGrid>
      {cellSize =>
        CATEGORY_ICON_NAMES.map(name => {
          const isSelected = name === selected;
          return (
            <Pressable
              key={name}
              onPress={() => onSelect(name)}
              style={[
                styles.cell,
                {
                  width: cellSize,
                  height: cellSize,
                  borderRadius: BorderRadius.md,
                },
                isSelected && { backgroundColor: setOpacity(baseColor, isDark ? 0.25 : 0.19) },
              ]}
            >
              <AppIcon
                name={name}
                size={IconSize.md}
                color={
                  isSelected
                    ? isDark
                      ? lightenHex(baseColor)
                      : darkenHex(baseColor)
                    : colors.textMuted
                }
              />
            </Pressable>
          );
        })
      }
    </PickerGrid>
  );
}

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
