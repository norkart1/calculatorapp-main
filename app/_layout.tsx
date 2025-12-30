import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="about" 
          options={{ 
            presentation: 'modal',
            headerShown: false,
          }} 
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
