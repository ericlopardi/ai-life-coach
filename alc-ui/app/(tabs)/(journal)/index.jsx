import { View, Text, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import { COLORS } from '../../../constants/colors';
import { PROMPTS } from '../../../constants/prompts';
import { ENTRY_TYPES } from '../../../constants/constants';
import PromptCard from '../../../components/PromptCard';
import TextBoxInput from '../../../components/TextBoxInput';
import DualButton from '../../../components/DualButton';
import apiClient from '../../../lib/apiClient';
import { AuthContext } from '../../../context/AuthProvider';
import { useJournalPrompt } from '../../../context/JournalPromptContext'

export default function JournalScreen() {
  const { promptIndex, setPromptIndex } = useJournalPrompt();
  const [journalDescription, setJournalDescription] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleGeneratePrompt = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * PROMPTS.length);
    } while (newIndex === promptIndex);
    setPromptIndex(newIndex);
  }

  const handleSubmit = async () => {
    if (!journalDescription || journalDescription.trim() === '') {
      Alert.alert(
        'Incomplete Submission',
        'Please provide a journal entry before submitting.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsLoading(true);
    const formattedInput = `You wrote:\n${journalDescription}`;

    try {
      const requestPayload = {
      userInput: formattedInput,
      entryType: ENTRY_TYPES.JOURNAL
      };
      const response = await apiClient.post('/integrations/openai/generate-response', requestPayload);
      setResponse(response.data.data.aiResponse);
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while submitting your journal entry. Please try again later.',
        [{ text: 'OK' }]
      )
    } finally {
      setIsLoading(false);
      setJournalDescription(journalDescription);
    }
  };

  const handleSaveEntry = async () => {
    const requestPayload = {
      entryType: ENTRY_TYPES.JOURNAL,
      journalEntryResponse: journalDescription,
      aiPrompt: response,
    }

    try {
      const response = await apiClient.put(`/users/${user.uid}/new-entry/journal`, requestPayload);
      if (response.status === 200) {
        Alert.alert(
          'Success',
          'Your journal entry has been saved successfully.',
          [{ text: 'OK', onPress: resetForm }]
        );
      } else {
        Alert.alert(
          'Error',
          'Failed to save your journal entry. Please try again later.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while saving your journal entry. Please try again later.',
        [{ text: 'OK' }]
      );
    }
  } 

  const resetForm = () => {
    setJournalDescription('');
    setResponse(null);
  }
  
  return (
    <ScrollView style={styles.content} contentContainerStyle={styles.scrollContainer}>
      <PromptCard 
        prompt={PROMPTS[promptIndex]} 
        onGeneratePress={handleGeneratePrompt} 
      />
      {!response ? (
            <TextBoxInput
              value={journalDescription}
              onChangeText={setJournalDescription}
              editable={true}
              placeholder="Type your thoughts here..."
            />
          ) : (
            <>
              <Text style={{ color: COLORS.textDark, fontSize: 16, marginTop: 5, fontWeight: '700' }}>
                You wrote:
              </Text>
              <TextBoxInput
                value={journalDescription}
                editable={false}
              />
            </>
          )}
      
          {response && (
            <>
              <Text style={{ color: COLORS.textDark, fontSize: 16, marginTop: 10, fontWeight: '700' }}>
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
            console.log('Navigate to journal history');
          }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 7,
    paddingTop: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  }
});