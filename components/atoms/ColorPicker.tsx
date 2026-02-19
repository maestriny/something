import { View, Pressable, StyleSheet } from 'react-native';
import { PickerGrid } from '@/components/atoms/PickerGrid';
import { useTheme } from '@/providers/theme';

interface ColorPickerProps {
  colors: readonly string[];
  selected: string;
  onSelect: (color: string) => void;
}

const CIRCLE_SIZE = 28;

export function ColorPicker({ colors, selected, onSelect }: ColorPickerProps) {
  const { colors: themeColors, shadow } = useTheme();

  return (
    <PickerGrid>
      {cellSize =>
        colors.map(color => {
          const isSelected = color === selected;
          return (
            <Pressable
              key={color}
              onPress={() => onSelect(color)}
              style={[styles.cell, { width: cellSize, height: cellSize }]}
            >
              <View
                style={[
                  styles.circle,
                  { backgroundColor: color },
                  isSelected && [
                    styles.circleSelected,
                    shadow.soft,
                    { borderColor: themeColors.surface },
                  ],
                ]}
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
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleSelected: {
    borderWidth: 2.5,
  },
});
