"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, StatusBar, Alert, RefreshControl } from "react-native"
import { Text, IconButton, Menu, FAB } from "react-native-paper"
import { useNavigation, useRoute } from "@react-navigation/native"
import ContractHeader from "../components/contracts/ContractHeader"
import ResidentInfo from "../components/contracts/ResidentInfo"
import ApartmentDetails from "../components/contracts/ApartmentDetails"
import ContractTerms from "../components/contracts/ContractTerms"
import FinancialInfo from "../components/contracts/FinancialInfo"
import PaymentHistory from "../components/contracts/PaymentHistory"
import ContractDocuments from "../components/contracts/ContractDocuments"
import ContractTimeline from "../components/contracts/ContractTimeline"

const ContractDetailScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { contractData } = route.params

  const [refreshing, setRefreshing] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [fabOpen, setFabOpen] = useState(false)
  const [contractDetails, setContractDetails] = useState(null)

  // Enhanced contract data with additional details
  const [enhancedContract, setEnhancedContract] = useState({
    ...contractData,
    // Additional resident details
    residentDetails: {
      CitizenID: "079201001234",
      Email: "nguyenvananh@gmail.com",
      EmergencyContact: "Nguyễn Thị Lan - 0987654321",
      Occupation: "Software Engineer",
      Company: "Tech Solutions Ltd",
    },
    // Payment history
    paymentHistory: [
      {
        id: 1,
        month: "November 2023",
        amount: 12000000,
        dueDate: "2023-11-01",
        paidDate: "2023-10-28",
        status: "Paid",
        method: "Bank Transfer",
      },
      {
        id: 2,
        month: "October 2023",
        amount: 12000000,
        dueDate: "2023-10-01",
        paidDate: "2023-09-30",
        status: "Paid",
        method: "Bank Transfer",
      },
      {
        id: 3,
        month: "September 2023",
        amount: 12000000,
        dueDate: "2023-09-01",
        paidDate: "2023-09-02",
        status: "Late",
        method: "Cash",
        lateFee: 500000,
      },
    ],
    // Contract documents
    documents: [
      {
        id: 1,
        name: "Lease Agreement",
        type: "PDF",
        size: "2.5 MB",
        uploadDate: "2023-05-20",
        url: "contract_201_lease.pdf",
      },
      {
        id: 2,
        name: "Resident ID Copy",
        type: "PDF",
        size: "1.2 MB",
        uploadDate: "2023-05-18",
        url: "contract_201_id.pdf",
      },
      {
        id: 3,
        name: "Income Certificate",
        type: "PDF",
        size: "800 KB",
        uploadDate: "2023-05-18",
        url: "contract_201_income.pdf",
      },
    ],
    // Contract timeline
    timeline: [
      {
        id: 1,
        date: "2023-05-20",
        title: "Contract Signed",
        description: "Initial lease agreement signed by both parties",
        type: "contract",
        icon: "file-sign",
      },
      {
        id: 2,
        date: "2023-06-01",
        title: "Move-in Date",
        description: "Resident moved into apartment 301",
        type: "move",
        icon: "home-import-outline",
      },
      {
        id: 3,
        date: "2023-12-15",
        title: "Contract Extended",
        description: "Contract extended until June 2025",
        type: "extension",
        icon: "calendar-plus",
      },
      {
        id: 4,
        date: "2024-01-10",
        title: "Rent Adjustment",
        description: "Monthly rent adjusted to current market rate",
        type: "adjustment",
        icon: "currency-usd",
      },
    ],
  })

  useEffect(() => {
    loadContractDetails()
  }, [])

  const loadContractDetails = async () => {
    // Simulate API call to load additional contract details
    setContractDetails(enhancedContract)
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadContractDetails()
    setRefreshing(false)
  }

  const handleMenuAction = (action) => {
    setMenuVisible(false)

    switch (action) {
      case "edit":
        navigation.navigate("EditContract", { contractData: enhancedContract })
        break
      case "renew":
        handleRenewContract()
        break
      case "terminate":
        handleTerminateContract()
        break
      case "duplicate":
        handleDuplicateContract()
        break
      case "export":
        handleExportContract()
        break
      default:
        break
    }
  }

  const handleRenewContract = () => {
    Alert.alert("Renew Contract", `Start renewal process for ${enhancedContract.ResidentName}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Start Renewal",
        onPress: () => {
          navigation.navigate("RenewContract", { contractData: enhancedContract })
        },
      },
    ])
  }

  const handleTerminateContract = () => {
    Alert.alert(
      "Terminate Contract",
      `Are you sure you want to terminate this contract? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Terminate",
          style: "destructive",
          onPress: () => {
            Alert.alert("Success", "Contract termination process initiated")
            navigation.goBack()
          },
        },
      ],
    )
  }

  const handleDuplicateContract = () => {
    Alert.alert("Duplicate Contract", "Create a new contract based on this template?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Create",
        onPress: () => {
          navigation.navigate("CreateContract", { templateData: enhancedContract })
        },
      },
    ])
  }

  const handleExportContract = () => {
    Alert.alert("Export Contract", "Contract PDF will be generated and shared")
  }

  const fabActions = [
    {
      icon: "pencil",
      label: "Edit Contract",
      onPress: () => handleMenuAction("edit"),
      color: "#3B82F6",
    },
    {
      icon: "refresh",
      label: "Renew Contract",
      onPress: () => handleMenuAction("renew"),
      color: "#10B981",
    },
    {
      icon: "share-variant",
      label: "Share Contract",
      onPress: () => handleMenuAction("export"),
      color: "#8B5CF6",
    },
  ]

  if (!contractDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading contract details...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Contract Details</Text>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<IconButton icon="dots-vertical" size={24} onPress={() => setMenuVisible(true)} />}
        >
          <Menu.Item onPress={() => handleMenuAction("edit")} title="Edit Contract" leadingIcon="pencil" />
          <Menu.Item onPress={() => handleMenuAction("renew")} title="Renew Contract" leadingIcon="refresh" />
          <Menu.Item
            onPress={() => handleMenuAction("duplicate")}
            title="Duplicate Contract"
            leadingIcon="content-copy"
          />
          <Menu.Item onPress={() => handleMenuAction("export")} title="Export PDF" leadingIcon="download" />
          <Menu.Item
            onPress={() => handleMenuAction("terminate")}
            title="Terminate Contract"
            leadingIcon="close-circle"
            titleStyle={{ color: "#EF4444" }}
          />
        </Menu>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Contract Header */}
        <ContractHeader contract={contractDetails} />

        {/* Resident Information */}
        <ResidentInfo contract={contractDetails} />

        {/* Apartment Details */}
        <ApartmentDetails contract={contractDetails} />

        {/* Contract Terms */}
        <ContractTerms contract={contractDetails} />

        {/* Financial Information */}
        <FinancialInfo contract={contractDetails} />

        {/* Payment History */}
        <PaymentHistory payments={contractDetails.paymentHistory} />

        {/* Contract Documents */}
        <ContractDocuments documents={contractDetails.documents} />

        {/* Contract Timeline */}
        <ContractTimeline timeline={contractDetails.timeline} />
      </ScrollView>

      {/* Floating Action Button */}
      <FAB.Group
        open={fabOpen}
        visible
        icon={fabOpen ? "close" : "cog"}
        actions={fabActions}
        onStateChange={({ open }) => setFabOpen(open)}
        fabStyle={styles.fab}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: StatusBar.currentHeight + 8,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    flex: 1,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  fab: {
    backgroundColor: "#3B82F6",
  },
})

export default ContractDetailScreen
