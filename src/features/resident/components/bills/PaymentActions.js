import { memo } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { Card, Text, Button } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const PaymentActions = memo(({ billData, onPayNow }) => {
  const isPaid = billData.Status === "Paid"
  const isOverdue = new Date(billData.DueDate) < new Date() && !isPaid

  const handleSchedulePayment = () => {
    Alert.alert("Schedule Payment", "Choose when you want to make this payment", [
      { text: "Cancel", style: "cancel" },
      { text: "Schedule", onPress: () => {} },
    ])
  }

  const handleDownloadPDF = () => {
    Alert.alert("Download", "Bill PDF will be downloaded")
  }

  if (isPaid) {
    return (
      <Card style={[styles.card, styles.paidCard]} mode="elevated">
        <Card.Content style={styles.content}>
          <View style={styles.paidSection}>
            <MaterialCommunityIcons name="check-circle" size={32} color="#059669" />
            <View style={styles.paidInfo}>
              <Text style={styles.paidTitle}>Payment Completed</Text>
              <Text style={styles.paidSubtitle}>This bill has been fully paid</Text>
            </View>
          </View>
          <Button
            mode="outlined"
            style={styles.downloadButton}
            labelStyle={styles.downloadButtonLabel}
            onPress={handleDownloadPDF}
            icon="download"
          >
            Download Receipt
          </Button>
        </Card.Content>
      </Card>
    )
  }

  return (
    <Card style={[styles.card, isOverdue && styles.overdueCard]} mode="elevated">
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Payment Options</Text>
          {isOverdue && (
            <View style={styles.overdueBadge}>
              <MaterialCommunityIcons name="alert" size={16} color="#DC2626" />
              <Text style={styles.overdueText}>Overdue</Text>
            </View>
          )}
        </View>

        <View style={styles.amountDue}>
          <Text style={styles.amountLabel}>Amount Due</Text>
          <Text style={styles.amountValue}>${billData.Total?.toFixed(2)}</Text>
        </View>

        <View style={styles.buttonGroup}>
          <Button
            mode="contained"
            buttonColor="#2563EB"
            style={styles.payButton}
            labelStyle={styles.payButtonLabel}
            onPress={onPayNow}
            icon="credit-card"
          >
            Pay Now
          </Button>

          <Button
            mode="outlined"
            style={styles.scheduleButton}
            labelStyle={styles.scheduleButtonLabel}
            onPress={handleSchedulePayment}
            icon="calendar"
          >
            Schedule Payment
          </Button>
        </View>

        {isOverdue && (
          <View style={styles.overdueWarning}>
            <MaterialCommunityIcons name="information" size={16} color="#DC2626" />
            <Text style={styles.warningText}>Late fees may apply for overdue payments</Text>
          </View>
        )}
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
  paidCard: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#059669",
  },
  overdueCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#DC2626",
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
  },
  overdueBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  overdueText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#DC2626",
  },
  amountDue: {
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
  },
  buttonGroup: {
    gap: 12,
  },
  payButton: {
    borderRadius: 12,
    paddingVertical: 4,
  },
  payButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  scheduleButton: {
    borderRadius: 12,
    borderColor: "#2563EB",
  },
  scheduleButtonLabel: {
    color: "#2563EB",
    fontWeight: "500",
  },
  paidSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  paidInfo: {
    flex: 1,
  },
  paidTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#059669",
    marginBottom: 4,
  },
  paidSubtitle: {
    fontSize: 14,
    color: "#065F46",
  },
  downloadButton: {
    borderColor: "#059669",
    borderRadius: 12,
  },
  downloadButtonLabel: {
    color: "#059669",
    fontWeight: "500",
  },
  overdueWarning: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    padding: 12,
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
  },
  warningText: {
    fontSize: 13,
    color: "#DC2626",
    flex: 1,
  },
})

export default PaymentActions
