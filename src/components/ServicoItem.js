import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ServicoItem({ nome, descricao, onEdit }) {
  return (
    <View style={styles.servicoItem}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
      {onEdit && (
        <TouchableOpacity style={styles.botaoEditar} onPress={onEdit}>
          <Text style={{ color: '#007bff' }}>Editar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  servicoItem: {
    backgroundColor: '#f3f3f3',
    marginBottom: 12,
    borderRadius: 6,
    padding: 12,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  descricao: {
    marginBottom: 8,
  },
  botaoEditar: {
    alignSelf: 'flex-end',
  },
});