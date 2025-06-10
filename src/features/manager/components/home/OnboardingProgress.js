import { memo } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Card, ProgressBar } from "react-native-paper"

const OnboardingProgress = memo(({ data }) => {
  const progressValue = data.percentage / 100

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Resident Onboarding Progress</Text>
      <Card style={styles.progressCard} mode="elevated">
        <Card.Content style={styles.cardContent}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressPercentage}>{data.percentage}%</Text>
          </View>

          <ProgressBar progress={progressValue} color="#3B82F6" style={styles.progressBar} />

          <View style={styles.progressFooter}>
            <Text style={styles.progressText}>
              {data.completed} / {data.total} completed
            </Text>
            <Text style={styles.progressSubtext}>Overall resident onboarding completion</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardContent: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  progressHeader: {
    marginBottom: 20,
  },
  progressPercentage: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#3B82F6",
    textAlign: "center",
  },
  progressBar: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    marginBottom: 20,
  },
  progressFooter: {
    alignItems: "center",
  },
  progressText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  progressSubtext: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
})

export default OnboardingProgress
