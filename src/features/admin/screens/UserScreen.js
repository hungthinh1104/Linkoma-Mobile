// src/features/admin/screens/UserScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const UserScreen = () => (
  <View style={styles.container}>
    <Text variant="titleLarge">👤 User Management</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
});

export default UserScreen;
