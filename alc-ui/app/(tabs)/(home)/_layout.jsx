import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="new-entry" options={{ title: 'New Entry' }} />
      <Stack.Screen name="entry/[id]" options={{ title: 'Entry' }} /> 
    </Stack>
  );
}