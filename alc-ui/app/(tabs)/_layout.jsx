import { Tabs } from 'expo-router';
import { usePublicRedirect } from '../../lib/useAuthRedirect';

export default function TabLayout() {
  usePublicRedirect();
  
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="(home)" />
      <Tabs.Screen name="(journal)" />
      <Tabs.Screen name="(goals)" />
      <Tabs.Screen name="(profile)" />
    </Tabs>
  );
}