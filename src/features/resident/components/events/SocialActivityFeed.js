import { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const SocialActivityFeed = memo(({ activities }) => {
  const getActionIcon = (action) => {
    switch (action) {
      case "RSVP'd to":
        return "calendar-check"
      case "shared event":
        return "share-variant"
      case "joined":
        return "account-plus"
      default:
        return "information"
    }
  }

  const getActionColor = (action) => {
    switch (action) {
      case "RSVP'd to":
        return "#10B981"
      case "shared event":
        return "#3B82F6"
      case "joined":
        return "#8B5CF6"
      default:
        return "#64748B"
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Social Activity Feed</Text>
        <TouchableOpacity>
          <Text style={styles.recentText}>Recent</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.feedCard}>
        <Card.Content style={styles.feedContent}>
          {activities.map((activity, index) => (
            <View key={activity.id}>
              <View style={styles.activityItem}>
                <View style={styles.userAvatar}>
                  <Text style={styles.avatarText}>{activity.user.avatar}</Text>
                </View>
                <View style={styles.activityContent}>
                  <View style={styles.activityText}>
                    <Text style={styles.userName}>{activity.user.name}</Text>
                    <Text style={styles.actionText}> {activity.action} </Text>
                    <Text style={styles.eventText}>{activity.event}</Text>
                  </View>
                  <Text style={styles.timeText}>{activity.time}</Text>
                </View>
                <View style={[styles.actionIcon, { backgroundColor: `${getActionColor(activity.action)}15` }]}>
                  <MaterialCommunityIcons
                    name={getActionIcon(activity.action)}
                    size={16}
                    color={getActionColor(activity.action)}
                  />
                </View>
              </View>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
  recentText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
  },
  feedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  feedContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  actionText: {
    fontSize: 14,
    color: "#64748B",
  },
  eventText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "500",
  },
  timeText: {
    fontSize: 12,
    color: "#94A3B8",
  },
  actionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 8,
  },
})

export default SocialActivityFeed
