import { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const QuickActions = memo(({ onActionPress }) => {
  const actions = [
    {
      id: "create_work_order",
      title: "Create Work Order",
      icon: "wrench-plus",
      color: "#3B82F6",
      description: "New maintenance request",
    },
    {
      id: "new_resident",
      title: "New Resident",
      icon: "account-plus",
      color: "#10B981",
      description: "Add resident profile",
    },
    {
      id: "view_reports",
      title: "View Reports",
      icon: "chart-line",
      color: "#8B5CF6",
      description: "Analytics & insights",
    },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionItem}
            onPress={() => onActionPress(action.id)}
            activeOpacity={0.7}
          >
            <Card style={styles.actionCard} mode="elevated">
              <Card.Content style={styles.actionContent}>
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}15` }]}>
                  <MaterialCommunityIcons name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
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
  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  actionItem: {
    flex: 1,
  },
  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  actionContent: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 16,
  },
})

export default QuickActions
