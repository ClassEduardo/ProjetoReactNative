import { Modal, View, StyleSheet, ScrollView } from 'react-native';

export default function CenteredModal({ visible, onRequestClose, children }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalBg}>
        <View style={styles.modal}>
          <ScrollView contentContainerStyle={styles.content}>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    maxHeight: '90%',
    minWidth: '90%',
  },
  content: {
    flexGrow: 1,
  }
});