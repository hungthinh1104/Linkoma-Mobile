// src/navigation/resident/tabs/ResidentTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ResidentStack from '../stacks/ResidentStack';
import ChatScreen from '../../../features/resident/screens/ChatScreen';
import {
  FeedbackStack,
  BillStack,
  ProfileStack,
} from '../stacks';

const Tab = createBottomTabNavigator();

const ResidentTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: { fontSize: 12, paddingBottom: 4 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ResidentStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat-processing-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Feedback"
        component={FeedbackStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-text-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Bills"
        component={BillStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ResidentTabs;