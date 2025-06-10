// src/features/manager/screens/FeedbackScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const FeedbackScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">📬 Resident Feedback</Text>
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

export default FeedbackScreen;