import React, { useContext, useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../../../context/AuthProvider';
import { COLORS } from '../../../constants/colors';
import { UI_CONSTANTS } from '../../../constants/constants';
import AffirmationCard from '../../../components/AffirmationCard';
import MoodCard from '../../../components/MoodCard';
import JournalCard from '../../../components/JournalCard';
import GoalsCard from '../../../components/GoalsCard';

const { DEFAULT_AFFIRMATION } = UI_CONSTANTS;

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const greeting = getTimeOfDay();
  // TODO: will be implemented later
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>
        {greeting}, {user?.displayName || 'Guest'}!
      </Text>

      <AffirmationCard affirmation={DEFAULT_AFFIRMATION} />
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
