import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid, } from '@react-native-community/datetimepicker';
import { formatarDataHoraExibicao, paraIsoLocal } from '../utils/format';

export default function DateTimeInput({ label, value, onChange }) {
  const [showIos, setShowIos] = useState(false);

  const handleChangeIos = (_, selectedDate) => {
    setShowIos(false);
    if (selectedDate) {
      onChange(paraIsoLocal(selectedDate));
    }
  };

  const openAndroidPicker = () => {
    const currentDate = value ? new Date(value) : new Date();
    DateTimePickerAndroid.open({
      value: currentDate,
      mode: 'date',
      is24Hour: true,
      onChange: (event, date) => {
        if (event.type === 'set' && date) {
          const pickedDate = date;
          DateTimePickerAndroid.open({
            value: pickedDate,
            mode: 'time',
            is24Hour: true,
            onChange: (ev2, time) => {
              if (ev2.type === 'set' && time) {
                const final = new Date(pickedDate);
                final.setHours(time.getHours());
                final.setMinutes(time.getMinutes());
                onChange(paraIsoLocal(final));
              }
            },
          });
        }
      },
    });
  };

  const display = value ? formatarDataHoraExibicao(value) : 'Selecionar';

  const openPicker = () => {
    if (Platform.OS === 'android') {
      openAndroidPicker();
    } else {
      setShowIos(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={openPicker} style={styles.input}>
        <Text>{display}</Text>
      </TouchableOpacity>
      {Platform.OS !== 'android' && showIos && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="datetime"
          display="default"
          onChange={handleChangeIos}
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