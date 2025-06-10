import { memo } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const ContractTimeline = memo(({ timeline }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN")
  }

  const getTimelineColor = (type) => {
    switch (type) {
      case "contract":
        return "#3B82F6"
      case "move":
        return "#10B981"
      case "extension":
        return "#8B5CF6"
      case "adjustment":
        return "#F59E0B"
      case "termination":
        return "#EF4444"
      default:
        return "#64748B"
    }
  }

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <Text style={styles.sectionTitle}>Contract Timeline</Text>

        <View style={styles.timeline}>
          {timeline.map((event, index) => (
            <View key={event.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineIcon, { backgroundColor: `${getTimelineColor(event.type)}15` }]}>
                  <MaterialCommunityIcons name={event.icon} size={20} color={getTimelineColor(event.type)} />
                </View>
                {index < timeline.length - 1 && <View style={styles.timelineLine} />}
              </View>

              <View style={styles.timelineContent}>
                <View style={styles.timelineHeader}>
                  <Text style={styles.timelineTitle}>{event.title}</Text>
                  <Text style={styles.timelineDate}>{formatDate(event.date)}</Text>
                </View>
                <Text style={styles.timelineDescription}>{event.description}</Text>
              </View>
            </View>
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
    marginBottom: 100, // Extra space for FAB
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
  timeline: {
    gap: 0,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 16,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E5E7EB",
    marginTop: -8,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 8,
  },
  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    flex: 1,
  },
  timelineDate: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  timelineDescription: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
})

export default ContractTimeline
