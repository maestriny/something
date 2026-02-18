import { useState, type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing } from '@/constants/theme';

const DEFAULT_COLUMNS = 6;
const DEFAULT_CELL_SIZE = 44;

interface PickerGridProps {
  numColumns?: number;
  children: (cellSize: number) => ReactNode;
}

export function PickerGrid({ numColumns = DEFAULT_COLUMNS, children }: PickerGridProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const cellSize =
    containerWidth > 0
      ? (containerWidth - (numColumns - 1) * Spacing.sm) / numColumns
      : DEFAULT_CELL_SIZE;

  return (
    <View style={styles.grid} onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}>
      {children(cellSize)}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
});
