import { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const RecentActivity = memo(({ activities }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.activityCard} mode="elevated">
        <Card.Content style={styles.cardContent}>
          {activities.map((activity, index) => (
            <View key={activity.id}>
              <TouchableOpacity style={styles.activityItem} activeOpacity={0.7}>
                <View style={[styles.activityIcon, { backgroundColor: `${activity.color}15` }]}>
                  <MaterialCommunityIcons name={activity.icon} size={20} color={activity.color} />
                </View>

                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>

                <MaterialCommunityIcons name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>
              {index < activities.length - 1 && <View style={styles.separator} />}
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
    paddingBottom: 40,
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
  activityCard: {
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
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
    lineHeight: 18,
  },
  activityTime: {
    fontSize: 12,
    color: "#64748B",
  },
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 8,
  },
})

export default RecentActivity
