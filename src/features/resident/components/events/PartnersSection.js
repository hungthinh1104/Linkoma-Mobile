import { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const PartnersSection = memo(() => {
  const partners = [
    { id: 1, name: "Local Gym", icon: "dumbbell", color: "#EF4444" },
    { id: 2, name: "Coffee Shop", icon: "coffee", color: "#8B5CF6" },
    { id: 3, name: "Bookstore", icon: "book", color: "#10B981" },
    { id: 4, name: "Restaurant", icon: "silverware-fork-knife", color: "#F59E0B" },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Partners</Text>

      <View style={styles.partnersGrid}>
        {partners.map((partner) => (
          <TouchableOpacity key={partner.id} style={styles.partnerItem} activeOpacity={0.7}>
            <Card style={styles.partnerCard}>
              <Card.Content style={styles.partnerContent}>
                <View style={[styles.partnerIcon, { backgroundColor: `${partner.color}15` }]}>
                  <MaterialCommunityIcons name={partner.icon} size={24} color={partner.color} />
                </View>
                <Text style={styles.partnerName}>{partner.name}</Text>
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 16,
  },
  partnersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  partnerItem: {
    width: "48%",
  },
  partnerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  partnerContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  partnerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  partnerName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
    textAlign: "center",
  },
})

export default PartnersSection
