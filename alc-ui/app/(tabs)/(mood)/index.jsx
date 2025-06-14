import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { UI_CONSTANTS } from '../../../constants/constants';
import { useState } from 'react';
import TextBoxInput from '../../../components/TextBoxInput';
import DualButton from '../../../components/DualButton';

export default function MoodScreen() {
  const [moodDescription, setMoodDescription] = useState('');
  const [moodEmoji, setMoodEmoji] = useState(null);

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

    <DualButton
      leftButtonText="Submit"
      rightButtonText="History"
      onLeftPress={() => {
        // handle submit logic here
        if(moodEmoji !== null && moodDescription.trim() !== '') {
          console.log('Mood submitted:', {
            emoji: UI_CONSTANTS.MOOD_LABELS[moodEmoji],
            description: moodDescription,
          });
          setMoodDescription('');
          setMoodEmoji(null);
        } else {
          Alert.alert(
            'Incomplete Submission',
            'Please select a mood emoji and provide a description before submitting.',
            [{ text: 'OK' }]
          )
          setMoodDescription('');
          setMoodEmoji(null);
        }
      }}
      onRightPress={() => {
        // Handle history navigation here
        console.log('Navigate to mood history');
      }}
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  button: {
    backgroundColor: "#dddddd",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    width: '45%',
    borderColor: 'black'
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});