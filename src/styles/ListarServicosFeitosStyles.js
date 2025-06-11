import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  secao: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#eaeaea',
    padding: 6,
    marginTop: 18,
    marginBottom: 8,
    borderRadius: 5,
    textAlign: 'center',
  },
  textarea: {
    height: 60,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  modalSave: {
    backgroundColor: '#007AFF',
  },
  modalCancel: {
    backgroundColor: '#CCC',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;