import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatarDataHoraExibicao, paraIsoLocal } from '../utils/format';

export default function DateTimeInput({ label, value, onChange }) {
  const [show, setShow] = useState(false);

  const handleChange = (_, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      onChange(paraIsoLocal(selectedDate));
    }
  };

  const display = value ? formatarDataHoraExibicao(value) : 'Selecionar';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
        <Text>{display}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="datetime"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
    fontSize: 16,
  },
  input: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
});