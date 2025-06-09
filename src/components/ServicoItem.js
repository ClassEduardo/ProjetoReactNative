import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ServicoItem({ nome, descricao, onEdit, onDelete }) {
  return (
    <View style={styles.servicoItem}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
      <View style={styles.botoes}>
        {onEdit && (
          <TouchableOpacity style={styles.botaoEditar} onPress={onEdit}>
            <Text style={{ color: '#007bff', fontSize: 18 }}>Editar</Text>
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity style={styles.botaoExcluir} onPress={onDelete}>
            <Text style={{ color: '#d00', fontSize: 18 }}>Excluir</Text>
          </TouchableOpacity>
        )}
      </View>
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
    fontSize: 18,
  },
  descricao: {
    marginBottom: 8,
    fontSize: 14,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  botaoEditar: {
    marginRight: 18,
  },
  botaoExcluir: {},
});