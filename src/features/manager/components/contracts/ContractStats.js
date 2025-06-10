import { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const StatItem = memo(({ icon, label, value, color, onPress }) => (
  <TouchableOpacity style={styles.statItem} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.statIcon, { backgroundColor: `${color}15` }]}>
      <MaterialCommunityIcons name={icon} size={20} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </TouchableOpacity>
))

const ContractStats = memo(({ stats }) => {
  const statItems = [
    {
      icon: "file-document-multiple",
      label: "Total",
      value: stats.total,
      color: "#64748B",
    },
    {
      icon: "check-circle",
      label: "Active",
      value: stats.active,
      color: "#10B981",
    },
    {
      icon: "clock-alert",
      label: "Expiring",
      value: stats.expiringSoon,
      color: "#F59E0B",
    },
    {
      icon: "alert-circle",
      label: "Expired",
      value: stats.expired,
      color: "#EF4444",
    },
    {
      icon: "refresh",
      label: "Renewed",
      value: stats.renewed,
      color: "#3B82F6",
    },
  ]

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <View style={styles.statsGrid}>
          {statItems.map((item, index) => (
            <StatItem key={index} {...item} />
          ))}
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
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
})

export default ContractStats
