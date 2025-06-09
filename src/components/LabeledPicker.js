import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function LabeledPicker({
  label,
  selectedValue,
  onValueChange,
  pickerProps,
  children,
  style,
}) {

  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          {...pickerProps}
        >
          {children}
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