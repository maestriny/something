import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { WaveProvider } from '@/providers/waves';
import { Wave } from '@/components/atoms/Wave';
import { useTheme } from '@/providers/theme';

export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <WaveProvider>
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </Stack>
        <Wave position="top" withEntrance />
        <Wave position="bottom" color={colors.waveBottom} withEntrance />
      </View>
    </WaveProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
