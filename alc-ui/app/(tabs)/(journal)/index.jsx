import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { COLORS } from '../../../constants/colors';
import { PROMPTS } from '../../../constants/prompts';
import PromptCard from '../../../components/PromptCard';
import TextBoxInput from '../../../components/TextBoxInput';
import DualButton from '../../../components/DualButton';

export default function JournalScreen() {
  const [promptIndex, setPromptIndex] = useState(() => Math.floor(Math.random() * PROMPTS.length));
  const [journalDescription, setJournalDescription] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleGeneratePrompt = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * PROMPTS.length);
    } while (newIndex === promptIndex);
    setPromptIndex(newIndex);
  }

  const handleSubmit = async () => {
    if (journalDescription.trim() === '') {
      Alert.alert(
        'Incomplete Submission',
        'Please provide a journal entry before submitting.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsLoading(true);

    setJournalDescription(`You wrote:\n${journalDescription}`)

    try {
      const requestPayload = {
      journalDescription: journalDescription,
      }
      const response = await apiClient.post('/integrations/openai/generate-ai-journal-response', requestPayload);
      setResponse(response.data.data.aiResponse);
      setModalVisible(true);
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while submitting your journal entry. Please try again later.',
        [{ text: 'OK' }]
      )
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setJournalDescription('');
    setResponse(null);
    setModalVisible(false);
  }
  
  return (
    <ScrollView style={styles.content} contentContainerStyle={styles.scrollContainer}>
      <PromptCard 
        prompt={PROMPTS[promptIndex]} 
        onGeneratePress={handleGeneratePrompt} 
      />
      <TextBoxInput
        value={journalDescription}
        onChangeText={setJournalDescription}
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
              console.log('Save entry functionality not implemented yet');
              resetForm();
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