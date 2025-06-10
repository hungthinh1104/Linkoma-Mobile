// src/features/manager/screens/ScheduleRequestScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const ScheduleRequestScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">📅 Schedule Request Management</Text>
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

export default ScheduleRequestScreen;
