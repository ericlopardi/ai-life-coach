import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../../../context/AuthProvider';
import { COLORS } from '../../../constants/colors';
import { UI_CONSTANTS } from '../../../constants/constants';
import { useRouter } from 'expo-router';

const { MOOD_EMOJIS, DEFAULT_AFFIRMATION } = UI_CONSTANTS;

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const greeting = getTimeOfDay();
  // TODO: will be implemented later
  const [selectedMood, setSelectedMood] = useState(null);
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>
        {greeting}, {user?.displayName || 'Guest'}!
      </Text>

      {/* Affirmation Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Affirmation</Text>
        <Text style={styles.cardContent}>{DEFAULT_AFFIRMATION}</Text>
      </View>

      {/* Mood Check-In Card */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => router.push('/(mood)')}
      >
        <Text style={styles.cardTitle}>Mood Check-In</Text>
        <View style={styles.emojiRow}>
          {MOOD_EMOJIS.map((emoji, index) => (
            <TouchableOpacity
              key={index}
              onPress={e => {
                e.stopPropagation();
                router.push({
                  pathname: '/(mood)/new-entry',
                  params: { emoji },
                });
              }}
              style={[styles.emojiButton,]}
            >
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>

      {/* Journal Card */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => router.push('/(journal)')}
      >
        <Text style={styles.cardTitle}>Journal</Text>
        <Text style={styles.cardContent}>
          Today I made progress towards...
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={e => {
            e.stopPropagation();
            router.push('/(journal)/new-entry');
          }}
        >
          <Text style={styles.buttonText}>Continue Writing</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Goals Card */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => router.push('/(goals)')}
      >
        <Text style={styles.cardTitle}>Goals</Text>
        <GoalProgress title="Workout 6x/week" progress={0.6} />
        <GoalProgress title="Financial Planning" progress={0.4} />
        <GoalProgress title="French Practice" progress={0.3} />
      </TouchableOpacity>
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
    backgroundColor: COLORS.background,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '600',
    color: COLORS.textDark,
    padding: 10,
  },
  card: {
    backgroundColor: COLORS.card,
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
    color: COLORS.textLight,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  emoji: {
    fontSize: 26,
  },
  emojiButton: {
    padding: 6,
  },
  button: {
    backgroundColor: COLORS.primary,
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
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
});
