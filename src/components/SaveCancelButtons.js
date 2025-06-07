import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function SaveCancelButtons({ onSave, onCancel, orientation = 'column', style }) {
  const orientationStyle = orientation === 'row' ? styles.row : null;
  return (
    <View style={[styles.container, orientationStyle, style]}>
      <Button title="Salvar alterações" onPress={onSave} />
      <Button title="Cancelar" color="gray" onPress={onCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});