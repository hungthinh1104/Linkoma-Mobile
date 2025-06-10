// src/features/manager/screens/NotificationScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">📢 Notifications</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default NotificationScreen;