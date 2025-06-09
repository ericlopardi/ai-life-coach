import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const greeting = getTimeOfDay();
  
  const handleMoodSelect = (emoji) => {
    console.log("Selected mood:", emoji);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>{greeting}, {user?.displayName || 'Guest'}!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Affirmation</Text>
        <Text style={styles.cardContent}>You are capable of achieving great things.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mood Check-In</Text>
        <View style={styles.emojiRow}>
          {['🙁', '😕', '😐', '🙂', '😄'].map((emoji, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMoodSelect(emoji)}
              style={styles.emojiButton}
            >
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>


      <View style={styles.card}>
        <Text style={styles.cardTitle}>Journal</Text>
        <Text style={styles.cardContent}>Today I made progress towards...</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue Writing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Goals</Text>
        <GoalProgress title="Workout 6x/week" progress={0.6} />
        <GoalProgress title="Financial Planning" progress={0.4} />
        <GoalProgress title="French Practice" progress={0.3} />
    </View>
    </ScrollView>
  );
}

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 3 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 18) return 'Good Afternoon';
    return 'Good Evening';
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
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  greeting: {
    fontSize: 26,
    fontWeight: '600',
    color: '#222',
    padding: 10,
  },
  progress: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#d6f0dd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 16,
    color: '#333',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  emoji: {
    fontSize: 26,
  },
  button: {
    backgroundColor: '#00674f',
    padding: 10,
    borderRadius: 6,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
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
    backgroundColor: '#00674f',
    borderRadius: 5,
  },
});