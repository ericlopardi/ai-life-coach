import { View, Text, StyleSheet } from 'react-native';

export default function StatBox({ label, value }) {
    return (
        <View style={styles.statBox}>
            <Text style={styles.statValue}>{label}</Text>
            <Text style={styles.statLabel}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    statBox: {
        flex: 1,
        aligntItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        justifyContent: 'center',
        padding: 16,
    },
    statValue: {
        fontSize: 10,
        color: '#111',
        textAlign: 'center',
    },
    statLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
        textAlign: 'center',
        marginTop: 4,
    }
});