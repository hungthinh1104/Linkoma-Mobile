import { memo } from "react"
import { View, StyleSheet } from "react-native"
import { Card, Text } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const StatCard = memo(({ icon, title, value, color, subtitle }) => (
  <Card style={[styles.statCard, { borderLeftColor: color }]} mode="elevated">
    <Card.Content style={styles.statContent}>
      <View style={styles.statHeader}>
        <MaterialCommunityIcons name={icon} size={24} color={color} />
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </Card.Content>
  </Card>
))

const QuickStats = memo(() => {
  const stats = [
    {
      icon: "currency-usd",
      title: "Outstanding",
      value: "$1,445.50",
      color: "#DC2626",
      subtitle: "1 unpaid bill",
    },
    {
      icon: "calendar-clock",
      title: "Due Soon",
      value: "3 days",
      color: "#D97706",
      subtitle: "Next payment",
    },
    {
      icon: "check-circle",
      title: "Paid This Year",
      value: "$16,890",
      color: "#059669",
      subtitle: "11 payments",
    },
    {
      icon: "chart-line",
      title: "Avg Monthly",
      value: "$1,407",
      color: "#2563EB",
      subtitle: "Last 6 months",
    },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </View>
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
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
  },
})

export default QuickStats
