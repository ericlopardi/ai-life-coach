import { View, Text, StyleSheet } from 'react-native';

export default function MoodScreen() {
  return (
    <View style={styles.container}>
      <Text>mood root</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});