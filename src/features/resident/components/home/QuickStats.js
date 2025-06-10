import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const QuickStats = () => {
  const navigation = useNavigation();
  const [billsPaid, setBillsPaid] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(0);

  const handlePayBills = () => {
    Alert.alert(
      'Pay Bills',
      'You will be redirected to the payment portal to pay $150.00',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: () => {
            // Navigate to payment screen
            navigation.navigate('PaymentPortal', {
              amount: 150.00,
              dueDate: 'Oct 30, 2023',
              billType: 'Monthly Rent & Utilities'
            });
          }
        }
      ]
    );
  };

  const handleBillsCardPress = () => {
    navigation.navigate('BillsHistory');
  };

  const handleViewAllNotifications = () => {
    navigation.navigate('NotificationsMain');
    setNotificationsRead(3); // Mark as read
  };

  const handleNotificationsCardPress = () => {
    handleViewAllNotifications();
  };

  const handleBillsMenu = () => {
    Alert.alert(
      'Bills Options',
      'Choose an action',
      [
        { text: 'View History', onPress: () => navigation.navigate('BillsHistory') },
        { text: 'Set Auto-Pay', onPress: () => navigation.navigate('AutoPaySetup') },
        { text: 'Download Receipt', onPress: () => Alert.alert('Receipt', 'Receipt downloaded to your device') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleNotificationsMenu = () => {
    Alert.alert(
      'Notifications Options',
      'Choose an action',
      [
        { text: 'Mark All Read', onPress: () => setNotificationsRead(3) },
        { text: 'Notification Settings', onPress: () => navigation.navigate('NotificationSettings') },
        { text: 'Clear All', onPress: () => Alert.alert('Cleared', 'All notifications cleared') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Bills Card */}
        <TouchableOpacity onPress={handleBillsCardPress} activeOpacity={0.7} style={{ flex: 1 }}>
          <Card style={[styles.card, styles.billsCard]} mode="elevated">
            <Card.Content style={styles.content}>
              <View style={styles.header}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="receipt" size={20} color="#DC2626" />
                </View>
                <TouchableOpacity onPress={handleBillsMenu}>
                  <MaterialCommunityIcons name="dots-horizontal" size={16} color="#94A3B8" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.label}>Bills Due</Text>
              <Text style={[styles.value, styles.billsValue]}>
                {billsPaid ? '$0.00' : '$150.00'}
              </Text>
              <Text style={styles.subtext}>
                {billsPaid ? 'All paid up!' : 'Due Oct 30, 2023'}
              </Text>
              
              {!billsPaid && (
                <View style={styles.urgencyIndicator}>
                  <MaterialCommunityIcons name="clock-alert" size={12} color="#DC2626" />
                  <Text style={styles.urgencyText}>3 days left</Text>
                </View>
              )}
              
              <Button 
                mode="contained" 
                buttonColor={billsPaid ? "#059669" : "#DC2626"}
                style={styles.button}
                labelStyle={styles.buttonLabel}
                onPress={billsPaid ? handleBillsCardPress : handlePayBills}
                disabled={billsPaid}
              >
                {billsPaid ? 'Paid ✓' : 'Pay Now'}
              </Button>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        {/* Notifications Card */}
        <TouchableOpacity onPress={handleNotificationsCardPress} activeOpacity={0.7} style={{ flex: 1 }}>
          <Card style={[styles.card, styles.notificationsCard]} mode="elevated">
            <Card.Content style={styles.content}>
              <View style={styles.header}>
                <View style={[styles.iconContainer, styles.notificationIcon]}>
                  <MaterialCommunityIcons name="bell" size={20} color="#2563EB" />
                  {(3 - notificationsRead) > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{3 - notificationsRead}</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity onPress={handleNotificationsMenu}>
                  <MaterialCommunityIcons name="dots-horizontal" size={16} color="#94A3B8" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.label}>Notifications</Text>
              <Text style={[styles.value, styles.notificationsValue]}>
                {3 - notificationsRead}
              </Text>
              <Text style={styles.subtext}>
                {notificationsRead === 3 ? 'All caught up!' : 'Critical Updates'}
              </Text>
              
              {notificationsRead < 3 && (
                <View style={styles.notificationTypes}>
                  <View style={styles.notificationType}>
                    <View style={[styles.dot, { backgroundColor: '#DC2626' }]} />
                    <Text style={styles.typeText}>2 Urgent</Text>
                  </View>
                  <View style={styles.notificationType}>
                    <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={styles.typeText}>1 Info</Text>
                  </View>
                </View>
              )}
              
              <Button 
                mode="outlined" 
                style={styles.outlinedButton}
                labelStyle={styles.outlinedButtonLabel}
                onPress={handleViewAllNotifications}
              >
                {notificationsRead === 3 ? 'View All' : 'View All'}
              </Button>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  billsCard: {
    backgroundColor: '#FEF2F2',
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  notificationsCard: {
    backgroundColor: '#EFF6FF',
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: '#FECACA',
    borderRadius: 10,
    padding: 8,
    position: 'relative',
  },
  notificationIcon: {
    backgroundColor: '#DBEAFE',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#DC2626',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  billsValue: {
    color: '#DC2626',
  },
  notificationsValue: {
    color: '#2563EB',
  },
  subtext: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 8,
  },
  urgencyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  urgencyText: {
    fontSize: 11,
    color: '#DC2626',
    fontWeight: '600',
  },
  notificationTypes: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  notificationType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  typeText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  button: {
    borderRadius: 12,
  },
  buttonLabel: {
    fontWeight: '600',
    fontSize: 13,
  },
  outlinedButton: {
    borderRadius: 12,
    borderColor: '#2563EB',
  },
  outlinedButtonLabel: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default QuickStats;