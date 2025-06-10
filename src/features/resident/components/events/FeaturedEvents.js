import { memo } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Text } from "react-native-paper"
import EventCard from "./EventCard"

const FeaturedEvents = memo(({ events, onEventPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Featured Events</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.eventsContainer}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} onPress={onEventPress} size="large" />
          ))}
        </View>
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
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
  scrollView: {
    paddingLeft: 20,
  },
  eventsContainer: {
    flexDirection: "row",
    gap: 16,
    paddingRight: 20,
  },
})

export default FeaturedEvents
