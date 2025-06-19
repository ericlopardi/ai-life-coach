import { Stack } from 'expo-router';
import { useProtectedRedirect } from '../../lib/useAuthRedirect';
import { PROTECTED_REDIRECT } from '../../constants/constants';

export default function AuthLayout() {
  useProtectedRedirect(PROTECTED_REDIRECT);
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="signIn">
      <Stack.Screen name="signIn" options={{ title: 'Sign In' }} />
      <Stack.Screen name="signUp" options={{ title: 'Sign Up' }} />
    </Stack>
  );
}