import { View, StyleSheet, Button } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <View style={styles.container}>
     <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});