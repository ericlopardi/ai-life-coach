import { View, StyleSheet, Button } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import ProfileCard from '../../../components/ProfileCard';
import AppLayout from '../../../components/AppLayout';
// import defaultProImg from '../../../assets/defaultProImg.png';

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const defaultProImg = require('../../../assets/defaultProImg.png');
  return (
    <AppLayout noScroll>
      <View style={styles.container}>
      <ProfileCard
        name={user?.displayName || 'Guest'}
        email={user?.email || ''}
        avatarUri={user?.photoURL || defaultProImg}
        journalCount={user?.journalEntriesTotal || 0}
        moodCount={user?.moodEntriesTotal || 0}
        affirmation={'I am becoming the best version of myself'}
        onLogout={handleLogout}
      />
    </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9eee9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});