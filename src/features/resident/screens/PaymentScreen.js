import React, { useState } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import { Text, Checkbox, Button, Card, Divider } from 'react-native-paper';

const mockBills = [
  {
    id: 'bill-1',
    title: 'Electricity - May',
    type: 'Electricity',
    amount: 350000,
  },
  {
    id: 'bill-2',
    title: 'Water - May',
    type: 'Water',
    amount: 120000,
  },
  {
    id: 'bill-3',
    title: 'Service Fee - Q2',
    type: 'Service',
    amount: 500000,
  },
];

const PaymentScreen = () => {
  const [selectedBills, setSelectedBills] = useState([]);

  const toggleBill = (billId) => {
    setSelectedBills((prev) =>
      prev.includes(billId)
        ? prev.filter((id) => id !== billId)
        : [...prev, billId]
    );
  };

  const getTotal = () => {
    return mockBills
      .filter((bill) => selectedBills.includes(bill.id))
      .reduce((sum, bill) => sum + bill.amount, 0);
  };

  const handlePay = () => {
    if (selectedBills.length === 0) {
      Alert.alert('No Bills Selected', 'Please select at least one bill to pay.');
      return;
    }

    // Thực tế: gọi API thanh toán ở đây
    Alert.alert(
      'Confirm Payment',
      `You are about to pay ${getTotal().toLocaleString()} VND for ${selectedBills.length} bill(s).`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Pay Now',
          onPress: () => {
            Alert.alert('Success', 'Payment completed!');
            setSelectedBills([]); // reset
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    const checked = selectedBills.includes(item.id);
    return (
      <Card style={styles.billCard} mode="outlined">
        <Card.Content style={styles.billContent}>
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium">{item.title}</Text>
            <Text variant="bodySmall" style={{ color: '#64748B' }}>
              {item.type}
            </Text>
          </View>
          <View style={styles.billRight}>
            <Text style={styles.amount}>{item.amount.toLocaleString()} đ</Text>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => toggleBill(item.id)}
            />
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Pay Your Bills
      </Text>
      <Divider style={{ marginVertical: 12 }} />
      <FlatList
        data={mockBills}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: {getTotal().toLocaleString()} đ</Text>
        <Button
          mode="contained"
          onPress={handlePay}
          disabled={selectedBills.length === 0}
          style={styles.payButton}
        >
          Pay Now
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  title: {
    marginBottom: 8,
    fontWeight: '600',
  },
  billCard: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  billContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  billRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 4,
  },
  amount: {
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  footer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  payButton: {
    borderRadius: 8,
  },
});

export default PaymentScreen;
