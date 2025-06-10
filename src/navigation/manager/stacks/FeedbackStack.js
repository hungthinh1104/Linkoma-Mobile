// src/navigation/manager/stacks/FeedbackStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedbackScreen from '../../../features/manager/screens/FeedbackScreen';
import FeedbackDetailScreen from '../../../features/manager/screens/FeedbackDetailScreen';

const Stack = createNativeStackNavigator();

const FeedbackStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Feedback" component={FeedbackScreen} />
    <Stack.Screen name="FeedbackDetail" component={FeedbackDetailScreen} />
  </Stack.Navigator>
);

export default FeedbackStack;