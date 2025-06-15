import { TextInput } from "react-native";

export default function TextBoxInput({ value, onChangeText, editable = true, placeholder = "Share your thoughts..." }) {
    return (
        <TextInput 
        style={[
            styles.textBoxInput,
            !editable && styles.readOnlyInput
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={true}
        editable={editable}
        scrollEnabled={true}
        textAlignVertical="top">
      </TextInput> 
    )
}

const styles = {
    textBoxInput: {
        height: 150,
        width: '90%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginTop: 20
    },
    readOnlyInput: {
        backgroundColor: '#fff',
        borderColor: 'black',
    }
}