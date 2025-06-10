import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RecentActivityList = () => {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([
    {
      id: 1,
      icon: 'package-variant',
      title: 'Package Delivered',
      desc: 'Your Amazon package has arrived at the front desk.',
      time: '2 hours ago',
      action: 'Collect Now',
      color: '#059669',
      bgColor: '#ECFDF5',
      priority: 'high',
      actionType: 'collect',
      completed: false,
    },
    {
      id: 2,
      icon: 'account-group-outline',
      title: 'Resident Meeting',
      desc: 'Annual Resident Meeting tomorrow at 6 PM in the lounge.',
      time: 'Yesterday',
      color: '#2563EB',
      bgColor: '#EFF6FF',
      priority: 'medium',
      actionType: 'rsvp',
      completed: false,
    },
    {
      id: 3,
      icon: 'clock-outline',
      title: 'Lease Renewal',
      desc: 'Your lease agreement is due for renewal on Dec 31, 2023.',
      time: '3 days ago',
      action: 'Renew Online',
      color: '#EA580C',
      bgColor: '#FFF7ED',
      priority: 'high',
      actionType: 'renew',
      completed: false,
    },
    {
      id: 4,
      icon: 'dumbbell',
      title: 'Gym Equipment Update',
      desc: 'New cardio machines are now available in the fitness center!',
      time: '1 week ago',
      color: '#7C3AED',
      bgColor: '#F3E8FF',
      priority: 'low',
      actionType: 'info',
      completed: false,
    },
  ]);

  const handleActivityPress = (activity) => {
    switch (activity.actionType) {
      case 'collect':
        navigation.navigate('PackageDetails', {
          packageId: activity.id,
          status: 'ready_for_pickup'
        });
        break;
      
      case 'rsvp':
        navigation.navigate('EventDetails', {
          eventId: 'annual-meeting-2023',
          eventType: 'meeting'
        });
        break;
      
      case 'renew':
        navigation.navigate('LeaseRenewal', {
          leaseId: 'current-lease',
          expiryDate: 'Dec 31, 2023'
        });
        break;
      
      case 'info':
        navigation.navigate('AmenityDetails', {
          amenity: 'gym',
          update: 'equipment'
        });
        break;
      
      default:
        Alert.alert('Activity Details', activity.desc);
    }
  };

  const handleActionPress = (activity) => {
    switch (activity.actionType) {
      case 'collect':
        Alert.alert(
          'Collect Package',
          'Please bring a valid ID to the front desk to collect your package.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Mark as Collected', 
              onPress: () => markActivityCompleted(activity.id)
            }
          ]
        );
        break;
      
      case 'renew':
        navigation.navigate('LeaseRenewalForm', {
          leaseId: 'current-lease',
          currentTerms: 'standard'
        });
        break;
      
      default:
        handleActivityPress(activity);
    }
  };

  const markActivityCompleted = (activityId) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === activityId 
          ? { ...activity, completed: true }
          : activity
      )
    );
    Alert.alert('Success', 'Activity marked as completed!');
  };

  const handleLongPress = (activity) => {
    const actions = [
      { text: 'View Details', onPress: () => handleActivityPress(activity) },
      { text: 'Share', onPress: () => Alert.alert('Shared', 'Activity shared successfully') },
    ];

    if (!activity.completed) {
      actions.push({
        text: 'Mark as Read',
        onPress: () => markActivityCompleted(activity.id)
      });
    }

    actions.push({ text: 'Cancel', style: 'cancel' });

    Alert.alert('Activity Options', 'Choose an action:', actions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {activities.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            activeOpacity={0.7}
            onPress={() => handleActivityPress(item)}
            onLongPress={() => handleLongPress(item)}
          >
            <Card style={[styles.card, item.completed && styles.completedCard]} mode="elevated">
              <Card.Content style={styles.content}>
                <View style={styles.row}>
                  <View style={[styles.iconWrap, { backgroundColor: item.bgColor }]}>
                    <MaterialCommunityIcons 
                      name={item.completed ? "check-circle" : item.icon} 
                      size={20} 
                      color={item.completed ? "#059669" : item.color} 
                    />
                    {item.priority === 'high' && !item.completed && (
                      <View style={styles.priorityDot}>
                        <MaterialCommunityIcons name="circle" size={8} color="#DC2626" />
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.details}>
                    <View style={styles.titleRow}>
                      <Text style={[styles.titleText, item.completed && styles.completedText]}>
                        {item.title}
                      </Text>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                    <Text style={[styles.desc, item.completed && styles.completedText]}>
                      {item.desc}
                    </Text>
                    
                    {item.action && !item.completed && (
                      <View style={styles.actionContainer}>
                        <Button 
                          mode="contained" 
                          compact 
                          buttonColor={item.color}
                          style={styles.actionButton}
                          labelStyle={styles.actionButtonText}
                          onPress={() => handleActionPress(item)}
                        >
                          {item.action}
                        </Button>
                      </View>
                    )}

                    {item.completed && (
                      <View style={styles.completedContainer}>
                        <MaterialCommunityIcons name="check" size={14} color="#059669" />
                        <Text style={styles.completedLabel}>Completed</Text>
                      </View>
                    )}
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.moreButton}
                    onPress={() => handleLongPress(item)}
                  >
                    <MaterialCommunityIcons name="chevron-right" size={20} color="#94A3B8" />
                  </TouchableOpacity>
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
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  completedCard: {
    opacity: 0.7,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconWrap: {
    borderRadius: 12,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  priorityDot: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
  details: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  time: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  desc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 8,
  },
  actionContainer: {
    marginTop: 4,
  },
  actionButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  completedLabel: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  moreButton: {
    padding: 4,
  },
});

export default RecentActivityList;