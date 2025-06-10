"use client"

import { memo, useState } from "react"
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { Card, Text, Button } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const getStatusBadgeStyle = (status) => {
  switch (status) {
    case "Paid":
      return { backgroundColor: "#ECFDF5" }
    case "Pending":
      return { backgroundColor: "#FEF3C7" }
    case "Overdue":
      return { backgroundColor: "#FEF2F2" }
    default:
      return { backgroundColor: "#F1F5F9" }
  }
}

const getStatusTextStyle = (status) => {
  switch (status) {
    case "Paid":
      return { color: "#059669" }
    case "Pending":
      return { color: "#D97706" }
    case "Overdue":
      return { color: "#DC2626" }
    default:
      return { color: "#64748B" }
  }
}

const BillHistory = memo(({ onBillPress }) => {
  const [showAll, setShowAll] = useState(false)

  const allBillHistory = [
    {
      id: 2,
      amount: 1398.75,
      status: "Paid",
      dueDate: "2023-12-31",
      month: "December 2023",
      paidDate: "2023-12-28",
      rentFee: 1200.0,
      serviceFee: 198.75,
    },
    {
      id: 3,
      amount: 1425.0,
      status: "Paid",
      dueDate: "2023-11-30",
      month: "November 2023",
      paidDate: "2023-11-25",
      rentFee: 1200.0,
      serviceFee: 225.0,
    },
    {
      id: 4,
      amount: 1380.5,
      status: "Paid",
      dueDate: "2023-10-31",
      month: "October 2023",
      paidDate: "2023-10-28",
      rentFee: 1200.0,
      serviceFee: 180.5,
    },
    {
      id: 5,
      amount: 1456.25,
      status: "Paid",
      dueDate: "2023-09-30",
      month: "September 2023",
      paidDate: "2023-09-27",
      rentFee: 1200.0,
      serviceFee: 256.25,
    },
    {
      id: 6,
      amount: 1412.0,
      status: "Paid",
      dueDate: "2023-08-31",
      month: "August 2023",
      paidDate: "2023-08-29",
      rentFee: 1200.0,
      serviceFee: 212.0,
    },
  ]

  const displayedBills = showAll ? allBillHistory : allBillHistory.slice(0, 3)

  const HistoryItem = ({ item }) => (
    <TouchableOpacity style={styles.historyItem} onPress={() => onBillPress(item)} activeOpacity={0.7}>
      <View style={styles.historyLeft}>
        <View style={styles.historyInfo}>
          <Text style={styles.historyMonth}>{item.month}</Text>
          <Text style={styles.historyAmount}>${item.amount.toFixed(2)}</Text>
          {item.paidDate && <Text style={styles.paidDate}>Paid: {new Date(item.paidDate).toLocaleDateString()}</Text>}
        </View>
      </View>
      <View style={styles.historyRight}>
        <View style={[styles.statusBadge, getStatusBadgeStyle(item.status)]}>
          <Text style={[styles.statusText, getStatusTextStyle(item.status)]}>{item.status}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={16} color="#64748B" />
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Payment History</Text>
        <Text style={styles.totalCount}>{allBillHistory.length} payments</Text>
      </View>

      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.content}>
          <FlatList
            data={displayedBills}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HistoryItem item={item} />}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />

          {!showAll && allBillHistory.length > 3 && (
            <Button
              mode="text"
              onPress={() => setShowAll(true)}
              style={styles.showMoreButton}
              labelStyle={styles.showMoreLabel}
            >
              Show {allBillHistory.length - 3} more payments
            </Button>
          )}

          {showAll && (
            <Button
              mode="text"
              onPress={() => setShowAll(false)}
              style={styles.showMoreButton}
              labelStyle={styles.showMoreLabel}
            >
              Show less
            </Button>
          )}
        </Card.Content>
      </Card>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
  },
  totalCount: {
    fontSize: 14,
    color: "#64748B",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  historyLeft: {
    flex: 1,
  },
  historyInfo: {
    flex: 1,
  },
  historyMonth: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
  },
  historyAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 4,
  },
  paidDate: {
    fontSize: 12,
    color: "#059669",
    fontWeight: "500",
  },
  historyRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 8,
  },
  showMoreButton: {
    marginTop: 8,
  },
  showMoreLabel: {
    color: "#2563EB",
    fontWeight: "500",
  },
})

export default BillHistory
