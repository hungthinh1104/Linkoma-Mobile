import { memo } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const FinancialInfo = memo(({ contract }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const calculateTotalPaid = () => {
    return contract.paymentHistory
      .filter((payment) => payment.status === "Paid" || payment.status === "Late")
      .reduce((total, payment) => total + payment.amount + (payment.lateFee || 0), 0)
  }

  const calculateOutstanding = () => {
    // Simulate outstanding amount calculation
    return 0 // No outstanding for this example
  }

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <Text style={styles.sectionTitle}>Financial Information</Text>

        {/* Main Financial Metrics */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <MaterialCommunityIcons name="currency-usd" size={24} color="#10B981" />
            <Text style={styles.metricValue}>{formatCurrency(contract.MonthlyRent)}</Text>
            <Text style={styles.metricLabel}>Monthly Rent</Text>
          </View>

          <View style={styles.metricCard}>
            <MaterialCommunityIcons name="shield-check" size={24} color="#3B82F6" />
            <Text style={styles.metricValue}>{formatCurrency(contract.DepositAmount)}</Text>
            <Text style={styles.metricLabel}>Security Deposit</Text>
          </View>

          <View style={styles.metricCard}>
            <MaterialCommunityIcons name="cash-multiple" size={24} color="#059669" />
            <Text style={styles.metricValue}>{formatCurrency(calculateTotalPaid())}</Text>
            <Text style={styles.metricLabel}>Total Paid</Text>
          </View>

          <View style={styles.metricCard}>
            <MaterialCommunityIcons name="alert-circle" size={24} color="#EF4444" />
            <Text style={styles.metricValue}>{formatCurrency(calculateOutstanding())}</Text>
            <Text style={styles.metricLabel}>Outstanding</Text>
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.paymentDetails}>
          <Text style={styles.subsectionTitle}>Payment Details</Text>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <MaterialCommunityIcons name="calendar-month" size={16} color="#64748B" />
              <Text style={styles.detailLabel}>Payment Cycle</Text>
            </View>
            <Text style={styles.detailValue}>{contract.PaymentCycle}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <MaterialCommunityIcons name="calendar-clock" size={16} color="#64748B" />
              <Text style={styles.detailLabel}>Due Date</Text>
            </View>
            <Text style={styles.detailValue}>1st of each month</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <MaterialCommunityIcons name="percent" size={16} color="#64748B" />
              <Text style={styles.detailLabel}>Late Fee</Text>
            </View>
            <Text style={styles.detailValue}>5% after 5 days</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <MaterialCommunityIcons name="bank" size={16} color="#64748B" />
              <Text style={styles.detailLabel}>Payment Method</Text>
            </View>
            <Text style={styles.detailValue}>Bank Transfer</Text>
          </View>
        </View>

        {/* Financial Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.subsectionTitle}>Financial Summary</Text>

          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Contract Value</Text>
              <Text style={styles.summaryValue}>{formatCurrency(contract.MonthlyRent * 12)}</Text>
              <Text style={styles.summaryPeriod}>Annual</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Collected</Text>
              <Text style={styles.summaryValue}>{formatCurrency(calculateTotalPaid())}</Text>
              <Text style={styles.summaryPeriod}>To Date</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Collection Rate</Text>
              <Text style={[styles.summaryValue, styles.successValue]}>100%</Text>
              <Text style={styles.summaryPeriod}>On Time</Text>
            </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginVertical: 8,
    textAlign: "center",
  },
  metricLabel: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
  paymentDetails: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: "#64748B",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },
  summarySection: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 16,
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
    textAlign: "center",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 2,
    textAlign: "center",
  },
  successValue: {
    color: "#10B981",
  },
  summaryPeriod: {
    fontSize: 10,
    color: "#94A3B8",
    textAlign: "center",
  },
})

export default FinancialInfo
