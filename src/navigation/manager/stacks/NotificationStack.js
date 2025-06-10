// src/navigation/manager/stacks/NotificationStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from '../../../features/manager/screens/NotificationScreen';

const Stack = createNativeStackNavigator();

const NotificationStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Notifications" component={NotificationScreen} />
  </Stack.Navigator>
);

export default NotificationStack;
