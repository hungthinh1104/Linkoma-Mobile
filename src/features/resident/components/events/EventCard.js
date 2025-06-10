import { memo } from "react"
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { Text, Card, Badge } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

const EventCard = memo(({ event, onPress, size = "medium" }) => {
  const cardWidth = size === "large" ? width - 40 : (width - 60) / 2

  const getCategoryColor = (category) => {
    switch (category) {
      case "Community":
        return "#10B981"
      case "Health & Fitness":
        return "#8B5CF6"
      case "Family":
        return "#F59E0B"
      case "Food & Drink":
        return "#EF4444"
      case "Education":
        return "#3B82F6"
      default:
        return "#64748B"
    }
  }

  const getAttendanceStatus = () => {
    const percentage = (event.attendees / event.maxAttendees) * 100
    if (percentage >= 90) return { text: "Almost Full", color: "#EF4444" }
    if (percentage >= 70) return { text: "Filling Up", color: "#F59E0B" }
    return { text: "Available", color: "#10B981" }
  }

  const attendanceStatus = getAttendanceStatus()

  return (
    <TouchableOpacity
      style={[styles.container, { width: cardWidth }]}
      onPress={() => onPress(event)}
      activeOpacity={0.8}
    >
      <Card style={styles.card} mode="elevated">
        {/* Event Image */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <MaterialCommunityIcons name="calendar-star" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.imageOverlay}>
            <Badge style={[styles.categoryBadge, { backgroundColor: getCategoryColor(event.category) }]}>
              {event.category}
            </Badge>
          </View>
        </View>

        <Card.Content style={styles.content}>
          {/* Event Title */}
          <Text style={styles.title} numberOfLines={2}>
            {event.title}
          </Text>

          {/* Date & Time */}
          <View style={styles.dateTimeRow}>
            <MaterialCommunityIcons name="calendar" size={14} color="#64748B" />
            <Text style={styles.dateText}>{event.date}</Text>
          </View>

          <View style={styles.dateTimeRow}>
            <MaterialCommunityIcons name="clock-outline" size={14} color="#64748B" />
            <Text style={styles.timeText}>{event.time}</Text>
          </View>

          {/* Location */}
          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker" size={14} color="#64748B" />
            <Text style={styles.locationText} numberOfLines={1}>
              {event.location}
            </Text>
          </View>

          {/* Host */}
          <View style={styles.hostRow}>
            <MaterialCommunityIcons name="account-group" size={14} color="#64748B" />
            <Text style={styles.hostText} numberOfLines={1}>
              {event.host}
            </Text>
          </View>

          {/* Attendance */}
          <View style={styles.attendanceRow}>
            <View style={styles.attendanceInfo}>
              <Text style={styles.attendanceCount}>
                {event.attendees}/{event.maxAttendees}
              </Text>
              <Text style={styles.attendanceLabel}>attending</Text>
            </View>
            <Badge style={[styles.statusBadge, { backgroundColor: attendanceStatus.color }]}>
              {attendanceStatus.text}
            </Badge>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
  },
  imageOverlay: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  categoryBadge: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
    lineHeight: 20,
  },
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  timeText: {
    fontSize: 13,
    color: "#64748B",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  locationText: {
    fontSize: 13,
    color: "#64748B",
    flex: 1,
  },
  hostRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 6,
  },
  hostText: {
    fontSize: 13,
    color: "#64748B",
    flex: 1,
  },
  attendanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attendanceInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  attendanceCount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  attendanceLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  statusBadge: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
})

export default EventCard
