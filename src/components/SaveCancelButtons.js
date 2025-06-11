import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

export default function SaveCancelButtons({ onSave, onCancel }) {
  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, styles.save]} onPress={onSave}>
        <Text style={styles.text}>Salvar</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.cancel]} onPress={onCancel}>
        <Text style={styles.text}>Cancelar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',           
    justifyContent: 'flex-end',     
    marginTop: 16,
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',               
  },
  save: {
    backgroundColor: '#007AFF',     
  },
  cancel: {
    backgroundColor: '#CCC',        
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});