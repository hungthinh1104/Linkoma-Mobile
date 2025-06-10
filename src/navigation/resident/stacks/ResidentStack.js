// src/navigation/resident/stacks/ResidentStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../../features/resident/screens/HomeScreen';
import MaintenanceDetailsScreen from '../../../features/resident/screens/MaintenanceDetailsScreen';
import PaymentScreen from '../../../features/resident/screens/PaymentScreen';
import NotificationScreen from '../../../features/resident/screens/NotificationScreen';
import ParkingScreen from '../../../features/resident/screens/ParkingScreen';

const Stack = createNativeStackNavigator();

const ResidentStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="MaintenanceDetails" component={MaintenanceDetailsScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="NotificationsMain" component={NotificationScreen} />
      <Stack.Screen name="ParkingMain" component={ParkingScreen} />
    </Stack.Navigator>
  );
};

export default ResidentStack;
