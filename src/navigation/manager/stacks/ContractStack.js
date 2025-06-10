// src/navigation/manager/stacks/ContractStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContractScreen from '../../../features/manager/screens/ContractScreen';
import ContractListScreen from '../../../features/manager/screens/ContractListScreen';

const Stack = createNativeStackNavigator();

const ContractStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Contracts" component={ContractScreen} />
    <Stack.Screen name="ContractList" component={ContractListScreen} />
  </Stack.Navigator>
);

export default ContractStack;