// src/features/manager/screens/ContractListScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const ContractListScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">📄 Contract List</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
});

export default ContractListScreen;
