import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

const FilterTabs = ({ activeFilter, onFilterChange, notifications }) => {
  const filters = [
    { key: 'All', label: 'All' },
    { key: 'Bills', label: 'Bills' },
    { key: 'Events', label: 'Events' },
    { key: 'Maintenance', label: 'Maintenance' },
  ];

  const getFilterCount = (filterKey) => {
    if (filterKey === 'All') return notifications.length;
    return notifications.filter(n => n.category === filterKey).length;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.tab,
              activeFilter === filter.key && styles.activeTab
            ]}
            onPress={() => onFilterChange(filter.key)}
            accessibilityLabel={`Filter: ${filter.label}`}
          >
            <Text
              style={[
                styles.tabText,
                activeFilter === filter.key && styles.activeTabText
              ]}
            >
              {filter.label}
            </Text>
            <View
              style={[
                styles.badge,
                activeFilter === filter.key && styles.activeBadge
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  activeFilter === filter.key && styles.activeBadgeText
                ]}
              >
                {getFilterCount(filter.key)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#2563EB',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  activeTabText: {
    color: '#fff',
  },
  badge: {
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  activeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  activeBadgeText: {
    color: '#fff',
  },
});

export default FilterTabs;