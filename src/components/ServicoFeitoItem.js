import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatarBRL } from '../utils/format';

export default function ServicoFeitoItem({ item, onUpdate, onDelete }) {
  return (
    <View style={styles.servicoItem}>
      <Text style={styles.campo}>Cliente: {item.nome_cliente}</Text>
      <Text style={styles.campo}>Data entrada: {formatarBRL(item.data_hora_entrada)}</Text>
      <Text style={styles.campo}>Equipamento: {formatarBRL(item.equipamento)}</Text>
      <Text style={styles.campo}>Valor: {formatarBRL(item.valor)}</Text>
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
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  campo: {
    marginBottom: 2,
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