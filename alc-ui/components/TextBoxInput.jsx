import { TextInput } from "react-native";

export default function TextBoxInput({ value, onChangeText }) {
    return (
        <TextInput 
        style={styles.textBoxInput}
        placeholder="Share your thoughts..."
        value={value}
        onChangeText={onChangeText}
        multiline={true}>
      </TextInput> 
    )
}

const styles = {
    textBoxInput: {
        height: 100,
        width: '90%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginTop: 20
    }
}