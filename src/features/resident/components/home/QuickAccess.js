import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // Accounting for padding and gap

const shortcuts = [
  {
    icon: 'credit-card-outline',
    label: 'Bills',
    desc: 'View and manage payments',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    count: '2 due',
    screen: 'BillsManagement',
  },
  {
    icon: 'car-outline',
    label: 'Parking',
    desc: 'Book guest parking spots',
    color: '#059669',
    bgColor: '#ECFDF5',
    count: '3 available',
    screen: 'ParkingManagement',
  },
  {
    icon: 'message-outline',
    label: 'Feedback',
    desc: 'Share thoughts & issues',
    color: '#7C3AED',
    bgColor: '#F3E8FF',
    count: 'New',
    screen: 'FeedbackForm',
  },
  {
    icon: 'calendar-outline',
    label: 'Events',
    desc: 'Community activities',
    color: '#EA580C',
    bgColor: '#FFF7ED',
    count: '5 upcoming',
    screen: 'CommunityEvents',
  },
];

const QuickAccess = () => {
  const navigation = useNavigation();

  const handleShortcutPress = (item) => {
    switch (item.label) {
      case 'Bills':
        navigation.navigate('BillsManagement', {
          highlightDue: true,
          dueCount: 2
        });
        break;
      
      case 'Parking':
        navigation.navigate('ParkingManagement', {
          action: 'book',
          availableSpots: 3
        });
        break;
      
      case 'Feedback':
        navigation.navigate('FeedbackForm', {
          type: 'general',
          preselected: false
        });
        break;
      
      case 'Events':
        navigation.navigate('CommunityEvents', {
          filter: 'upcoming',
          count: 5
        });
        break;
      
      default:
        Alert.alert('Coming Soon', `${item.label} feature will be available soon!`);
    }
  };

  const handleLongPress = (item) => {
    const actions = {
      'Bills': [
        { text: 'View All Bills', onPress: () => navigation.navigate('BillsHistory') },
        { text: 'Pay Outstanding', onPress: () => navigation.navigate('PaymentPortal') },
        { text: 'Set Auto-Pay', onPress: () => navigation.navigate('AutoPaySetup') },
      ],
      'Parking': [
        { text: 'My Parking Spots', onPress: () => navigation.navigate('ParkingMain') },
        { text: 'Book Guest Parking', onPress: () => navigation.navigate('BookGuestParking') },
        { text: 'Parking Rules', onPress: () => navigation.navigate('ParkingRules') },
        { text: 'Parking Screen', onPress: () => navigation.navigate('ParkingMain') }
      ],
      'Feedback': [
        { text: 'Submit Feedback', onPress: () => navigation.navigate('FeedbackForm') },
        { text: 'Report Issue', onPress: () => navigation.navigate('ReportIssue') },
        { text: 'Previous Submissions', onPress: () => navigation.navigate('FeedbackHistory') },
      ],
      'Events': [
        { text: 'Upcoming Events', onPress: () => navigation.navigate('UpcomingEvents') },
        { text: 'My RSVPs', onPress: () => navigation.navigate('MyRSVPs') },
        { text: 'Event Calendar', onPress: () => navigation.navigate('EventCalendar') },
      ],
    };

    const itemActions = actions[item.label] || [];
    
    Alert.alert(
      item.label,
      'Choose an action:',
      [
        ...itemActions,
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {shortcuts.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            activeOpacity={0.7}
            onPress={() => handleShortcutPress(item)}
            onLongPress={() => handleLongPress(item)}
            style={styles.cardWrapper}
          >
            <Card style={styles.card} mode="elevated">
              <Card.Content style={styles.content}>
                <View style={styles.header}>
                  <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
                    <MaterialCommunityIcons name={item.icon} size={28} color={item.color} />
                  </View>
                  {item.count && (
                    <View style={[styles.badge, { backgroundColor: item.color }]}>
                      <Text style={styles.badgeText}>{item.count}</Text>
                    </View>
                  )}
                </View>
                
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                
                <View style={styles.arrow}>
                  <MaterialCommunityIcons name="arrow-right" size={18} color="#94A3B8" />
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -4, // Compensate for cardWrapper padding
  },
  cardWrapper: {
    width: '50%',
    padding: 6,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    minHeight: 160, // Set minimum height for the cards
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    position: 'relative',
    height: '100%', // Make content fill the card height
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    borderRadius: 14,
    padding: 12,
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 6,
  },
  desc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 12,
  },
  arrow: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default QuickAccess;