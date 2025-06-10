
// src/features/admin/screens/SettingScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const SettingScreen = () => (
  <View style={styles.container}>
    <Text variant="titleLarge">⚙️ System Settings</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
});

export default SettingScreen;
