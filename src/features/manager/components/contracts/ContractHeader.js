import { memo } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Card, Badge } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const ContractHeader = memo(({ contract }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#10B981"
      case "Expiring Soon":
        return "#F59E0B"
      case "Expired":
        return "#EF4444"
      case "Renewed":
        return "#3B82F6"
      default:
        return "#64748B"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return "check-circle"
      case "Expiring Soon":
        return "clock-alert"
      case "Expired":
        return "alert-circle"
      case "Renewed":
        return "refresh"
      default:
        return "help-circle"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN")
  }

  const getDaysText = (days) => {
    if (days < 0) {
      return `Expired ${Math.abs(days)} days ago`
    } else if (days === 0) {
      return "Expires today"
    } else if (days <= 30) {
      return `Expires in ${days} days`
    } else {
      return `${days} days remaining`
    }
  }

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        {/* Contract ID and Status */}
        <View style={styles.headerRow}>
          <View style={styles.contractInfo}>
            <Text style={styles.contractId}>Contract #{contract.ContractID}</Text>
            <Text style={styles.apartmentNumber}>Apartment {contract.ApartmentID}</Text>
          </View>
          <Badge style={[styles.statusBadge, { backgroundColor: getStatusColor(contract.Status) }]}>
            <MaterialCommunityIcons
              name={getStatusIcon(contract.Status)}
              size={14}
              color="#FFFFFF"
              style={styles.statusIcon}
            />
            {contract.Status}
          </Badge>
        </View>

        {/* Resident Name */}
        <View style={styles.residentSection}>
          <MaterialCommunityIcons name="account" size={24} color="#3B82F6" />
          <Text style={styles.residentName}>{contract.ResidentName}</Text>
        </View>

        {/* Contract Period */}
        <View style={styles.periodSection}>
          <View style={styles.dateItem}>
            <MaterialCommunityIcons name="calendar-start" size={20} color="#64748B" />
            <View>
              <Text style={styles.dateLabel}>Start Date</Text>
              <Text style={styles.dateValue}>{formatDate(contract.StartDate)}</Text>
            </View>
          </View>

          <MaterialCommunityIcons name="arrow-right" size={20} color="#94A3B8" />

          <View style={styles.dateItem}>
            <MaterialCommunityIcons name="calendar-end" size={20} color="#64748B" />
            <View>
              <Text style={styles.dateLabel}>End Date</Text>
              <Text style={styles.dateValue}>{formatDate(contract.EndDate)}</Text>
            </View>
          </View>
        </View>

        {/* Extension Info */}
        {contract.ExtendedTime && (
          <View style={styles.extensionSection}>
            <MaterialCommunityIcons name="calendar-plus" size={16} color="#3B82F6" />
            <Text style={styles.extensionText}>Extended until {formatDate(contract.ExtendedTime)}</Text>
          </View>
        )}

        {/* Expiry Warning */}
        <View style={styles.expirySection}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={16}
            color={contract.DaysUntilExpiry <= 30 ? "#F59E0B" : "#64748B"}
          />
          <Text style={[styles.expiryText, { color: contract.DaysUntilExpiry <= 30 ? "#F59E0B" : "#64748B" }]}>
            {getDaysText(contract.DaysUntilExpiry)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  )
})

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  contractInfo: {
    flex: 1,
  },
  contractId: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  apartmentNumber: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "600",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusIcon: {
    marginRight: 4,
  },
  residentSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  residentName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1E293B",
  },
  periodSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  extensionSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  extensionText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "500",
  },
  expirySection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  expiryText: {
    fontSize: 14,
    fontWeight: "500",
  },
})

export default ContractHeader
