import { memo } from "react"
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const ResidentInfo = memo(({ contract }) => {
  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`)
  }

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`)
  }

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <Text style={styles.sectionTitle}>Resident Information</Text>

        <View style={styles.infoGrid}>
          {/* Name */}
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <MaterialCommunityIcons name="account" size={20} color="#3B82F6" />
              <Text style={styles.infoLabel}>Full Name</Text>
            </View>
            <Text style={styles.infoValue}>{contract.ResidentName}</Text>
          </View>

          {/* Phone */}
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <MaterialCommunityIcons name="phone" size={20} color="#10B981" />
              <Text style={styles.infoLabel}>Phone Number</Text>
            </View>
            <TouchableOpacity onPress={() => handleCall(contract.ResidentPhone)}>
              <Text style={[styles.infoValue, styles.linkText]}>{contract.ResidentPhone}</Text>
            </TouchableOpacity>
          </View>

          {/* Email */}
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <MaterialCommunityIcons name="email" size={20} color="#F59E0B" />
              <Text style={styles.infoLabel}>Email Address</Text>
            </View>
            <TouchableOpacity onPress={() => handleEmail(contract.residentDetails.Email)}>
              <Text style={[styles.infoValue, styles.linkText]}>{contract.residentDetails.Email}</Text>
            </TouchableOpacity>
          </View>

          {/* Citizen ID */}
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <MaterialCommunityIcons name="card-account-details" size={20} color="#8B5CF6" />
              <Text style={styles.infoLabel}>Citizen ID</Text>
            </View>
            <Text style={styles.infoValue}>{contract.residentDetails.CitizenID}</Text>
          </View>

          {/* Emergency Contact */}
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <MaterialCommunityIcons name="account-alert" size={20} color="#EF4444" />
              <Text style={styles.infoLabel}>Emergency Contact</Text>
            </View>
            <Text style={styles.infoValue}>{contract.residentDetails.EmergencyContact}</Text>
          </View>

          {/* Occupation */}
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <MaterialCommunityIcons name="briefcase" size={20} color="#64748B" />
              <Text style={styles.infoLabel}>Occupation</Text>
            </View>
            <Text style={styles.infoValue}>{contract.residentDetails.Occupation}</Text>
          </View>

          {/* Company */}
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <MaterialCommunityIcons name="office-building" size={20} color="#64748B" />
              <Text style={styles.infoLabel}>Company</Text>
            </View>
            <Text style={styles.infoValue}>{contract.residentDetails.Company}</Text>
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
  infoGrid: {
    gap: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#64748B",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
    textAlign: "right",
    flex: 1,
  },
  linkText: {
    color: "#3B82F6",
    textDecorationLine: "underline",
  },
})

export default ResidentInfo
