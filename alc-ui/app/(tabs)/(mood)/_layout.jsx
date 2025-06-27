import { Stack } from 'expo-router';

export default function MoodLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Mood' }} />
    </Stack>
  );
}