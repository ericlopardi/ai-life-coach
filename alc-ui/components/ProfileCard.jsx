import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AvatarHeader from './AvatarHeader';
import StatBox from './StatBox';
import AffirmationCard from './AffirmationCard';
import { useRouter } from 'expo-router';

export default function ProfileCard({
    name,
    email,
    avatarUri,
    journalCount,
    goalsCount,
    moodCount,
    affirmation,
    onLogout,
 }) {
    const router = useRouter(); 

    const handleSettingsPress = () => {
        router.push('/settings');
    }

    return (
        <View style={styles.card}>
            <Pressable style={styles.settingsIcon} onPress={handleSettingsPress}>
                <Ionicons name="settings-outline" size={24} color="#444" />
            </Pressable>

            <AvatarHeader user={{ name, email, avatarUri }} avatarUri={avatarUri} />

            <View style={styles.statsRow}>
                <StatBox label="Journal Entries" value={journalCount} />
                <StatBox label="Goals Completed" value={goalsCount} />
                <StatBox label="Mood Check-ins" value={moodCount} />
            </View>

            <AffirmationCard affirmation={affirmation} fontSize='12' />

            <Pressable style={styles.logoutButton} onPress={onLogout}>
                <Text style={styles.logoutText}>Sign Out</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f4f7f3',
        width: '100%',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        position: 'relative',
    },
    settingsIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginVertical: 12,
    },
    logoutButton: {
        backgroundColor: '#d6e4d3',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 12,
        width: '100%',
        marginBottom: 12,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
    },
})