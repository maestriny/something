import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '../../constants/theme';
import { WaveProvider } from '../../providers/waves';
import { Wave } from '../../components/atoms/Wave';

export default function AuthLayout() {
  return (
    <WaveProvider>
      <View style={styles.root}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </Stack>
        <Wave position="top" />
        <Wave position="bottom" />
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
