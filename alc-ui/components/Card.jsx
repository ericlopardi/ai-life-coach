import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function Card({ children, onPress, style, activeOpacity = 0.9 }) {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[styles.card, style]}
      {...(onPress ? { onPress, activeOpacity } : {})}
    >
      {children}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
});
