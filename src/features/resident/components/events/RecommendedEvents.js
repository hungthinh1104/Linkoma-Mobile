import { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "react-native-paper"
import EventCard from "./EventCard"

const RecommendedEvents = memo(({ events, onEventPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recommendations for You</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

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
  },
  viewAllText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
  },
  eventsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
})

export default RecommendedEvents
