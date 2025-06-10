// src/navigation/resident/stacks/BillStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BillDetailScreen from '../../../features/resident/screens/BillDetailScreen';
import BillScreen from '../../../features/resident/screens/BillScreen';

const Stack = createNativeStackNavigator();

const BillStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BillsMain" component={BillScreen} />
    <Stack.Screen name="BillsDetailMain" component={BillDetailScreen} />
  </Stack.Navigator>
);

export default BillStack;
