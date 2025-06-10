// src/navigation/manager/stacks/ScheduleStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScheduleRequestScreen from '../../../features/manager/screens/ScheduleRequestScreen';

const Stack = createNativeStackNavigator();

const ScheduleStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Schedule" component={ScheduleRequestScreen} />
  </Stack.Navigator>
);

export default ScheduleStack;