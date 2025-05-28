import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>{getTimeOfDay()}, {user?.email || 'Guest'} </Text>
    </View>
  );
}

function getTimeOfDay() {
  const currentHour = new Date().getHours();

  if (currentHour >= 3 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});