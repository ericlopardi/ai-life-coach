import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { UI_CONSTANTS } from '../../../constants/constants';
import { ENTRY_TYPES } from '../../../constants/constants';
import { useContext, useState } from 'react';
import TextBoxInput from '../../../components/TextBoxInput';
import DualButton from '../../../components/DualButton';
import apiClient from '../../../lib/apiClient';
import { AuthContext } from '../../../context/AuthProvider';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

export default function MoodScreen() {
  const { selectedEmojiIndex } = useLocalSearchParams();
  const [moodDescription, setMoodDescription] = useState('');
  const [moodEmoji, setMoodEmoji] = useState(null);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params?.selectedEmojiIndex !== undefined) {
      setMoodEmoji(Number(params.selectedEmojiIndex));
      }
    }, [params.selectedEmojiIndex]);

  const handleSubmit = async () => {
    if (moodEmoji === null || moodDescription.trim() === '') {
      Alert.alert(
        'Incomplete Submission',
        'Please select a mood emoji, and provide a mood description before submitting.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsLoading(true);

    const formattedInput = (`You wrote:\n${moodDescription}`);

    try {
      const requestPayload = {
      userInput: formattedInput,
      entryType: ENTRY_TYPES.MOOD
      }
      const response = await apiClient.post('/integrations/openai/generate-response', requestPayload);
      setResponse(response.data.data.aiResponse);
     } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while submitting your Check-in. Please try again later.',
        [{ text: 'OK' }]
      )
    } finally {
      setIsLoading(false);
      setMoodDescription(moodDescription);
    }
  };

  const handleSaveEntry = async () => {
    const requestPayload = {
      entryType: ENTRY_TYPES.MOOD,
      mood: UI_CONSTANTS.MOOD_LABELS[moodEmoji],
      checkInResponse: moodDescription,
      aiResponse: response,
    }

    try {
      const response = await apiClient.put(`/users/${user.uid}/new-entry/mood`, requestPayload);
      if (response.status === 200) {
        Alert.alert(
          'Success',
          'Your mood entry has been saved successfully.',
          [{ text: 'OK', onPress: resetForm }]
        );
      } else {
        Alert.alert(
          'Error',
          'Failed to save your mood entry. Please try again later.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while saving your mood entry. Please try again later.',
        [{ text: 'OK' }]
      );
    }
  }

  const resetForm = () => {
    setMoodDescription('');
    setMoodEmoji(null);
    setResponse(null);
  }

  return (
    <View style={styles.container}>
      { /* Scrollable Content */ }
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
      <Text style={{ color: COLORS.textDark, fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
        How are you feeling today?
      </Text>

      <View style={styles.emojiRow}>
        {UI_CONSTANTS.MOOD_EMOJIS.map((emoji, index) => (
          <TouchableOpacity 
          key={index} 
          style={[
            styles.emojiButton,
            moodEmoji === index && styles.selectedEmojiButton
          ]}
          onPress={() => setMoodEmoji(prev => (prev === index ? null : index))}
          >

            <Text style={styles.emojiText}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{ color: COLORS.textDark, fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
        Why are you feeling this way?
      </Text>

    {!response ? (
      <TextBoxInput
        value={moodDescription}
        onChangeText={setMoodDescription}
        editable={true}
        placeholder="Type your thoughts here..."
      />
    ) : (
      <>
        <Text style={{ color: COLORS.textDark, fontSize: 16, marginTop: 20, fontWeight: '700' }}>
          You wrote:
        </Text>
        <TextBoxInput
          value={moodDescription}
          editable={false}
        />
      </>
    )}

    {response && (
      <>
        <Text style={{ color: COLORS.textDark, fontSize: 16, marginTop: 20, fontWeight: '700' }}>
          AI Coach Response:
        </Text>
        <TextBoxInput
          value={response}
          editable={false}
          placeholder="AI response will appear here..."
        />
      </>
    )}

     {isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Generating response...</Text>
      </View>
     ) : (
      <DualButton
        leftButtonText={response ? "New Entry" : "Submit"}
        rightButtonText={response ? "Save Entry" : "History"}
        onLeftPress={response ? resetForm : handleSubmit}
        onRightPress={() => {
          if (response) {
            handleSaveEntry();
          }
          // Handle history navigation here
          console.log('Navigate to mood history');
        }}
      />
     )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 7,
    alignItems: 'center',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    gap: 5
  },
  emojiButton: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  emojiText: {
    fontSize: 24,
  },
  selectedEmojiButton: {
    backgroundColor: COLORS.card || '#007bff',
    borderColor: COLORS.primary || '#007bff',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.textDark,
    fontSize: 16,
  }
});