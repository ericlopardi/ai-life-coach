import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Card from './Card';
import { COLORS } from '../constants/colors';
import { ROUTES } from '../constants/constants';
import { useJournalPrompt } from '../context/JournalPromptContext';
import { PROMPTS } from '../constants/prompts';

export default function JournalCard() {
  const router = useRouter();
  const { promptIndex } = useJournalPrompt();
  const currentPrompt = PROMPTS[promptIndex];

  return (
    <Card onPress={() => router.push(ROUTES.JOURNAL)}>
      <Text style={styles.title}>Journal</Text>
      <Text style={styles.subtitle}>{currentPrompt}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={e => {
          e.stopPropagation();
          router.push(ROUTES.JOURNAL);
        }}
      >
        <Text style={styles.buttonText}>Continue Writing</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
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
});
