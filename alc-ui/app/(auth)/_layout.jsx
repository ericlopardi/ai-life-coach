import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="signIn">
      <Stack.Screen name="signIn" options={{ title: 'Sign In' }} />
      <Stack.Screen name="signUp" options={{ title: 'Sign Up' }} />
    </Stack>
  );
}