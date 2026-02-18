import { Pressable, StyleSheet } from 'react-native';
import { AppIcon } from '@/components/atoms/AppIcon';
import { PickerGrid } from '@/components/atoms/PickerGrid';
import { CATEGORY_ICON_NAMES, type CategoryIconName } from '@/constants/categories';
import { BorderRadius, Colors, IconSize } from '@/constants/theme';
import { darkenHex } from '@/lib/utils';

interface IconPickerProps {
  selected: CategoryIconName;
  onSelect: (icon: CategoryIconName) => void;
  color?: string;
}

export function IconPicker({ selected, onSelect, color = Colors.primary }: IconPickerProps) {
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
                isSelected && { backgroundColor: `${color}30` },
              ]}
            >
              <AppIcon
                name={name}
                size={IconSize.md}
                color={isSelected ? darkenHex(color) : Colors.textMuted}
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
