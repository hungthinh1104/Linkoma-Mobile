// src/navigation/manager/stacks/DashboardStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../../features/manager/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DashboardHome" component={HomeScreen} />
  </Stack.Navigator>
);

export default DashboardStack;