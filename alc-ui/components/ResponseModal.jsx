import { Modal, View, ScrollView, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import DualButton from './DualButton';

export default function ResponseModal({ modalVisible, setModalVisible, response, resetForm }) {
    return (
        <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
        resetForm();
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>AI Coach Response</Text>

          <ScrollView style={styles.responseContainer}>
            <Text style={styles.responseText}>{response}</Text>
          </ScrollView>

          <DualButton
            leftButtonText="New Entry"
            rightButtonText="Save Entry"
            onLeftPress={resetForm}
            onRightPress={() => {
              // TODO: Implement save entry functionality
              console.log('Save entry functionality not implemented yet');
              resetForm();
            }}
            />
        </View>
    </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 15,
  },
  responseContainer: {
    width: '100%',
    maxHeight: 300,
    marginBottom: 20,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
    color: COLORS.textDark,
  }
})