// src/features/admin/screens/HomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const HomeScreen = () => (
  <View style={styles.container}>
    <Text variant="titleLarge">📊 Admin Dashboard</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
});

export default HomeScreen;