// src/navigation/resident/stacks/FeedbackStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedbackTabs from '../../../features/resident/screens/FeedbackTabs';

const Stack = createNativeStackNavigator();

const FeedbackStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FeedbackMain" component={FeedbackTabs} />
  </Stack.Navigator>
);

export default FeedbackStack;