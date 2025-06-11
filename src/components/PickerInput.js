import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function PickerInput({
  label,
  selectedValue,
  onValueChange,
  items = [],
  style,
  pickerProps,
}) {
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          {...pickerProps}
          style={styles.picker}
        >
          {items.map(({ label: lbl, value }) => (
            <Picker.Item key={value} label={lbl} value={value} />
          ))}
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
  inputWrapper: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  picker: {
    paddingHorizontal: 12,
  },
});