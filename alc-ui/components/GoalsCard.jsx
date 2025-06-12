import { Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import Card from './Card';
import { COLORS } from '../constants/colors';
import { ROUTES } from '../constants/constants';

export default function GoalsCard() {
  const router = useRouter();

  return (
    <Card onPress={() => router.push(ROUTES.GOALS)}>
      <Text style={styles.title}>Goals</Text>
      <GoalProgress title="Workout 6x/week" progress={0.6} />
      <GoalProgress title="Financial Planning" progress={0.4} />
      <GoalProgress title="French Practice" progress={0.3} />
    </Card>
  );
}

function GoalProgress({ title, progress }) {
  return (
    <View style={styles.goalItem}>
      <Text>{title}</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 1,
  },
  goalItem: {
    marginTop: 12,
  },
  progressBarContainer: {
    backgroundColor: '#ddd',
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
});
