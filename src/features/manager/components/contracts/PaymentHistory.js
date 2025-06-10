import { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const PaymentHistory = memo(({ payments }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "#10B981"
      case "Late":
        return "#F59E0B"
      case "Pending":
        return "#3B82F6"
      case "Overdue":
        return "#EF4444"
      default:
        return "#64748B"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return "check-circle"
      case "Late":
        return "clock-alert"
      case "Pending":
        return "clock-outline"
      case "Overdue":
        return "alert-circle"
      default:
        return "help-circle"
    }
  }

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentList}>
          {payments.map((payment) => (
            <View key={payment.id} style={styles.paymentItem}>
              <View style={styles.paymentLeft}>
                <View style={[styles.statusIcon, { backgroundColor: `${getStatusColor(payment.status)}15` }]}>
                  <MaterialCommunityIcons
                    name={getStatusIcon(payment.status)}
                    size={20}
                    color={getStatusColor(payment.status)}
                  />
                </View>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentMonth}>{payment.month}</Text>
                  <Text style={styles.paymentDates}>
                    Due: {formatDate(payment.dueDate)}
                    {payment.paidDate && ` • Paid: ${formatDate(payment.paidDate)}`}
                  </Text>
                  <Text style={styles.paymentMethod}>Method: {payment.method}</Text>
                </View>
              </View>

              <View style={styles.paymentRight}>
                <Text style={styles.paymentAmount}>{formatCurrency(payment.amount)}</Text>
                {payment.lateFee && <Text style={styles.lateFee}>+ {formatCurrency(payment.lateFee)} late fee</Text>}
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(payment.status) }]}>
                  <Text style={styles.statusText}>{payment.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Payment Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Payments:</Text>
            <Text style={styles.summaryValue}>{payments.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>On-time Payments:</Text>
            <Text style={styles.summaryValue}>{payments.filter((p) => p.status === "Paid").length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Late Payments:</Text>
            <Text style={styles.summaryValue}>{payments.filter((p) => p.status === "Late").length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Payment Rate:</Text>
            <Text style={[styles.summaryValue, styles.successValue]}>
              {Math.round((payments.filter((p) => p.status === "Paid").length / payments.length) * 100)}%
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
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  viewAllText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
  },
  paymentList: {
    gap: 16,
    marginBottom: 20,
  },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentInfo: {
    flex: 1,
  },
  paymentMonth: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  paymentDates: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 2,
  },
  paymentMethod: {
    fontSize: 12,
    color: "#94A3B8",
  },
  paymentRight: {
    alignItems: "flex-end",
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  lateFee: {
    fontSize: 12,
    color: "#EF4444",
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  summarySection: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#64748B",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  successValue: {
    color: "#10B981",
  },
})

export default PaymentHistory
