"use client"

import { useState, useEffect } from "react"
import { ScrollView, View, StyleSheet, StatusBar, RefreshControl, Alert } from "react-native"
import { Text, IconButton } from "react-native-paper"
import { useNavigation, useRoute } from "@react-navigation/native"

// Import components
import BillHeader from "../components/bills/BillHeader"
import BillBreakdown from "../components/bills/BillBreakdown"
import PaymentActions from "../components/bills/PaymentActions"

const BillDetailScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { billData } = route.params

  const [refreshing, setRefreshing] = useState(false)
  const [currentBill, setCurrentBill] = useState(billData)

  const loadBillDetails = async (invoiceId) => {
    return {
      ...billData,
      invoiceNumber: `INV-2024-${invoiceId.toString().padStart(6, "0")}`,
      apartmentInfo: {
        number: "301",
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
    }
  }

  useEffect(() => {
    if (billData?.InvoiceID) {
      loadBillDetails(billData.InvoiceID).then(setCurrentBill)
    }
  }, [billData])

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      const updatedBill = await loadBillDetails(currentBill.InvoiceID)
      setCurrentBill(updatedBill)
    } catch (error) {
      Alert.alert("Error", "Failed to refresh bill details")
    } finally {
      setRefreshing(false)
    }
  }

  const handlePayNow = () => {
    Alert.alert("Payment", `Proceed to pay $${currentBill.Total?.toFixed(2)}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Pay Now",
        onPress: () => {
          Alert.alert("Success", "Payment processed successfully!")
          navigation.goBack()
        },
      },
    ])
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Bill Details</Text>
        <IconButton icon="share-variant" size={24} onPress={() => Alert.alert("Share", "Bill shared successfully")} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <BillHeader billData={currentBill} />
        <BillBreakdown billData={currentBill} />
        <PaymentActions billData={currentBill} onPayNow={handlePayNow} />
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: StatusBar.currentHeight + 8,
    paddingBottom: 12,
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
})

export default BillDetailScreen
