// src/features/admin/screens/BackupScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const BackupScreen = () => (
  <View style={styles.container}>
    <Text variant="titleLarge">🗂️ System Backup</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
});

export default BackupScreen;