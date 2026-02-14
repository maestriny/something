import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '../../constants/theme';
import { WaveProvider } from '../../providers/waves';
import { Wave } from '../../components/atoms/Wave';

export default function AppLayout() {
  return (
    <WaveProvider>
      <View style={styles.root}>
        <Wave position="top" />
        <Wave position="bottom" color={Colors.peach} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
      </View>
    </WaveProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
