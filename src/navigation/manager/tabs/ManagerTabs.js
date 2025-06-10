// src/navigation/manager/tabs/ManagerTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  DashboardStack,
  ResidentStack,
  FeedbackStack,
  ContractStack,
  ReportStack,
  ScheduleStack,
  VisitorStack,
  NotificationStack,
} from '../stacks';

const Tab = createBottomTabNavigator();

const ManagerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { height: 64 },
        tabBarLabelStyle: { fontSize: 12, paddingBottom: 6 },
      }}
    >
      {/* Bạn có thể thêm tab mới như `Schedule`, `Visitor`, `Notifications` sau dòng này để hoàn chỉnh tính năng quản lý. */}
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Residents"
        component={ResidentStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Feedback"
        component={FeedbackStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-alert-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Contracts"
        component={ContractStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-check" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Visitors"
        component={VisitorStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-arrow-right" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ManagerTabs;
