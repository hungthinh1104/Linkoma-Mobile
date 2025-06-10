"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions } from "react-native"
import { Text, Searchbar } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import FeaturedEvents from "../components/events/FeaturedEvents"
import UpcomingCalendar from "../components/events/UpcomingCalendar"
import RecommendedEvents from "../components/events/RecommendedEvents"
import SocialActivityFeed from "../components/events/SocialActivityFeed"
import PartnersSection from "../components/events/PartnersSection"

const { width } = Dimensions.get("window")

const EventScreen = () => {
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock event data based on apartment community events
  const [featuredEvents] = useState([
    {
      id: 1,
      title: "Resident Meeting 2024",
      date: "Mon, Dec 1",
      time: "7:00 PM - 9:00 PM",
      location: "Community Hall",
      host: "Building Management",
      category: "Community",
      //image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop",
      attendees: 45,
      maxAttendees: 100,
    },
    {
      id: 2,
      title: "Yoga & Wellness Class",
      date: "Fri, Nov 24",
      time: "6:00 AM - 7:00 AM",
      location: "Rooftop Garden",
      host: "Wellness Center",
      category: "Health & Fitness",
      //image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop",
      attendees: 12,
      maxAttendees: 20,
    },
  ])

  const [upcomingEvents] = useState([
    {
      id: 3,
      title: "Community BBQ Day",
      date: "Sat, Dec 9",
      time: "12:00 PM - 4:00 PM",
      location: "Pool Area",
      host: "Resident Committee",
      category: "Community",
      //image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop",
      attendees: 28,
      maxAttendees: 50,
    },
    {
      id: 4,
      title: "Kids Movie Night",
      date: "Wed, Nov 29",
      time: "7:00 PM - 9:00 PM",
      location: "Community Theater",
      host: "Family Activities",
      category: "Family",
      //image: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=300&h=200&fit=crop",
      attendees: 15,
      maxAttendees: 30,
    },
  ])

  const [recommendedEvents] = useState([
    {
      id: 5,
      title: "Cooking Workshop",
      date: "Sun, Dec 10",
      time: "2:00 PM - 5:00 PM",
      location: "Community Kitchen",
      host: "Chef Maria",
      category: "Food & Drink",
      //image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
      attendees: 8,
      maxAttendees: 15,
    },
    {
      id: 6,
      title: "Book Club Meeting",
      date: "Thu, Dec 14",
      time: "7:30 PM - 9:00 PM",
      location: "Library Corner",
      host: "Reading Group",
      category: "Education",
      //image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      attendees: 6,
      maxAttendees: 12,
    },
  ])

  const [socialActivities] = useState([
    {
      id: 1,
      user: {
        name: "Nguyễn Thị Lan",
        avatar: "👩‍💼",
      },
      action: "RSVP'd to",
      event: "Resident Meeting 2024",
      time: "2h ago",
    },
    {
      id: 2,
      user: {
        name: "Trần Văn Nam",
        avatar: "👨‍💻",
      },
      action: "shared event",
      event: "Yoga & Wellness Class",
      time: "5h ago",
    },
    {
      id: 3,
      user: {
        name: "Lê Thị Mai",
        avatar: "👩‍🎨",
      },
      action: "joined",
      event: "Community BBQ Day",
      time: "1d ago",
    },
  ])

  const handleEventPress = (event) => {
    navigation.navigate("EventDetail", { eventData: event })
  }

  const handleSearchFocus = () => {
    navigation.navigate("EventSearch")
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Event Explorer</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#1E293B" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileText}>👩‍💼</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search events and interests..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          onFocus={handleSearchFocus}
        />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Featured Events */}
        <FeaturedEvents events={featuredEvents} onEventPress={handleEventPress} />

        {/* Upcoming Calendar */}
        <UpcomingCalendar events={upcomingEvents} onEventPress={handleEventPress} />

        {/* Recommended Events */}
        <RecommendedEvents events={recommendedEvents} onEventPress={handleEventPress} />

        {/* Social Activity Feed */}
        <SocialActivityFeed activities={socialActivities} />

        {/* Partners Section */}
        <PartnersSection />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight + 16,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  notificationButton: {
    position: "relative",
    padding: 4,
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#EF4444",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  profileButton: {
    padding: 4,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 16,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  searchBar: {
    backgroundColor: "#F8FAFC",
    elevation: 0,
    borderRadius: 12,
  },
  searchInput: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
})

export default EventScreen