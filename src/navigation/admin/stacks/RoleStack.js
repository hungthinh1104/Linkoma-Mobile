// src/navigation/admin/stacks/RoleStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoleScreen from '../../../features/admin/screens/RoleScreen';

const Stack = createNativeStackNavigator();

const RoleStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Roles" component={RoleScreen} />
  </Stack.Navigator>
);

export default RoleStack;