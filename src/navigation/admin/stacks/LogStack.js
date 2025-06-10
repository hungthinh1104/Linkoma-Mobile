// src/navigation/admin/stacks/LogStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BackupScreen from '../../../features/admin/screens/BackupScreen';
import SettingScreen from '../../../features/admin/screens/SettingScreen';

const Stack = createNativeStackNavigator();

const LogStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Backup" component={BackupScreen} />
    <Stack.Screen name="Settings" component={SettingScreen} />
  </Stack.Navigator>
);

export default LogStack;
