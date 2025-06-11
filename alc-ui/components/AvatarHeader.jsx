import { View, Text, StyleSheet, Image } from 'react-native';

export default function AvatarHeader({ user, avatarUri }) {
    return (
        <View style={styles.container}>
            <Image source={avatarUri} style={styles.avatar} />
            <Text style={styles.nameStyle}>{user.name}</Text>
            <Text style={styles.emailStyle}>{user.email}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 8,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
        marginTop: 16,
        
    },
    nameStyle: {
        marginTop: 8,
        fontSize: 20,
        fontwright: '600',
        color: '#222',
    },
    emailStyle: {
        marginTop: 4,
        fontSize: 14,
        color: '#777',
    },
});