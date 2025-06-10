"use client"

import { useState } from "react"
import { ScrollView, View, StyleSheet, StatusBar, RefreshControl } from "react-native"
import { Text, Searchbar } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"

// Import components
import QuickStats from "../components/bills/QuickStats"
import RecentBills from "../components/bills/RecentBills"
import BillHistory from "../components/bills/BillHistory"
import PaymentReminders from "../components/bills/PaymentReminders"

const BillScreen = () => {
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  // Navigation handler for bill details
  const handleBillPress = (billItem) => {
    navigation.navigate("BillsDetailMain", {
      billData: {
        InvoiceID: billItem.id,
        Total: billItem.amount,
        Status: billItem.status,
        DueDate: billItem.dueDate,
        RentFee: billItem.rentFee || billItem.amount * 0.8,
        ServiceFee: billItem.serviceFee || billItem.amount * 0.2,
        issueDate: billItem.issueDate || new Date().toISOString(),
        invoiceNumber: `INV-2024-${billItem.id.toString().padStart(6, "0")}`,
        apartmentInfo: {
          number: billItem.apartmentNumber || "301",
          building: "Tower A",
          floor: "3rd Floor",
        },
        serviceBreakdown: [
          { name: "Water & Sewage", amount: 45.5 },
          { name: "Electricity", amount: 85.0 },
          { name: "Internet & Cable", amount: 75.0 },
          { name: "Maintenance Fee", amount: 25.0 },
          { name: "Parking Fee", amount: 15.0 },
        ],
      },
    })
  }

  const onRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bills & Payments</Text>
        <Text style={styles.headerSubtitle}>Manage your apartment bills</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search bills..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
        />
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <QuickStats />
        <PaymentReminders onBillPress={handleBillPress} />
        <RecentBills onBillPress={handleBillPress} />
        <BillHistory onBillPress={handleBillPress} />
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
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight + 20,
    paddingBottom: 16,
    backgroundColor: "#F8FAFC",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#64748B",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
    borderRadius: 12,
  },
  searchInput: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
})

export default BillScreen
