import { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Card, Text } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const PaymentReminders = memo(({ onBillPress }) => {
  const urgentBills = [
    {
      id: 1,
      amount: 1445.5,
      status: "Pending",
      dueDate: "2024-01-31",
      month: "January 2024",
      daysLeft: 3,
      isOverdue: false,
    },
    {
      id: 5,
      amount: 1398.75,
      status: "Overdue",
      dueDate: "2023-12-31",
      month: "December 2023",
      daysLeft: -5,
      isOverdue: true,
    },
  ]

  const ReminderItem = ({ bill }) => (
    <TouchableOpacity
      style={[styles.reminderItem, bill.isOverdue && styles.overdueItem]}
      onPress={() => onBillPress(bill)}
      activeOpacity={0.7}
    >
      <View style={styles.reminderLeft}>
        <View style={[styles.reminderIcon, bill.isOverdue && styles.overdueIcon]}>
          <MaterialCommunityIcons
            name={bill.isOverdue ? "alert" : "clock-outline"}
            size={20}
            color={bill.isOverdue ? "#DC2626" : "#D97706"}
          />
        </View>
        <View style={styles.reminderInfo}>
          <Text style={styles.reminderMonth}>{bill.month}</Text>
          <Text style={styles.reminderAmount}>${bill.amount.toFixed(2)}</Text>
          <Text style={[styles.reminderDays, bill.isOverdue && styles.overdueDays]}>
            {bill.isOverdue ? `${Math.abs(bill.daysLeft)} days overdue` : `${bill.daysLeft} days left`}
          </Text>
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color="#64748B" />
    </TouchableOpacity>
  )

  if (urgentBills.length === 0) return null

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Payment Reminders</Text>
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <MaterialCommunityIcons name="bell-alert" size={24} color="#D97706" />
            <Text style={styles.title}>Urgent Payments</Text>
          </View>

          {urgentBills.map((bill) => (
            <ReminderItem key={bill.id} bill={bill} />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
  },
  reminderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 8,
    marginVertical: 4,
  },
  overdueItem: {
    backgroundColor: "#FEF2F2",
  },
  reminderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  reminderIcon: {
    backgroundColor: "#FEF3C7",
    borderRadius: 10,
    padding: 8,
  },
  overdueIcon: {
    backgroundColor: "#FEE2E2",
  },
  reminderInfo: {
    flex: 1,
  },
  reminderMonth: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 2,
  },
  reminderAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 2,
  },
  reminderDays: {
    fontSize: 13,
    color: "#D97706",
    fontWeight: "500",
  },
  overdueDays: {
    color: "#DC2626",
  },
})

export default PaymentReminders
