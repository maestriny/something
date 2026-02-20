import { View, Pressable, StyleSheet } from 'react-native';
import { PickerGrid } from '@/components/atoms/PickerGrid';
import { useTheme } from '@/providers/theme';

interface ColorPickerProps {
  colors: readonly string[];
  selected: string;
  onSelect: (color: string) => void;
}

const CIRCLE_SIZE = 28;
const RING_BORDER = 2;
const RING_SIZE = CIRCLE_SIZE + RING_BORDER * 4;

export function ColorPicker({ colors, selected, onSelect }: ColorPickerProps) {
  const { shadow } = useTheme();

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
              <View style={[styles.ring, isSelected && { borderColor: color }]}>
                <View
                  style={[styles.circle, { backgroundColor: color }, isSelected && shadow.soft]}
                />
              </View>
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
  ring: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: RING_BORDER,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
});
