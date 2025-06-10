import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { Text, Searchbar, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import NotificationCard from '../components/notification/NotificationCard';
import FilterTabs from '../components/notification/FilterTabs';
import QuickFilters from '../components/notification/QuickFilters';
import UrgentAlert from '../components/notification/UrgentAlert';

// Mock data (move above component)
const mockNotifications = [
  {
    id: 1,
    type: 'bill',
    category: 'Bills',
    title: 'Monthly Bill Due: Electricity',
    description: 'Your electricity bill of $75.50 is due on October 25, 2023.',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    priority: 'high',
    isRead: false,
    icon: 'flash',
    data: { billId: 'elec-001', amount: 75.50 }
  },
  {
    id: 2,
    type: 'event',
    category: 'Events',
    title: 'New Event: Product Launch',
    description: 'Join us for the unveiling of our latest product next Tuesday.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    priority: 'medium',
    isRead: false,
    icon: 'rocket-launch',
    data: { eventId: 'event-001' }
  },
  {
    id: 3,
    type: 'maintenance',
    category: 'Maintenance',
    title: 'Scheduled Maintenance: Server Update',
    description: 'Our servers will undergo scheduled maintenance from 2 AM to 4 AM UTC.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    priority: 'low',
    isRead: false,
    icon: 'server',
    data: { maintenanceId: 'maint-001' }
  },
  {
    id: 4,
    type: 'payment',
    category: 'Bills',
    title: 'Payment Confirmation: Internet Bill',
    description: 'Your payment of $60.00 for the internet bill has been successfully processed.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    priority: 'low',
    isRead: true,
    icon: 'check-circle',
    data: { paymentId: 'pay-001', amount: 60.00 }
  },
  {
    id: 5,
    type: 'meeting',
    category: 'Events',
    title: 'Team Meeting Reminder',
    description: 'Don\'t forget our weekly team sync meeting at 10 AM in Conference Room 3.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    isRead: false,
    icon: 'account-group',
    data: { meetingId: 'meet-001' }
  },
  {
    id: 6,
    type: 'alert',
    category: 'Maintenance',
    title: 'Urgent System Alert',
    description: 'Critical security patch available. Please update your application immediately.',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    priority: 'high',
    isRead: false,
    icon: 'alert-circle',
    data: { alertId: 'alert-001' }
  }
];

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [notifications, setNotifications] = useState(mockNotifications);

  // Memoized filtered notifications
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;
    if (activeFilter !== 'All') {
      filtered = filtered.filter(notif => notif.category === activeFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter(notif =>
        notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [notifications, activeFilter, searchQuery]);

  const handleMarkAllRead = () => {
    Alert.alert(
      'Mark All as Read',
      'Are you sure you want to mark all notifications as read?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Mark All',
          onPress: () => {
            setNotifications(prev =>
              prev.map(notif => ({ ...notif, isRead: true }))
            );
          },
        },
      ]
    );
  };

  const handleNotificationPress = (notification) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notification.id ? { ...notif, isRead: true } : notif
      )
    );
    switch (notification.type) {
      case 'bill':
        navigation.navigate('BillDetails', { billId: notification.data?.billId });
        break;
      case 'event':
        navigation.navigate('EventDetails', { eventId: notification.data?.eventId });
        break;
      case 'maintenance':
        navigation.navigate('MaintenanceDetails', { maintenanceId: notification.data?.maintenanceId });
        break;
      default:
        navigation.navigate('NotificationDetails', { notificationId: notification.id });
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Tạo header cho FlatList
  const renderListHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Avatar.Image
            size={32}
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search notifications..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#64748B"
        />
      </View>

      {/* Filter Tabs */}
      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        notifications={notifications}
      />

      {/* Quick Filters */}
      <QuickFilters onFilterSelect={setActiveFilter} />

      {/* Mark All as Read Button */}
      {unreadCount > 0 && (
        <TouchableOpacity style={styles.markAllButton} onPress={handleMarkAllRead}>
          <MaterialCommunityIcons name="check-all" size={16} color="#2563EB" />
          <Text style={styles.markAllText}>Mark All as Read</Text>
        </TouchableOpacity>
      )}

      {/* Urgent Alert */}
      <UrgentAlert />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FlatList
        data={filteredNotifications}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.notificationsList}
        renderItem={({ item }) => (
          <NotificationCard
            notification={item}
            onPress={() => handleNotificationPress(item)}
            onAction={(action) => console.log('Action:', action)}
          />
        )}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="bell-off" size={48} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No notifications found</Text>
            <Text style={styles.emptyDesc}>
              {searchQuery ? 'Try adjusting your search' : 'You\'re all caught up!'}
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.bottomSpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: '#F1F5F9',
    elevation: 0,
    borderRadius: 12,
  },
  searchInput: {
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2563EB',
    gap: 8,
  },
  markAllText: {
    color: '#2563EB',
    fontWeight: '500',
    fontSize: 14,
  },
  notificationsList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomSpace: {
    height: 32,
  },
});

export default NotificationScreen;