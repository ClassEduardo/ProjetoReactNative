import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatarBRL } from '../utils/format';

export default function ServicoFeitoItem({ item, onUpdate, onDelete }) {
  return (
    <View style={styles.servicoItem}>
      <Text style={styles.tipo}>{item.tipo_servico}</Text>
      <Text style={styles.cliente}>Cliente: {item.nome_cliente}</Text>
      <Text style={styles.valor}>Valor: {formatarBRL(item.valor)}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <View style={styles.botoes}>
        {onUpdate && (
          <TouchableOpacity style={styles.btnAtualizar} onPress={onUpdate}>
            <Text style={{ color: '#007bff' }}>Atualizar</Text>
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity style={styles.btnExcluir} onPress={onDelete}>
            <Text style={{ color: '#d00' }}>Excluir</Text>
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
  },
  cliente: {
    marginBottom: 2,
  },
  valor: {
    marginBottom: 2,
  },
  descricao: {
    marginBottom: 8,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  btnAtualizar: {
    marginRight: 18,
  },
  btnExcluir: {},
});