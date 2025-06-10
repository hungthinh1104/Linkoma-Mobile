import { memo } from "react"
import { View, StyleSheet } from "react-native"
import { Card, Text } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const getStatusStyle = (status) => {
  switch (status) {
    case "Paid":
      return { bg: "#ECFDF5", text: "#059669", icon: "check-circle" }
    case "Pending":
      return { bg: "#FEF3C7", text: "#D97706", icon: "clock-outline" }
    case "Overdue":
      return { bg: "#FEF2F2", text: "#DC2626", icon: "alert-circle" }
    default:
      return { bg: "#F1F5F9", text: "#64748B", icon: "help-circle" }
  }
}

const BillHeader = memo(({ billData }) => {
  const statusStyle = getStatusStyle(billData.Status)
  const isOverdue = new Date(billData.DueDate) < new Date() && billData.Status !== "Paid"

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <View style={styles.invoiceRow}>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceNumber}>#{billData.invoiceNumber}</Text>
            <Text style={styles.apartmentText}>
              Apartment {billData.apartmentInfo?.number} - {billData.apartmentInfo?.building}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <MaterialCommunityIcons name={statusStyle.icon} size={16} color={statusStyle.text} />
            <Text style={[styles.statusText, { color: statusStyle.text }]}>{billData.Status}</Text>
          </View>
        </View>

        <View style={styles.amountSection}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>${billData.Total?.toFixed(2)}</Text>
        </View>

        <View style={styles.dateRow}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Issue Date</Text>
            <Text style={styles.dateValue}>{new Date(billData.issueDate).toLocaleDateString()}</Text>
          </View>
          <View style={styles.dateItem}>
            <Text style={[styles.dateLabel, isOverdue && styles.overdueLabel]}>Due Date</Text>
            <Text style={[styles.dateValue, isOverdue && styles.overdueValue]}>
              {new Date(billData.DueDate).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  )
})

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  invoiceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  apartmentText: {
    fontSize: 14,
    color: "#64748B",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  amountSection: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563EB",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dateItem: {
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },
  overdueLabel: {
    color: "#DC2626",
  },
  overdueValue: {
    color: "#DC2626",
    fontWeight: "600",
  },
})

export default BillHeader
