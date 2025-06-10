// src/navigation/manager/stacks/ContractStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContractDetailScreen from '../../../features/manager/screens/ContractDetailScreen';
import ContractListScreen from '../../../features/manager/screens/ContractListScreen';

const Stack = createNativeStackNavigator();

const ContractStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ContractDetail" component={ContractDetailScreen} />
    <Stack.Screen name="ContractList" component={ContractListScreen} />
  </Stack.Navigator>
);

export default ContractStack;