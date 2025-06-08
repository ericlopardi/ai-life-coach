import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function AppLayout({ children, noScroll = false }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      {noScroll ? (
        <View style={styles.content}>{children}</View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
