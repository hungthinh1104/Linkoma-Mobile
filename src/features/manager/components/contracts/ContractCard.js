"use client"

import { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, Card, Badge, Menu } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useState } from "react"

const ContractCard = memo(({ contract, onPress, onAction }) => {
  const [menuVisible, setMenuVisible] = useState(false)

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
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

  const getMenuItems = () => {
    const items = [
      { title: "View Details", icon: "eye", action: "view" },
      { title: "Edit Contract", icon: "pencil", action: "edit" },
    ]

    if (contract.Status === "Active" || contract.Status === "Expiring Soon") {
      items.push({ title: "Renew Contract", icon: "refresh", action: "renew" })
      items.push({ title: "Terminate Contract", icon: "close-circle", action: "terminate" })
    }

    return items
  }

  return (
    <TouchableOpacity onPress={() => onPress(contract)} activeOpacity={0.7}>
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.contractId}>#{contract.ContractID}</Text>
              <Badge style={[styles.statusBadge, { backgroundColor: getStatusColor(contract.Status) }]}>
                <MaterialCommunityIcons
                  name={getStatusIcon(contract.Status)}
                  size={12}
                  color="#FFFFFF"
                  style={styles.statusIcon}
                />
                {contract.Status}
              </Badge>
            </View>

            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
                  <MaterialCommunityIcons name="dots-vertical" size={20} color="#64748B" />
                </TouchableOpacity>
              }
            >
              {getMenuItems().map((item, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => {
                    setMenuVisible(false)
                    onAction(item.action, contract)
                  }}
                  title={item.title}
                  leadingIcon={item.icon}
                />
              ))}
            </Menu>
          </View>

          {/* Resident Info */}
          <View style={styles.residentSection}>
            <View style={styles.residentInfo}>
              <Text style={styles.residentName}>{contract.ResidentName}</Text>
              <Text style={styles.residentPhone}>{contract.ResidentPhone}</Text>
            </View>
            <View style={styles.apartmentInfo}>
              <Text style={styles.apartmentNumber}>Apt {contract.ApartmentID}</Text>
              <Text style={styles.apartmentDetails}>
                {contract.ApartmentType} • Floor {contract.Floor} • {contract.Building}
              </Text>
            </View>
          </View>

          {/* Contract Details */}
          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <MaterialCommunityIcons name="calendar-start" size={16} color="#64748B" />
                <Text style={styles.detailLabel}>Start Date</Text>
                <Text style={styles.detailValue}>{formatDate(contract.StartDate)}</Text>
              </View>
              <View style={styles.detailItem}>
                <MaterialCommunityIcons name="calendar-end" size={16} color="#64748B" />
                <Text style={styles.detailLabel}>End Date</Text>
                <Text style={styles.detailValue}>{formatDate(contract.EndDate)}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <MaterialCommunityIcons name="currency-usd" size={16} color="#64748B" />
                <Text style={styles.detailLabel}>Monthly Rent</Text>
                <Text style={styles.rentValue}>{formatCurrency(contract.MonthlyRent)}</Text>
              </View>
              <View style={styles.detailItem}>
                <MaterialCommunityIcons name="shield-check" size={16} color="#64748B" />
                <Text style={styles.detailLabel}>Deposit</Text>
                <Text style={styles.detailValue}>{formatCurrency(contract.DepositAmount)}</Text>
              </View>
            </View>
          </View>

          {/* Expiry Status */}
          <View style={styles.expirySection}>
            <View style={styles.expiryInfo}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={16}
                color={contract.DaysUntilExpiry <= 30 ? "#F59E0B" : "#64748B"}
              />
              <Text style={[styles.expiryText, { color: contract.DaysUntilExpiry <= 30 ? "#F59E0B" : "#64748B" }]}>
                {getDaysText(contract.DaysUntilExpiry)}
              </Text>
            </View>
            {contract.ExtendedTime && (
              <View style={styles.extensionInfo}>
                <MaterialCommunityIcons name="calendar-plus" size={14} color="#3B82F6" />
                <Text style={styles.extensionText}>Extended to {formatDate(contract.ExtendedTime)}</Text>
              </View>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contractId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusIcon: {
    marginRight: 4,
  },
  menuButton: {
    padding: 4,
  },
  residentSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  residentInfo: {
    flex: 1,
  },
  residentName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  residentPhone: {
    fontSize: 14,
    color: "#64748B",
  },
  apartmentInfo: {
    alignItems: "flex-end",
  },
  apartmentNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
    marginBottom: 4,
  },
  apartmentDetails: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "right",
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: "#64748B",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },
  rentValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10B981",
  },
  expirySection: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 16,
  },
  expiryInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  expiryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  extensionInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  extensionText: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "500",
  },
})

export default ContractCard
