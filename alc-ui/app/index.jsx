import { useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '../context/AuthProvider';
import { View, ActivityIndicator } from 'react-native';

export default function IndexScreen() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/(tabs)/(home)');
      } else {
        router.replace('/(auth)/signIn');
      }
    }
  }, [user, loading]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}