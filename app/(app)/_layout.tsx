import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';
import { WaveProvider } from '@/providers/waves';

export default function AppLayout() {
  return (
    <WaveProvider>
      <View style={styles.root}>
        <Stack
          initialRouteName="home"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
            animation: 'none',
          }}
        >
          <Stack.Screen name="home" />
          <Stack.Screen name="completed" />
          <Stack.Screen name="settings" />
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
    backgroundColor: Colors.background,
  },
});
