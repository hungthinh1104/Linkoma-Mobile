import { memo } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const MetricCard = memo(({ icon, title, value, change, period, format = "number" }) => {
  const isPositive = change > 0
  const changeColor = isPositive ? "#10B981" : "#EF4444"
  const changeIcon = isPositive ? "trending-up" : "trending-down"

  const formatValue = (val) => {
    if (format === "currency") {
      return `$${(val / 1000000).toFixed(1)}M`
    }
    if (format === "percentage") {
      return `${val}%`
    }
    return val.toLocaleString()
  }

  return (
    <Card style={styles.metricCard} mode="elevated">
      <Card.Content style={styles.metricContent}>
        <View style={styles.metricHeader}>
          <MaterialCommunityIcons name={icon} size={20} color="#3B82F6" />
          <MaterialCommunityIcons name="chevron-right" size={16} color="#94A3B8" />
        </View>

        <Text style={styles.metricValue}>{formatValue(value)}</Text>

        <View style={styles.metricChange}>
          <MaterialCommunityIcons name={changeIcon} size={12} color={changeColor} />
          <Text style={[styles.changeText, { color: changeColor }]}>
            {isPositive ? "+" : ""}
            {change}% ({period})
          </Text>
        </View>

        <Text style={styles.metricTitle}>{title}</Text>
      </Card.Content>
    </Card>
  )
})

const ExecutiveSummary = memo(({ data }) => {
  const metrics = [
    {
      icon: "account-group",
      title: "Active Residents",
      value: data.activeResidents.value,
      change: data.activeResidents.change,
      period: data.activeResidents.period,
      format: "number",
    },
    {
      icon: "clipboard-list",
      title: "Occupancy Rate",
      value: data.occupancyRate.value,
      change: data.occupancyRate.change,
      period: data.occupancyRate.period,
      format: "percentage",
    },
    {
      icon: "currency-usd",
      title: "Net Operating Income",
      value: data.netOperatingIncome.value,
      change: data.netOperatingIncome.change,
      period: data.netOperatingIncome.period,
      format: "currency",
    },
    {
      icon: "wrench",
      title: "Open Work Orders",
      value: data.openWorkOrders.value,
      change: data.openWorkOrders.change,
      period: data.openWorkOrders.period,
      format: "number",
    },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Executive Summary</Text>
      <View style={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
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
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  metricContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  metricTitle: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 18,
  },
})

export default ExecutiveSummary
