// src/navigation/manager/stacks/ReportStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReportScreen from '../../../features/manager/screens/ReportScreen';
import ReportDetailScreen from '../../../features/manager/screens/ReportDetailScreen';

const Stack = createNativeStackNavigator();

const ReportStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Reports" component={ReportScreen} />
    <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />
  </Stack.Navigator>
);

export default ReportStack;