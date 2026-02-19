import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { WaveProvider } from '@/providers/waves';
import { useTheme } from '@/providers/theme';

export default function AppLayout() {
  const { colors } = useTheme();

  return (
    <WaveProvider>
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <Stack
          initialRouteName="home"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'none',
          }}
        >
          <Stack.Screen name="home" />
          <Stack.Screen name="completed" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="account-info" />
          <Stack.Screen name="change-password" />
          <Stack.Screen
            name="todo-detail"
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
              contentStyle: { backgroundColor: 'transparent' },
            }}
          />
        </Stack>
      </View>
    </WaveProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
