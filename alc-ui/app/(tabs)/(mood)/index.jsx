import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { UI_CONSTANTS } from '../../../constants/constants';
import { useContext, useState } from 'react';
import TextBoxInput from '../../../components/TextBoxInput';
import DualButton from '../../../components/DualButton';
import apiClient from '../../../lib/apiClient';
import { AuthContext } from '../../../context/AuthProvider';

export default function MoodScreen() {
  const [moodDescription, setMoodDescription] = useState('');
  const [moodEmoji, setMoodEmoji] = useState(null);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (moodEmoji === null || moodDescription.trim() === '') {
      Alert.alert(
        'Incomplete Submission',
        'Please select a mood emoji and provide a description before submitting.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsLoading(true);

    setMoodDescription(`You wrote:\n${moodDescription}`)

    try {
      const requestPayload = {
      userInput: moodDescription,
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
      mood: UI_CONSTANTS.MOOD_LABELS[moodEmoji],
      checkInResponse: moodDescription,
      aiResponse: response,
    }

    try {
      const response = await apiClient.put(`/users/${user.uid}/new-mood-entry`, requestPayload);
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
      { /* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mood Check-In</Text>
      </View>

      { /* Scrollable Content */ }
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
      <Text style={{ color: COLORS.textDark, fontSize: 16, marginTop: 20 }}>
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
          onPress={() => setMoodEmoji(index)}
          >

            <Text style={styles.emojiText}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{ color: COLORS.textDark, fontSize: 16, marginTop: 20 }}>
        Why are you feeling this way?
      </Text>

     <TextBoxInput
      value={moodDescription}
      onChangeText={setMoodDescription}
      editable={!response}
     />

     {response && (
      <>
        <TextBoxInput
          value={`AI Coach Response:\n${response}`}
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
  header: {
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    gap: 2
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
    backgroundColor: COLORS.primary || '#007bff',
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