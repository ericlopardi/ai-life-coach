import { Text, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../../../context/AuthProvider';
import { COLORS } from '../../../constants/colors';
import AffirmationCard from '../../../components/AffirmationCard';
import MoodCard from '../../../components/MoodCard';
import JournalCard from '../../../components/JournalCard';
import GoalsCard from '../../../components/GoalsCard';
import { useContext, useState, useEffect } from 'react';
import { getDailyAffirmation } from '../../../lib/affirmationUtils';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const [dailyAffirmation, setDailyAffirmation] = useState('');
  const greeting = getTimeOfDay();
  
  useEffect(() => {
    // Set the daily affirmation when component mounts
    setDailyAffirmation(getDailyAffirmation());
    
    // Set up interval to check for affirmation updates
    // (useful if user keeps app open past 6 AM)
    const interval = setInterval(() => {
      const newAffirmation = getDailyAffirmation();
      setDailyAffirmation(newAffirmation);
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>
        {greeting}, {user?.displayName || 'Guest'}!
      </Text>

      <AffirmationCard affirmation={dailyAffirmation} />
      <MoodCard />
      <JournalCard />
      <GoalsCard />
    </ScrollView>
  );
}

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 3 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.background,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textDark,
    padding: 12,
  },
});
