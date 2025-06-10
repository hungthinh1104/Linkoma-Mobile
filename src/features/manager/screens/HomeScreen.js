"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions, RefreshControl } from "react-native"
import { Text } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import ExecutiveSummary from "../components/home/ExecutiveSummary"
import PropertyPerformance from "../components/home/PropertyPerformance"
import QuickActions from "../components/home/QuickActions"
import OnboardingProgress from "../components/home/OnboardingProgress"
import MaintenanceAlerts from "../components/home/MaintenanceAlerts"
import FinancialOverview from "../components/home/FinancialOverview"
import RecentActivity from "../components/home/RecentActivity"

const { width } = Dimensions.get("window")

const HomeScreen = () => {
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    executiveSummary: {
      activeResidents: { value: 725, change: 12, period: "3mo" },
      occupancyRate: { value: 92, change: 0.8, period: "MoM" },
      netOperatingIncome: { value: 1200000, change: -2.1, period: "YoY" },
      openWorkOrders: { value: 45, change: 15, period: "1w" },
    },
    onboardingProgress: {
      completed: 720,
      total: 1000,
      percentage: 72,
    },
    maintenanceAlerts: [
      {
        id: 1,
        type: "critical",
        title: "HVAC Unit Malfunction",
        location: "Unit 301, North Tower • 30 min ago",
        icon: "air-conditioner",
      },
      {
        id: 2,
        type: "warning",
        title: "Water Leak Detected",
        location: "Basement Storage Area • 2 hours ago",
        icon: "water-alert",
      },
      {
        id: 3,
        type: "info",
        title: "Generator Maintenance Due",
        location: "Main Power Room • Tomorrow",
        icon: "engine",
      },
    ],
    financialData: {
      totalRevenue: 1250500,
      revenue: 145000,
      expenses: 48000,
      breakdown: {
        rentIncome: 120000,
        maintenanceCosts: 18000,
        utilities: 25000,
        otherExpenses: 5000,
      },
    },
    recentActivity: [
      {
        id: 1,
        type: "work_order",
        title: "Work Order #451 Completed by John Doe",
        time: "5 min ago",
        icon: "wrench",
        color: "#10B981",
      },
      {
        id: 2,
        type: "resident",
        title: "New Resident Onboarding: Sarah Johnson (Unit 503)",
        time: "2 hours ago",
        icon: "account-plus",
        color: "#3B82F6",
      },
      {
        id: 3,
        type: "payment",
        title: "Rent Payment Received: Unit 201 ($1,500)",
        time: "1 day ago",
        icon: "cash",
        color: "#059669",
      },
      {
        id: 4,
        type: "emergency",
        title: "Emergency Power Outage Reported in West Wing",
        time: "3 hours ago",
        icon: "lightning-bolt",
        color: "#EF4444",
      },
    ],
  })

  const onRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const handleQuickAction = (action) => {
    switch (action) {
      case "create_work_order":
        navigation.navigate("CreateWorkOrder")
        break
      case "new_resident":
        navigation.navigate("AddResident")
        break
      case "view_reports":
        navigation.navigate("Reports")
        break
      default:
        break
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#1E293B" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>5</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileText}>👨‍💼</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Executive Summary */}
        <ExecutiveSummary data={dashboardData.executiveSummary} />

        {/* Property Performance */}
        <PropertyPerformance />

        {/* Quick Actions */}
        <QuickActions onActionPress={handleQuickAction} />

        {/* Onboarding Progress */}
        <OnboardingProgress data={dashboardData.onboardingProgress} />

        {/* Maintenance Alerts */}
        <MaintenanceAlerts alerts={dashboardData.maintenanceAlerts} />

        {/* Financial Overview */}
        <FinancialOverview data={dashboardData.financialData} />

        {/* Recent Activity */}
        <RecentActivity activities={dashboardData.recentActivity} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight + 16,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  notificationButton: {
    position: "relative",
    padding: 4,
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#EF4444",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  profileButton: {
    padding: 4,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
})

export default HomeScreen
