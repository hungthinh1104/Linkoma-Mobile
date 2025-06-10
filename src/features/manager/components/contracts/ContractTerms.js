import { memo } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const ContractTerms = memo(({ contract }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN")
  }

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <Text style={styles.sectionTitle}>Contract Terms & Conditions</Text>

        <View style={styles.termsGrid}>
          {/* Contract Period */}
          <View style={styles.termSection}>
            <View style={styles.termHeader}>
              <MaterialCommunityIcons name="calendar-range" size={20} color="#3B82F6" />
              <Text style={styles.termTitle}>Contract Period</Text>
            </View>
            <View style={styles.termContent}>
              <Text style={styles.termText}>
                From {formatDate(contract.StartDate)} to {formatDate(contract.EndDate)}
              </Text>
              {contract.ExtendedTime && (
                <Text style={styles.extensionText}>Extended until {formatDate(contract.ExtendedTime)}</Text>
              )}
            </View>
          </View>

          {/* Payment Terms */}
          <View style={styles.termSection}>
            <View style={styles.termHeader}>
              <MaterialCommunityIcons name="credit-card" size={20} color="#10B981" />
              <Text style={styles.termTitle}>Payment Terms</Text>
            </View>
            <View style={styles.termContent}>
              <Text style={styles.termText}>Payment Cycle: {contract.PaymentCycle}</Text>
              <Text style={styles.termText}>Due Date: 1st of each month</Text>
              <Text style={styles.termText}>Late Fee: 5% after 5 days</Text>
            </View>
          </View>

          {/* Security Deposit */}
          <View style={styles.termSection}>
            <View style={styles.termHeader}>
              <MaterialCommunityIcons name="shield-check" size={20} color="#F59E0B" />
              <Text style={styles.termTitle}>Security Deposit</Text>
            </View>
            <View style={styles.termContent}>
              <Text style={styles.termText}>
                Amount:{" "}
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(contract.DepositAmount)}
              </Text>
              <Text style={styles.termText}>Refundable upon contract completion</Text>
              <Text style={styles.termText}>Subject to damage assessment</Text>
            </View>
          </View>

          {/* Utilities & Services */}
          <View style={styles.termSection}>
            <View style={styles.termHeader}>
              <MaterialCommunityIcons name="lightning-bolt" size={20} color="#8B5CF6" />
              <Text style={styles.termTitle}>Utilities & Services</Text>
            </View>
            <View style={styles.termContent}>
              <Text style={styles.termText}>• Electricity: Tenant responsibility</Text>
              <Text style={styles.termText}>• Water: Included in rent</Text>
              <Text style={styles.termText}>• Internet: Available for connection</Text>
              <Text style={styles.termText}>• Maintenance: Landlord responsibility</Text>
            </View>
          </View>

          {/* Rules & Regulations */}
          <View style={styles.termSection}>
            <View style={styles.termHeader}>
              <MaterialCommunityIcons name="gavel" size={20} color="#EF4444" />
              <Text style={styles.termTitle}>Rules & Regulations</Text>
            </View>
            <View style={styles.termContent}>
              <Text style={styles.termText}>• No pets allowed</Text>
              <Text style={styles.termText}>• No smoking inside the apartment</Text>
              <Text style={styles.termText}>• Quiet hours: 10 PM - 7 AM</Text>
              <Text style={styles.termText}>• Maximum 2 occupants</Text>
              <Text style={styles.termText}>• No subletting without permission</Text>
            </View>
          </View>

          {/* Termination Clause */}
          <View style={styles.termSection}>
            <View style={styles.termHeader}>
              <MaterialCommunityIcons name="file-remove" size={20} color="#64748B" />
              <Text style={styles.termTitle}>Termination Clause</Text>
            </View>
            <View style={styles.termContent}>
              <Text style={styles.termText}>• 30 days written notice required</Text>
              <Text style={styles.termText}>• Early termination fee: 1 month rent</Text>
              <Text style={styles.termText}>• Property inspection required</Text>
              <Text style={styles.termText}>• Deposit refund within 30 days</Text>
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
  termsGrid: {
    gap: 20,
  },
  termSection: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
  },
  termHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  termTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  termContent: {
    gap: 6,
  },
  termText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  extensionText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "500",
    marginTop: 4,
  },
})

export default ContractTerms
