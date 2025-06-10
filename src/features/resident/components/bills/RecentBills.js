import { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Card, Text } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const getStatusStyle = (status) => {
  switch (status) {
    case "Paid":
      return { color: "#059669", bg: "#ECFDF5" }
    case "Pending":
      return { color: "#D97706", bg: "#FEF3C7" }
    case "Overdue":
      return { color: "#DC2626", bg: "#FEF2F2" }
    default:
      return { color: "#64748B", bg: "#F1F5F9" }
  }
}

const RecentBills = memo(({ onBillPress }) => {
  const recentBills = [
    {
      id: 1,
      amount: 1445.5,
      status: "Pending",
      dueDate: "2024-01-31",
      month: "January 2024",
      rentFee: 1200.0,
      serviceFee: 245.5,
      issueDate: "2024-01-01",
    },
    {
      id: 2,
      amount: 1398.75,
      status: "Paid",
      dueDate: "2023-12-31",
      month: "December 2023",
      rentFee: 1200.0,
      serviceFee: 198.75,
      issueDate: "2023-12-01",
      paidDate: "2023-12-28",
    },
    {
      id: 3,
      amount: 1425.0,
      status: "Paid",
      dueDate: "2023-11-30",
      month: "November 2023",
      rentFee: 1200.0,
      serviceFee: 225.0,
      issueDate: "2023-11-01",
      paidDate: "2023-11-25",
    },
  ]

  const BillItem = ({ bill }) => {
    const statusStyle = getStatusStyle(bill.status)

    return (
      <TouchableOpacity style={styles.billItem} onPress={() => onBillPress(bill)} activeOpacity={0.7}>
        <View style={styles.billLeft}>
          <View style={styles.billInfo}>
            <Text style={styles.billMonth}>{bill.month}</Text>
            <Text style={styles.billAmount}>${bill.amount.toFixed(2)}</Text>
            <Text style={styles.billDue}>Due: {new Date(bill.dueDate).toLocaleDateString()}</Text>
          </View>
        </View>
        <View style={styles.billRight}>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>{bill.status}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#64748B" />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recent Bills</Text>
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.content}>
          {recentBills.map((bill) => (
            <BillItem key={bill.id} bill={bill} />
          ))}
        </Card.Content>
      </Card>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
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
  billItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  billLeft: {
    flex: 1,
  },
  billInfo: {
    flex: 1,
  },
  billMonth: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  billAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 4,
  },
  billDue: {
    fontSize: 13,
    color: "#64748B",
  },
  billRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
})

export default RecentBills
