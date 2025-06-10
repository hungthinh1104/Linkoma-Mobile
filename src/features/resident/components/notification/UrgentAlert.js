import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UrgentAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleRenewNow = () => {
    Alert.alert(
      'Renew Subscription',
      'You will be redirected to the renewal page.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => console.log('Navigate to renewal') }
      ]
    );
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="alert-circle" size={20} color="#2563EB" />
        <Text style={styles.title}>Urgent Service Alert!</Text>
        <TouchableOpacity onPress={handleDismiss} accessibilityLabel="Dismiss urgent alert">
          <MaterialCommunityIcons name="close" size={16} color="#64748B" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.illustration}>
          <MaterialCommunityIcons name="cellphone" size={48} color="#2563EB" />
          <MaterialCommunityIcons name="alert" size={16} color="#DC2626" style={styles.alertIcon} />
        </View>
        
        <Text style={styles.description}>
          Your subscription to Premium AI features will expire in 3 days. Renew now to avoid interruption.
        </Text>
        
        <Button
          mode="contained"
          buttonColor="#2563EB"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={handleRenewNow}
          accessibilityLabel="Renew subscription now"
        >
          Renew Now
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
  },
  content: {
    alignItems: 'center',
    gap: 12,
  },
  illustration: {
    position: 'relative',
    marginVertical: 8,
  },
  alertIcon: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  description: {
    fontSize: 14,
    color: '#1E40AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontWeight: '600',
  },
});

export default UrgentAlert;