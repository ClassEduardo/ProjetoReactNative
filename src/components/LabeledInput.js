import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function LabeledInput({ label, style, inputProps }) {
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...inputProps} style={[styles.input, inputProps?.style]} />
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
  input: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
});