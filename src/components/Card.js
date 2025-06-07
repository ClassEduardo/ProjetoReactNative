import { View, StyleSheet } from 'react-native';

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f4f4f4',
    borderRadius: 6,
  },
});