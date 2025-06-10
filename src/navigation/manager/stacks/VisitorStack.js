// src/navigation/manager/stacks/VisitorStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VisitorApprovalScreen from '../../../features/manager/screens/VisitorApprovalScreen';

const Stack = createNativeStackNavigator();

const VisitorStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false}}>
    <Stack.Screen name="Visitors" component={VisitorApprovalScreen} />
  </Stack.Navigator>
);

export default VisitorStack;