import { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const MaintenanceAlerts = memo(({ alerts }) => {
  const getAlertColor = (type) => {
    switch (type) {
      case "critical":
        return "#EF4444"
      case "warning":
        return "#F59E0B"
      case "info":
        return "#3B82F6"
      default:
        return "#64748B"
    }
  }

  const getAlertBadge = (type) => {
    switch (type) {
      case "critical":
        return "Critical"
      case "warning":
        return "Warning"
      case "info":
        return "Info"
      default:
        return "Unknown"
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Maintenance Alerts</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.alertsCard} mode="elevated">
        <Card.Content style={styles.cardContent}>
          {alerts.map((alert, index) => (
            <View key={alert.id}>
              <TouchableOpacity style={styles.alertItem} activeOpacity={0.7}>
                <View style={[styles.alertIcon, { backgroundColor: `${getAlertColor(alert.type)}15` }]}>
                  <MaterialCommunityIcons name={alert.icon} size={20} color={getAlertColor(alert.type)} />
                </View>

                <View style={styles.alertContent}>
                  <View style={styles.alertHeader}>
                    <Text style={styles.alertTitle}>{alert.title}</Text>
                    <View style={[styles.alertBadge, { backgroundColor: getAlertColor(alert.type) }]}>
                      <Text style={styles.badgeText}>{getAlertBadge(alert.type)}</Text>
                    </View>
                  </View>
                  <Text style={styles.alertLocation}>{alert.location}</Text>
                </View>

                <MaterialCommunityIcons name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>
              {index < alerts.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
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
  viewAllText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
  },
  alertsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  alertItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  alertContent: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    flex: 1,
    marginRight: 8,
  },
  alertBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  alertLocation: {
    fontSize: 14,
    color: "#64748B",
  },
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 8,
  },
})

export default MaintenanceAlerts
