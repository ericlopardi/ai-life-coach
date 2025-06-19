import { Text, StyleSheet, Button, TouchableOpacity, View, ScrollView } from 'react-native';
import Card from './Card';
import { COLORS } from '../constants/colors';

export default function PromptCard({ prompt, onGeneratePress }) {
    return (
        <Card style={styles.cardWrapper}>
            <View style={styles.textContainer}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                >
                    <Text style={styles.promptText}>{prompt}</Text>
                </ScrollView>
            </View>

            <TouchableOpacity style={styles.button} onPress={onGeneratePress}>
                <Text style={styles.buttonText}>Generate Another Prompt</Text>
            </TouchableOpacity>
        </Card>
    );
}

const styles = StyleSheet.create({
    cardWrapper:{
        width: '95%',
        maxWidth: 500,
        height: 120,
        alignSelf: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    textContainer: {
        height: 50,
        justifyContent: 'center',
    },
    promptText: {
        fontSize: 17,
        fontWeight: '400',
        color: '#333',
        marginBottom: 12,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginTop: 3,
        alignItems: 'center', 
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});