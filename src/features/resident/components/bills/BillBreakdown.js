import { memo } from "react"
import { View, StyleSheet } from "react-native"
import { Card, Text } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const BillBreakdown = memo(({ billData }) => {
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <Text style={styles.title}>Bill Breakdown</Text>

        <View style={styles.mainItem}>
          <View style={styles.itemLeft}>
            <MaterialCommunityIcons name="home" size={20} color="#2563EB" />
            <Text style={styles.itemLabel}>Rent Fee</Text>
          </View>
          <Text style={styles.itemAmount}>${billData.RentFee?.toFixed(2)}</Text>
        </View>

        <View style={styles.serviceSection}>
          <View style={styles.serviceTitleRow}>
            <MaterialCommunityIcons name="cog" size={20} color="#059669" />
            <Text style={styles.serviceTitle}>Service Fees</Text>
            <Text style={styles.serviceTotalAmount}>${billData.ServiceFee?.toFixed(2)}</Text>
          </View>

          <View style={styles.serviceList}>
            {billData.serviceBreakdown?.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text style={styles.serviceName}>• {service.name}</Text>
                <Text style={styles.serviceAmount}>${service.amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>${billData.Total?.toFixed(2)}</Text>
        </View>
      </Card.Content>
    </Card>
  )
})

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
  },
  mainItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  serviceSection: {
    marginVertical: 8,
  },
  serviceTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    flex: 1,
    marginLeft: 12,
  },
  serviceTotalAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  serviceList: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  serviceName: {
    fontSize: 14,
    color: "#64748B",
    flex: 1,
  },
  serviceAmount: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563EB",
  },
})

export default BillBreakdown
