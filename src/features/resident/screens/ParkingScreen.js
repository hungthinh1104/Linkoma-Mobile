"use client"

import { useState, useEffect } from "react"
import { ScrollView, View, StyleSheet, StatusBar, TouchableOpacity, Alert, Dimensions } from "react-native"
import { Text, Button, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const { width } = Dimensions.get("window")

const ParkingScreen = () => {
  const [timeRemaining, setTimeRemaining] = useState(5025) // 01:23:45 in seconds
  const [isParked, setIsParked] = useState(true)

  // Timer countdown
  useEffect(() => {
    if (isParked && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isParked, timeRemaining])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleExtendTime = () => {
    Alert.alert("Extend Parking", "How long would you like to extend?", [
      { text: "30 minutes (+$1.25)", onPress: () => setTimeRemaining((prev) => prev + 1800) },
      { text: "1 hour (+$2.50)", onPress: () => setTimeRemaining((prev) => prev + 3600) },
      { text: "2 hours (+$5.00)", onPress: () => setTimeRemaining((prev) => prev + 7200) },
      { text: "Cancel", style: "cancel" },
    ])
  }

  const handleParkHere = () => {
    setIsParked(true)
    setTimeRemaining(3600)
    Alert.alert("Success", "Parking session started!")
  }

  const handleEndSession = () => {
    Alert.alert("End Session", "Are you sure you want to end your parking session?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "End Session",
        style: "destructive",
        onPress: () => {
          setIsParked(false)
          setTimeRemaining(0)
          Alert.alert("Session Ended", "Your parking session has been ended.")
        },
      },
    ])
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />

      {/* Header with Gradient */}
      <LinearGradient colors={["#1E40AF", "#3B82F6"]} style={styles.headerGradient}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Smart Parking</Text>
              <Text style={styles.headerSubtitle}>Downtown Area</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileAvatar}>
              <MaterialCommunityIcons name="account" size={20} color="#1E40AF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Active Session Timer */}
        {isParked && (
          <View style={styles.activeSession}>
            <View style={styles.sessionCard}>
              <View style={styles.sessionLeft}>
                <View style={styles.sessionIcon}>
                  <MaterialCommunityIcons name="car" size={24} color="#10B981" />
                </View>
                <View>
                  <Text style={styles.sessionTitle}>Active Session</Text>
                  <Text style={styles.sessionTime}>{formatTime(timeRemaining)} remaining</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.extendButton} onPress={handleExtendTime}>
                <MaterialCommunityIcons name="plus" size={16} color="#FFFFFF" />
                <Text style={styles.extendText}>Extend</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Map Preview */}
        <View style={styles.mapSection}>
          <View style={styles.mapContainer}>
            <View style={styles.mapBackground}>
              <View style={styles.parkingMarker}>
                <MaterialCommunityIcons name="parking" size={28} color="#FFFFFF" />
              </View>
              <View style={styles.mapOverlay}>
                <TouchableOpacity style={styles.fullMapButton}>
                  <MaterialCommunityIcons name="fullscreen" size={16} color="#FFFFFF" />
                  <Text style={styles.fullMapText}>View Full Map</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Parking Slot Details */}
        <View style={styles.contentSection}>
          <Card style={styles.slotCard} mode="elevated">
            <Card.Content style={styles.slotContent}>
              {/* Slot Header */}
              <View style={styles.slotHeader}>
                <View style={styles.slotInfo}>
                  <Text style={styles.slotNumber}>Slot A12</Text>
                  <View style={styles.slotLocation}>
                    <MaterialCommunityIcons name="map-marker" size={14} color="#64748B" />
                    <Text style={styles.locationText}>123 Main St, Downtown</Text>
                  </View>
                </View>
                <View style={styles.slotStatus}>
                  <View style={[styles.statusDot, { backgroundColor: isParked ? "#EF4444" : "#10B981" }]} />
                  <Text style={[styles.statusText, { color: isParked ? "#EF4444" : "#10B981" }]}>
                    {isParked ? "Occupied" : "Available"}
                  </Text>
                </View>
              </View>

              {/* Price & Distance */}
              <View style={styles.priceSection}>
                <View style={styles.priceItem}>
                  <Text style={styles.priceLabel}>Rate</Text>
                  <Text style={styles.priceValue}>$2.50/hr</Text>
                </View>
                <View style={styles.dividerVertical} />
                <View style={styles.priceItem}>
                  <Text style={styles.priceLabel}>Distance</Text>
                  <Text style={styles.priceValue}>0.3 km</Text>
                </View>
                <View style={styles.dividerVertical} />
                <View style={styles.priceItem}>
                  <Text style={styles.priceLabel}>Walk</Text>
                  <Text style={styles.priceValue}>5 min</Text>
                </View>
              </View>

              {/* Features */}
              <View style={styles.featuresSection}>
                <Text style={styles.featuresTitle}>Available Features</Text>
                <View style={styles.featuresList}>
                  <View style={styles.featureChip}>
                    <MaterialCommunityIcons name="ev-station" size={16} color="#F59E0B" />
                    <Text style={styles.featureText}>EV Charging</Text>
                  </View>
                  <View style={styles.featureChip}>
                    <MaterialCommunityIcons name="wheelchair-accessibility" size={16} color="#8B5CF6" />
                    <Text style={styles.featureText}>Accessible</Text>
                  </View>
                  <View style={styles.featureChip}>
                    <MaterialCommunityIcons name="weather-partly-cloudy" size={16} color="#06B6D4" />
                    <Text style={styles.featureText}>Covered</Text>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionSection}>
                {!isParked ? (
                  <Button
                    mode="contained"
                    buttonColor="#10B981"
                    style={styles.primaryButton}
                    labelStyle={styles.primaryButtonText}
                    onPress={handleParkHere}
                    icon="car-plus"
                  >
                    Park Here Now
                  </Button>
                ) : (
                  <Button
                    mode="contained"
                    buttonColor="#EF4444"
                    style={styles.primaryButton}
                    labelStyle={styles.primaryButtonText}
                    onPress={handleEndSession}
                    icon="car-off"
                  >
                    End Session
                  </Button>
                )}

                <View style={styles.secondaryActions}>
                  <TouchableOpacity style={styles.secondaryButton}>
                    <MaterialCommunityIcons name="directions" size={20} color="#3B82F6" />
                    <Text style={styles.secondaryButtonText}>Directions</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.secondaryButton}>
                    <MaterialCommunityIcons name="share-variant" size={20} color="#3B82F6" />
                    <Text style={styles.secondaryButtonText}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.secondaryButton}>
                    <MaterialCommunityIcons name="bookmark-outline" size={20} color="#3B82F6" />
                    <Text style={styles.secondaryButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <MaterialCommunityIcons name="history" size={24} color="#6366F1" />
              </View>
              <Text style={styles.quickActionText}>Parking History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <MaterialCommunityIcons name="wallet" size={24} color="#EC4899" />
              </View>
              <Text style={styles.quickActionText}>Payment Methods</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <MaterialCommunityIcons name="car-cog" size={24} color="#10B981" />
              </View>
              <Text style={styles.quickActionText}>My Vehicles</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerGradient: {
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#BFDBFE",
    marginTop: 2,
  },
  profileButton: {
    padding: 4,
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  activeSession: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sessionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backdropFilter: "blur(10px)",
  },
  sessionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sessionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  sessionTitle: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  sessionTime: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 2,
  },
  extendButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  extendText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  mapSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mapContainer: {
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
  },
  mapBackground: {
    flex: 1,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  parkingMarker: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  mapOverlay: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  fullMapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  fullMapText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  contentSection: {
    padding: 20,
  },
  slotCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    marginBottom: 24,
  },
  slotContent: {
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  slotHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  slotInfo: {
    flex: 1,
  },
  slotNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
  },
  slotLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: "#64748B",
  },
  slotStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  priceSection: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  priceItem: {
    flex: 1,
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },
  dividerVertical: {
    width: 1,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 16,
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  featuresList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  featureChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  featureText: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "500",
  },
  actionSection: {
    gap: 16,
  },
  primaryButton: {
    borderRadius: 16,
    paddingVertical: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  secondaryButton: {
    alignItems: "center",
    gap: 8,
    padding: 12,
  },
  secondaryButtonText: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "500",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  quickActionItem: {
    alignItems: "center",
    gap: 8,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  quickActionText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
    textAlign: "center",
  },
})

export default ParkingScreen
