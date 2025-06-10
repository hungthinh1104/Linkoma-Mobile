import { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const FinancialOverview = memo(({ data }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const breakdownItems = [
    { label: "Rent Income", amount: data.breakdown.rentIncome, color: "#10B981" },
    { label: "Maintenance Costs", amount: data.breakdown.maintenanceCosts, color: "#EF4444" },
    { label: "Utilities", amount: data.breakdown.utilities, color: "#F59E0B" },
    { label: "Other Expenses", amount: data.breakdown.otherExpenses, color: "#8B5CF6" },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Financial Overview</Text>
        <TouchableOpacity style={styles.periodButton}>
          <MaterialCommunityIcons name="calendar" size={16} color="#3B82F6" />
          <Text style={styles.periodText}>Monthly</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.financialCard} mode="elevated">
        <Card.Content style={styles.cardContent}>
          {/* Total Revenue */}
          <View style={styles.totalSection}>
            <Text style={styles.totalAmount}>{formatCurrency(data.totalRevenue)}</Text>
            <View style={styles.revenueBreakdown}>
              <View style={styles.revenueItem}>
                <Text style={styles.revenueLabel}>Revenue:</Text>
                <Text style={styles.revenueValue}>{formatCurrency(data.revenue)}</Text>
              </View>
              <View style={styles.revenueItem}>
                <Text style={styles.expenseLabel}>Expenses:</Text>
                <Text style={styles.expenseValue}>{formatCurrency(data.expenses)}</Text>
              </View>
            </View>
          </View>

          {/* Breakdown */}
          <View style={styles.breakdownSection}>
            {breakdownItems.map((item, index) => (
              <View key={index} style={styles.breakdownItem}>
                <View style={styles.breakdownLeft}>
                  <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                  <Text style={styles.breakdownLabel}>{item.label}</Text>
                </View>
                <Text style={styles.breakdownAmount}>{formatCurrency(item.amount)}</Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
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
  periodButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#F1F5F9",
  },
  periodText: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "500",
  },
  financialCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  totalSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
  },
  revenueBreakdown: {
    flexDirection: "row",
    gap: 24,
  },
  revenueItem: {
    alignItems: "center",
  },
  revenueLabel: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  revenueValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#10B981",
  },
  expenseLabel: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  expenseValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
  breakdownSection: {
    gap: 12,
  },
  breakdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  breakdownLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  breakdownLabel: {
    fontSize: 14,
    color: "#64748B",
  },
  breakdownAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
})

export default FinancialOverview
