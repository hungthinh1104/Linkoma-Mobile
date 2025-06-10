import { memo } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const ApartmentDetails = memo(({ contract }) => {
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <Text style={styles.sectionTitle}>Apartment Details</Text>

        <View style={styles.apartmentHeader}>
          <View style={styles.apartmentNumber}>
            <MaterialCommunityIcons name="home" size={32} color="#3B82F6" />
            <View>
              <Text style={styles.apartmentId}>Apartment {contract.ApartmentID}</Text>
              <Text style={styles.apartmentType}>{contract.ApartmentType}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="office-building" size={20} color="#64748B" />
            <Text style={styles.detailLabel}>Building</Text>
            <Text style={styles.detailValue}>{contract.Building}</Text>
          </View>

          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="elevator" size={20} color="#64748B" />
            <Text style={styles.detailLabel}>Floor</Text>
            <Text style={styles.detailValue}>{contract.Floor}</Text>
          </View>

          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="floor-plan" size={20} color="#64748B" />
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>{contract.ApartmentType}</Text>
          </View>

          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="key" size={20} color="#64748B" />
            <Text style={styles.detailLabel}>Status</Text>
            <Text style={[styles.detailValue, styles.occupiedStatus]}>Occupied</Text>
          </View>
        </View>

        {/* Apartment Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Features & Amenities</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureChip}>
              <MaterialCommunityIcons name="bed" size={16} color="#3B82F6" />
              <Text style={styles.featureText}>2 Bedrooms</Text>
            </View>
            <View style={styles.featureChip}>
              <MaterialCommunityIcons name="shower" size={16} color="#3B82F6" />
              <Text style={styles.featureText}>2 Bathrooms</Text>
            </View>
            <View style={styles.featureChip}>
              <MaterialCommunityIcons name="air-conditioner" size={16} color="#3B82F6" />
              <Text style={styles.featureText}>Air Conditioning</Text>
            </View>
            <View style={styles.featureChip}>
              <MaterialCommunityIcons name="balcony" size={16} color="#3B82F6" />
              <Text style={styles.featureText}>Balcony</Text>
            </View>
            <View style={styles.featureChip}>
              <MaterialCommunityIcons name="car" size={16} color="#3B82F6" />
              <Text style={styles.featureText}>Parking</Text>
            </View>
            <View style={styles.featureChip}>
              <MaterialCommunityIcons name="wifi" size={16} color="#3B82F6" />
              <Text style={styles.featureText}>Internet Ready</Text>
            </View>
          </View>
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
  apartmentHeader: {
    marginBottom: 20,
  },
  apartmentNumber: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  apartmentId: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  apartmentType: {
    fontSize: 14,
    color: "#64748B",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 20,
  },
  detailItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#64748B",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },
  occupiedStatus: {
    color: "#10B981",
  },
  featuresSection: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 16,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  featuresList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  featureChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  featureText: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "500",
  },
})

export default ApartmentDetails
