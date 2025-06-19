import { Text, View, TouchableOpacity } from "react-native"
import { COLORS } from '../constants/colors';

export default function DualButton({ leftButtonText, rightButtonText, onLeftPress, onRightPress }) {
    return (
        <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onLeftPress}>
                <Text style={styles.buttonText}>{leftButtonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onRightPress}>
                <Text style={styles.buttonText}>{rightButtonText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = {
    buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    width: '45%',
    borderColor: 'white'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
}