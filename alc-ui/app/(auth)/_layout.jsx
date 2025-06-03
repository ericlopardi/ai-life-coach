import { Stack } from 'expo-router';
import { useProtectedRedirect } from '../../lib/usePublicRedirect';
import { AUTH_REDIRECT } from '../../constants/constants';

export default function AuthLayout() {
  useProtectedRedirect(AUTH_REDIRECT);
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="signIn">
      <Stack.Screen name="signIn" options={{ title: 'Sign In' }} />
      <Stack.Screen name="signUp" options={{ title: 'Sign Up' }} />
    </Stack>
  );
}