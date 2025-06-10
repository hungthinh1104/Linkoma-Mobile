// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import ResidentTabs from './resident/tabs/ResidentTabs';
import ManagerTabs from './manager/tabs/ManagerTabs';
import AdminTabs from './admin/tabs/AdminTabs';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ResidentTabs" component={ResidentTabs} />
      <Stack.Screen name="ManagerTabs" component={ManagerTabs} />
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
