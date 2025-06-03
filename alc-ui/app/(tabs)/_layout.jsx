import { Tabs } from 'expo-router';
import { useAuthRedirect } from '../../lib/useAuthRedirect';

export default function TabLayout() {
  useAuthRedirect();
  
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="(home)" />
      <Tabs.Screen name="(journal)" />
      <Tabs.Screen name="(goals)" />
      <Tabs.Screen name="(profile)" />
    </Tabs>
  );
}