import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AlertItem = memo(({ item, onPayNow }) => (
  <Card style={styles.alertCard} mode="elevated">
    <Card.Content style={styles.alertContent}>
      <View style={styles.alertHeader}>
        <View style={styles.alertIcon}>
          <MaterialCommunityIcons name="alert-circle" size={20} color="#EF4444" />
        </View>
        <View style={styles.alertDetails}>
          <Text style={styles.alertTitle}>{item.type}</Text>
          <Text style={styles.alertAmount}>Amount: ${item.amount.toFixed(2)}</Text>
          <Text style={styles.alertDue}>{item.dueDate}</Text>
        </View>
        <Button
          mode="contained"
          compact
          buttonColor="#2563EB"
          style={styles.payButton}
          labelStyle={styles.payButtonLabel}
          onPress={() => onPayNow(item)}
        >
          Pay Now
        </Button>
      </View>
    </Card.Content>
  </Card>
));

const PaymentAlerts = memo(({ alerts }) => {
  const navigation = useNavigation();

  const handlePayNow = (alert) => {
    navigation.navigate('PaymentFlow', {
      billId: alert.id,
      amount: alert.amount,
      type: alert.type,
    });
  };

  const renderAlert = ({ item }) => (
    <AlertItem item={item} onPayNow={handlePayNow} />
  );

  if (!alerts || alerts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Payment Alerts</Text>
      <FlatList
        data={alerts}
        renderItem={renderAlert}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  alertCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  alertContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIcon: {
    backgroundColor: '#FECACA',
    borderRadius: 8,
    padding: 6,
    marginRight: 12,
  },
  alertDetails: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#991B1B',
    marginBottom: 2,
  },
  alertAmount: {
    fontSize: 13,
    color: '#7F1D1D',
    marginBottom: 2,
  },
  alertDue: {
    fontSize: 12,
    color: '#B91C1C',
    fontWeight: '500',
  },
  payButton: {
    borderRadius: 8,
  },
  payButtonLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  separator: {
    height: 8,
  },
});

export default PaymentAlerts;   