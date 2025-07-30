import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthProvider';
import { JournalPromptProvider } from '../context/JournalPromptContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <JournalPromptProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      </JournalPromptProvider>
    </AuthProvider>
  );
}