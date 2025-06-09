import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatarBRL } from '../utils/format';

export default function ServicoFeitoItem({ item, onUpdate, onDelete }) {
  return (
    <View style={styles.servicoItem}>
      <Text style={styles.tipo}>{item.servico}</Text>
      <Text style={styles.cliente}>Cliente: {item.nome_cliente}</Text>
      <Text style={styles.valor}>Valor: {formatarBRL(item.valor)}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <View style={styles.botoes}>
        {onUpdate && (
          <TouchableOpacity style={styles.btnEditar} onPress={onUpdate}>
            <Text style={{ color: '#007bff', fontSize: 18 }}>Editar</Text>
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity style={styles.btnExcluir} onPress={onDelete}>
            <Text style={{ color: '#d00', fontSize: 18 }}>Excluir</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  servicoItem: {
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    borderRadius: 6,
    padding: 12,
    elevation: 1,
  },
  tipo: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    fontSize: 18,
  },
  cliente: {
    marginBottom: 2,
    fontSize: 18,
  },
  valor: {
    marginBottom: 2,
    fontSize: 18,
  },
  descricao: {
    marginBottom: 8,
    fontSize: 18,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  btnEditar: {
    marginRight: 18,
  },
  btnExcluir: {
  },
});