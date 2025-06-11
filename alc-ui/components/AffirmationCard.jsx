import { Text, StyleSheet } from 'react-native';
import Card from './Card';

export default function AffirmationCard({ affirmation }) {
  return (
    <Card>
      <Text style={styles.label}>Daily Affirmation</Text>
      <Text style={styles.text}>{affirmation}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#111',
    textAlign: 'center',
    justifyContent: 'center',
  },
});
