import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(goals)" />
      <Tabs.Screen name="(settings)" />
      <Tabs.Screen name="(journal)" />
      <Tabs.Screen name="(auth)" />
    </Tabs>
  );
}