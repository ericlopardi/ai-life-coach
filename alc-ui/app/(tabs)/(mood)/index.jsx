import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { UI_CONSTANTS } from '../../../constants/constants';
import { useState } from 'react';
import TextBoxInput from '../../../components/TextBoxInput';
import DualButton from '../../../components/DualButton';
import ResponseModal from '../../../components/ResponseModal';
import apiClient from '../../../lib/apiClient';

export default function MoodScreen() {
  const [moodDescription, setMoodDescription] = useState('');
  const [moodEmoji, setMoodEmoji] = useState(null);
  const [response, setResponse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    try {
      const requestPayload = {
      moodDescription: moodDescription,
      }
      const response = await apiClient.post('/integrations/openai/generate-ai-mood-response', requestPayload);
      setResponse(response.data.data.aiResponse);
      setModalVisible(true);
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while submitting your Check-in. Please try again later.',
        [{ text: 'OK' }]
      )
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setMoodDescription('');
    setMoodEmoji(null);
    setResponse(null);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Check-In</Text>

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
     />

     {isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Generating response...</Text>
      </View>
     ) : (
      <DualButton
        leftButtonText="Submit"
        rightButtonText="History"
        onLeftPress={handleSubmit}
        onRightPress={() => {
          // Handle history navigation here
          console.log('Navigate to mood history');
        }}
      />
     )}

      <ResponseModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        response={response}
        resetForm={resetForm}
      />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginTop: -250,
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