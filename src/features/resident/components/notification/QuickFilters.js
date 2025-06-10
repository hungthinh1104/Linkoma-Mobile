import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

const QuickFilters = ({ onFilterSelect }) => {
  const quickFilters = [
    { label: 'Electricity Bill', category: 'Bills' },
    { label: 'Server Update', category: 'Maintenance' },
    { label: 'Team Meeting', category: 'Events' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {quickFilters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickFilter}
            onPress={() => onFilterSelect(filter.category)}
            accessibilityLabel={`Quick filter: ${filter.label}`}
          >
            <Text style={styles.quickFilterText}>{filter.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94A3B8',
    marginBottom: 8,
  },
  scrollContent: {
    gap: 8,
  },
  quickFilter: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickFilterText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});

export default QuickFilters;