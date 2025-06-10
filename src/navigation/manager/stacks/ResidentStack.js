// src/navigation/manager/stacks/ResidentStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResidentScreen from '../../../features/manager/screens/ResidentScreen';
import ResidentDetailScreen from '../../../features/manager/screens/ResidentDetailScreen';

const Stack = createNativeStackNavigator();

const ResidentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Residents" component={ResidentScreen} />
    <Stack.Screen name="ResidentDetail" component={ResidentDetailScreen} />
  </Stack.Navigator>
);

export default ResidentStack;