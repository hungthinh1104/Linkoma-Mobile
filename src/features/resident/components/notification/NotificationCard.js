import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PriorityBadge from './PriorityBadge';
import { formatTimeAgo } from '../../../../untils/dateUtils'; // Adjust the import path as needed

const NotificationCard = ({ notification, onPress, onAction }) => {
  const {
    title,
    description,
    timestamp,
    priority,
    isRead,
    icon,
    type,
    category
  } = notification;

  const getIconColor = () => {
    switch (priority) {
      case 'high': return '#DC2626';
      case 'medium': return '#F59E0B';
      case 'low': return '#059669';
      default: return '#64748B';
    }
  };

  const getBackgroundColor = () => {
    switch (priority) {
      case 'high': return '#FEF2F2';
      case 'medium': return '#FFFBEB';
      case 'low': return '#ECFDF5';
      default: return '#F8FAFC';
    }
  };

  const hasAction = ['bill', 'event', 'maintenance'].includes(type);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        !isRead && styles.unreadCard,
        { backgroundColor: isRead ? '#fff' : getBackgroundColor() }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={getIconColor()}
            />
            {!isRead && <View style={styles.unreadDot} />}
          </View>
          
          <View style={styles.headerRight}>
            <Text style={styles.timestamp}>
              {formatTimeAgo(timestamp)}
            </Text>
            <PriorityBadge priority={priority} />
          </View>
        </View>

        <View style={styles.body}>
          <Text style={[styles.title, !isRead && styles.unreadTitle]}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>

        {hasAction && !isRead && (
          <View style={styles.actions}>
            <Button
              mode="contained"
              compact
              buttonColor={getIconColor()}
              style={styles.actionButton}
              labelStyle={styles.actionButtonText}
              onPress={(e) => {
                e.stopPropagation();
                onAction?.(type);
              }}
            >
              {getActionText(type)}
            </Button>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const getActionText = (type) => {
  switch (type) {
    case 'bill': return 'Pay Now';
    case 'event': return 'View Event';
    case 'maintenance': return 'View Details';
    default: return 'View';
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#2563EB',
  },
  content: {
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    padding: 8,
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  headerRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  body: {
    gap: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E293B',
    lineHeight: 20,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  actions: {
    alignItems: 'flex-start',
  },
  actionButton: {
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default NotificationCard;