"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert, RefreshControl } from "react-native"
import { Text, Searchbar, Menu } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import ContractCard from "../components/contracts/ContractCard"
import ContractFilters from "../components/contracts/ContractFilters"
import ContractStats from "../components/contracts/ContractStats"

const ContractListScreen = () => {
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [sortMenuVisible, setSortMenuVisible] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [sortBy, setSortBy] = useState("dueDate")

  // Mock contract data
  const [contracts, setContracts] = useState([
    {
      ContractID: 201,
      ApartmentID: 301,
      ResidentName: "Nguyễn Văn Anh",
      ResidentPhone: "0912345678",
      StartDate: "2023-06-01",
      EndDate: "2024-06-01",
      ExtendedTime: "2025-06-01",
      DepositAmount: 24000000,
      MonthlyRent: 12000000,
      Status: "Active",
      PaymentCycle: "Monthly",
      SignatureDate: "2023-05-20",
      DaysUntilExpiry: 45,
      ApartmentType: "Premium 2-Bedroom",
      Floor: 3,
      Building: "Tower A",
    },
    {
      ContractID: 202,
      ApartmentID: 205,
      ResidentName: "Trần Thị Lan",
      ResidentPhone: "0987654321",
      StartDate: "2023-01-15",
      EndDate: "2024-01-15",
      ExtendedTime: null,
      DepositAmount: 18000000,
      MonthlyRent: 9000000,
      Status: "Expiring Soon",
      PaymentCycle: "Monthly",
      SignatureDate: "2023-01-10",
      DaysUntilExpiry: 15,
      ApartmentType: "Standard 1-Bedroom",
      Floor: 2,
      Building: "Tower A",
    },
    {
      ContractID: 203,
      ApartmentID: 412,
      ResidentName: "Lê Văn Nam",
      ResidentPhone: "0901234567",
      StartDate: "2022-08-01",
      EndDate: "2023-08-01",
      ExtendedTime: "2024-08-01",
      DepositAmount: 30000000,
      MonthlyRent: 15000000,
      Status: "Expired",
      PaymentCycle: "Monthly",
      SignatureDate: "2022-07-25",
      DaysUntilExpiry: -30,
      ApartmentType: "Luxury 3-Bedroom",
      Floor: 4,
      Building: "Tower B",
    },
    {
      ContractID: 204,
      ApartmentID: 108,
      ResidentName: "Phạm Thị Mai",
      ResidentPhone: "0934567890",
      StartDate: "2023-09-01",
      EndDate: "2024-09-01",
      ExtendedTime: null,
      DepositAmount: 20000000,
      MonthlyRent: 10000000,
      Status: "Active",
      PaymentCycle: "Monthly",
      SignatureDate: "2023-08-25",
      DaysUntilExpiry: 120,
      ApartmentType: "Standard 2-Bedroom",
      Floor: 1,
      Building: "Tower A",
    },
    {
      ContractID: 205,
      ApartmentID: 506,
      ResidentName: "Hoàng Văn Đức",
      ResidentPhone: "0945678901",
      StartDate: "2023-03-01",
      EndDate: "2024-03-01",
      ExtendedTime: "2025-03-01",
      DepositAmount: 22000000,
      MonthlyRent: 11000000,
      Status: "Renewed",
      PaymentCycle: "Monthly",
      SignatureDate: "2023-02-20",
      DaysUntilExpiry: 365,
      ApartmentType: "Premium 2-Bedroom",
      Floor: 5,
      Building: "Tower B",
    },
  ])

  const [filteredContracts, setFilteredContracts] = useState(contracts)

  // Contract statistics
  const contractStats = {
    total: contracts.length,
    active: contracts.filter((c) => c.Status === "Active").length,
    expiringSoon: contracts.filter((c) => c.Status === "Expiring Soon").length,
    expired: contracts.filter((c) => c.Status === "Expired").length,
    renewed: contracts.filter((c) => c.Status === "Renewed").length,
  }

  useEffect(() => {
    filterAndSortContracts()
  }, [searchQuery, selectedFilter, sortBy, contracts])

  const filterAndSortContracts = () => {
    let filtered = contracts

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (contract) =>
          contract.ResidentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contract.ApartmentID.toString().includes(searchQuery) ||
          contract.ContractID.toString().includes(searchQuery),
      )
    }

    // Apply status filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter((contract) => contract.Status.toLowerCase().replace(" ", "_") === selectedFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return a.DaysUntilExpiry - b.DaysUntilExpiry
        case "apartment":
          return a.ApartmentID - b.ApartmentID
        case "resident":
          return a.ResidentName.localeCompare(b.ResidentName)
        case "rent":
          return b.MonthlyRent - a.MonthlyRent
        default:
          return 0
      }
    })

    setFilteredContracts(filtered)
  }

  const onRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const handleContractPress = (contract) => {
    navigation.navigate('ContractDetail', { contractData: contract });
  }

  const handleContractAction = (action, contract) => {
    switch (action) {
      case "renew":
        Alert.alert("Renew Contract", `Renew contract for ${contract.ResidentName}?`, [
          { text: "Cancel", style: "cancel" },
          { text: "Renew", onPress: () => Alert.alert("Success", "Contract renewal initiated") },
        ])
        break
      case "terminate":
        Alert.alert("Terminate Contract", `Terminate contract for ${contract.ResidentName}?`, [
          { text: "Cancel", style: "cancel" },
          {
            text: "Terminate",
            style: "destructive",
            onPress: () => Alert.alert("Success", "Contract termination initiated"),
          },
        ])
        break
      case "edit":
        navigation.navigate("EditContract", { contractData: contract })
        break
      case "view":
        handleContractPress(contract)
        break
      default:
        break
    }
  }

  const sortOptions = [
    { label: "Due Date", value: "dueDate" },
    { label: "Apartment", value: "apartment" },
    { label: "Resident Name", value: "resident" },
    { label: "Monthly Rent", value: "rent" },
  ]

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contract Management</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("CreateContract")}>
          <MaterialCommunityIcons name="plus" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchSection}>
        <Searchbar
          placeholder="Search contracts, residents, apartments..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
        />

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterButton, showFilters && styles.filterButtonActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <MaterialCommunityIcons name="filter-variant" size={20} color={showFilters ? "#FFFFFF" : "#64748B"} />
            <Text style={[styles.filterButtonText, showFilters && styles.filterButtonTextActive]}>Filters</Text>
          </TouchableOpacity>

          <Menu
            visible={sortMenuVisible}
            onDismiss={() => setSortMenuVisible(false)}
            anchor={
              <TouchableOpacity style={styles.sortButton} onPress={() => setSortMenuVisible(true)}>
                <MaterialCommunityIcons name="sort" size={20} color="#64748B" />
                <Text style={styles.sortButtonText}>Sort</Text>
                <MaterialCommunityIcons name="chevron-down" size={16} color="#64748B" />
              </TouchableOpacity>
            }
          >
            {sortOptions.map((option) => (
              <Menu.Item
                key={option.value}
                onPress={() => {
                  setSortBy(option.value)
                  setSortMenuVisible(false)
                }}
                title={option.label}
                leadingIcon={sortBy === option.value ? "check" : undefined}
              />
            ))}
          </Menu>
        </View>
      </View>

      {/* Contract Statistics */}
      <ContractStats stats={contractStats} />

      {/* Filters */}
      {showFilters && <ContractFilters selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />}

      {/* Contract List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.contractList}>
          {filteredContracts.length > 0 ? (
            filteredContracts.map((contract) => (
              <ContractCard
                key={contract.ContractID}
                contract={contract}
                onPress={handleContractPress}
                onAction={handleContractAction}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="file-document-outline" size={64} color="#94A3B8" />
              <Text style={styles.emptyTitle}>No contracts found</Text>
              <Text style={styles.emptySubtitle}>Try adjusting your search or filter criteria</Text>
            </View>
          )}
        </View>
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
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight + 12,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  addButton: {
    padding: 4,
  },
  searchSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchBar: {
    backgroundColor: "#F8FAFC",
    elevation: 0,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchInput: {
    fontSize: 16,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: "#3B82F6",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    gap: 6,
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  scrollView: {
    flex: 1,
  },
  contractList: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
  },
})

export default ContractListScreen
