import { View, Pressable, StyleSheet } from 'react-native';
import { PickerGrid } from '@/components/atoms/PickerGrid';
import { Colors } from '@/constants/theme';

interface ColorPickerProps {
  colors: readonly string[];
  selected: string;
  onSelect: (color: string) => void;
}

const CIRCLE_SIZE = 28;

export function ColorPicker({ colors, selected, onSelect }: ColorPickerProps) {
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
                  isSelected && styles.circleSelected,
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
    borderColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
});
