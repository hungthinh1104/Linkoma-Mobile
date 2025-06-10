import { memo } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Card, Button } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import EventCard from "./EventCard"

const UpcomingCalendar = memo(({ events, onEventPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Calendar Events</Text>
        <Button
          mode="outlined"
          style={styles.syncButton}
          labelStyle={styles.syncButtonText}
          icon="calendar-sync"
          compact
        >
          Sync Calendar
        </Button>
      </View>

      {/* Calendar Placeholder */}
      <Card style={styles.calendarCard}>
        <Card.Content style={styles.calendarContent}>
          <MaterialCommunityIcons name="calendar-month" size={32} color="#64748B" />
          <Text style={styles.calendarText}>Compact Calendar View Placeholder</Text>
        </Card.Content>
      </Card>

      {/* Upcoming Events Grid */}
      <View style={styles.eventsGrid}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} onPress={onEventPress} size="medium" />
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
    flex: 1,
  },
  syncButton: {
    borderColor: "#3B82F6",
    borderRadius: 8,
  },
  syncButtonText: {
    color: "#3B82F6",
    fontSize: 12,
  },
  calendarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 20,
    elevation: 1,
  },
  calendarContent: {
    alignItems: "center",
    paddingVertical: 24,
  },
  calendarText: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 8,
  },
  eventsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
})

export default UpcomingCalendar
