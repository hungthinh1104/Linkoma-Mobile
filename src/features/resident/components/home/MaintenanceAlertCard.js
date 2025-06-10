import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MaintenanceAlertCard = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(true);
  const [isReminderSet, setIsReminderSet] = useState(false);

  const handleViewDetails = () => {
    navigation.navigate('MaintenanceDetails', {
      alertId: 'water-shutoff-oct26',
      title: 'Water Shut-off Maintenance',
      date: 'Oct 26th, 2023',
      time: '10 AM - 2 PM'
    });
  };

  const handleSetReminder = () => {
    setIsReminderSet(true);
    Alert.alert(
      'Reminder Set',
      'You will be notified 30 minutes before the maintenance begins.',
      [{ text: 'OK' }]
    );
  };

  const handleDismiss = () => {
    Alert.alert(
      'Dismiss Alert',
      'Are you sure you want to dismiss this maintenance alert?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Dismiss', 
          style: 'destructive',
          onPress: () => setIsVisible(false)
        }
      ]
    );
  };

  const handleCardPress = () => {
    handleViewDetails();
  };

  if (!isVisible) return null;

  return (
    <TouchableOpacity onPress={handleCardPress} activeOpacity={0.7}>
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="alert-circle" size={24} color="#F59E0B" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.title}>Building Maintenance Alert</Text>
              <Text style={styles.priority}>High Priority</Text>
            </View>
            <TouchableOpacity onPress={handleDismiss} style={styles.dismissButton}>
              <MaterialCommunityIcons name="close" size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.alertContent}>
            <Text style={styles.description}>
              Scheduled water shut-off on Oct 26th, 10 AM - 2 PM. Please prepare accordingly and store water in advance.
            </Text>
            
            <TouchableOpacity style={styles.timeInfo} onPress={handleViewDetails}>
              <MaterialCommunityIcons name="clock-outline" size={16} color="#F59E0B" />
              <Text style={styles.timeText}>Starts in 2 hours</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.actions}>
            <Button 
              mode="outlined" 
              style={[styles.secondaryButton, isReminderSet && styles.reminderSetButton]}
              labelStyle={[styles.secondaryButtonText, isReminderSet && styles.reminderSetText]}
              onPress={handleSetReminder}
              disabled={isReminderSet}
            >
              {isReminderSet ? 'Reminder Set' : 'Remind Me'}
            </Button>
            <Button 
              mode="contained" 
              buttonColor="#F59E0B"
              style={styles.primaryButton}
              labelStyle={styles.primaryButtonText}
              onPress={handleViewDetails}
            >
              View Details
            </Button>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFBEB',
    marginBottom: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    elevation: 2,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 2,
  },
  priority: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '500',
  },
  dismissButton: {
    padding: 4,
  },
  alertContent: {
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
    marginBottom: 8,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 4,
  },
  timeText: {
    fontSize: 13,
    color: '#D97706',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    borderColor: '#D97706',
    borderRadius: 12,
  },
  reminderSetButton: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  secondaryButtonText: {
    color: '#D97706',
    fontWeight: '600',
  },
  reminderSetText: {
    color: '#059669',
  },
  primaryButton: {
    flex: 1,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default MaintenanceAlertCard;