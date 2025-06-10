// src/navigation/admin/stacks/AccountStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from '../../../features/admin/screens/UserScreen';

const Stack = createNativeStackNavigator();

const AccountStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Accounts" component={UserScreen} />
  </Stack.Navigator>
);

export default AccountStack;
