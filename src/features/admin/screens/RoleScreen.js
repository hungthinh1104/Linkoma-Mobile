// src/features/admin/screens/RoleScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const RoleScreen = () => (
  <View style={styles.container}>
    <Text variant="titleLarge">🔐 Role & Permission Management</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
});

export default RoleScreen;
