// src/navigation/admin/stacks/DashboardStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../../features/admin/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="DashboardHome" component={HomeScreen} />
  </Stack.Navigator>
);

export default DashboardStack;