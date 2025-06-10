// src/features/resident/screens/MaintenanceDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MaintenanceDetailsScreen = ({ route }) => {
  const { title, date, time } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'Maintenance Notice'}</Text>
      <Text style={styles.text}>📅 {date || 'Oct 26, 2023'}</Text>
      <Text style={styles.text}>🕒 {time || '10 AM - 2 PM'}</Text>
      <Text style={styles.desc}>
        Maintenance will affect the water supply in the entire building. Please store water and prepare in advance. We
        apologize for the inconvenience and appreciate your cooperation.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: '#374151',
  },
  desc: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 16,
    lineHeight: 22,
  },
});

export default MaintenanceDetailsScreen;
