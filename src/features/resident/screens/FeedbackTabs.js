// src/features/resident/screens/FeedbackTabs.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedbackScreen from './FeedbackScreen';
import FeedbackHistoryScreen from './FeedbackHistoryScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const FeedbackTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#2563EB' },
        tabBarStyle: { marginTop: insets.top },
      }}
    >
      <Tab.Screen name="New Feedback" component={FeedbackScreen} />
      <Tab.Screen name="History" component={FeedbackHistoryScreen} />
    </Tab.Navigator>
  );
};

export default FeedbackTabs;
