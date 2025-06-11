import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Card from './Card';
import { COLORS } from '../constants/colors';

export default function JournalCard() {
  const router = useRouter();

  return (
    <Card onPress={() => router.push('/(journal)')}>
      <Text style={styles.title}>Journal</Text>
      <Text style={styles.subtitle}>Today I made progress towards...</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={e => {
          e.stopPropagation();
          router.push('/(journal)/new-entry');
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
