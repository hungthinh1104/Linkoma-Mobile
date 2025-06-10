import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const PriorityBadge = ({ priority }) => {
  const getStyles = () => {
    switch (priority) {
      case 'high':
        return {
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
          text: 'High'
        };
      case 'medium':
        return {
          backgroundColor: '#FEF3C7',
          color: '#D97706',
          text: 'Medium'
        };
      case 'low':
        return {
          backgroundColor: '#D1FAE5',
          color: '#059669',
          text: 'Low'
        };
      default:
        return {
          backgroundColor: '#F1F5F9',
          color: '#64748B',
          text: 'Normal'
        };
    }
  };

  const badgeStyles = getStyles();

  return (
    <View style={[styles.badge, { backgroundColor: badgeStyles.backgroundColor }]}>
      <Text style={[styles.text, { color: badgeStyles.color }]}>
        {badgeStyles.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
  },
});

export default PriorityBadge;