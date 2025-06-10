import { View, Text, StyleSheet } from 'react-native';

export default function AffirmationCard({ affirmation }) {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Daily Affirmation</Text>
            <Text style={styles.text}>{affirmation}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        width: '100%',
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#111',
        textAlign: 'center',
        marginBottom: 8,
    },
    text: {
        fontSize: 12,
        color: '#111',
        textAlign: 'center',
        justifyContent: 'center',
    },
});