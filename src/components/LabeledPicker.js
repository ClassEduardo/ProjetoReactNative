import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { listarServicos } from '../services/ServicoBD';

export default function LabeledPicker({
  label,
  selectedValue,
  onValueChange,
  pickerProps,
  children,
  style,
}) {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    listarServicos(lista => {
      if (Array.isArray(lista)) {
        setServicos(lista);
      } else {
        setServicos([]);
      }
    });
  }, []);

  const defaultItems = (
    <>
      <Picker.Item label="Selecione um serviço" value="" />
      {servicos.map(s => (
        <Picker.Item key={s.id} label={s.nome} value={s.nome} />
      ))}
    </>
  );

  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          {...pickerProps}
        >
          {children || defaultItems}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
});