import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './Card';
import { useRouter } from 'expo-router';
import { ROUTES, UI_CONSTANTS } from '../constants/constants';

const { MOOD_EMOJIS } = UI_CONSTANTS;

export default function MoodCard() {
  const router = useRouter();

  return (
    <Card onPress={() => router.push(ROUTES.MOOD)}>
      <Text style={styles.title}>Mood Check-In</Text>
      <View style={styles.emojiRow}>
        {MOOD_EMOJIS.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            onPress={e => {
              e.stopPropagation();
              router.push({
                pathname: ROUTES.MOOD_NEW_ENTRY,
                params: { emoji },
              });
            }}
            style={styles.emojiButton}
          >
            <Text style={styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 1,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  emojiButton: {
    padding: 5,
  },
  emoji: {
    fontSize: 30,
  },
});
