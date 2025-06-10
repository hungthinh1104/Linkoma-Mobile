import { memo } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

const PropertyPerformance = memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Property Performance</Text>
      </View>

      <Card style={styles.performanceCard} mode="elevated">
        <Card.Content style={styles.cardContent}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Monthly Occupancy Trends</Text>
            <View style={styles.periodSelector}>
              <MaterialCommunityIcons name="calendar" size={16} color="#64748B" />
              <Text style={styles.periodText}>Last 30 Days</Text>
            </View>
          </View>

          {/* Chart Placeholder */}
          <View style={styles.chartContainer}>
            <View style={styles.yAxis}>
              <Text style={styles.axisLabel}>100</Text>
              <Text style={styles.axisLabel}>95</Text>
              <Text style={styles.axisLabel}>90</Text>
              <Text style={styles.axisLabel}>85</Text>
              <Text style={styles.axisLabel}>80</Text>
            </View>

            <View style={styles.chartArea}>
              {/* Simulated chart lines */}
              <View style={styles.chartLine}>
                <View style={[styles.dataPoint, { left: "10%", bottom: "75%" }]} />
                <View style={[styles.dataPoint, { left: "25%", bottom: "80%" }]} />
                <View style={[styles.dataPoint, { left: "40%", bottom: "85%" }]} />
                <View style={[styles.dataPoint, { left: "55%", bottom: "82%" }]} />
                <View style={[styles.dataPoint, { left: "70%", bottom: "88%" }]} />
                <View style={[styles.dataPoint, { left: "85%", bottom: "92%" }]} />
              </View>

              {/* Grid lines */}
              <View style={styles.gridLines}>
                {[...Array(5)].map((_, i) => (
                  <View key={i} style={[styles.gridLine, { bottom: `${20 + i * 20}%` }]} />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.xAxis}>
            <Text style={styles.axisLabel}>Jan</Text>
            <Text style={styles.axisLabel}>Feb</Text>
            <Text style={styles.axisLabel}>Mar</Text>
            <Text style={styles.axisLabel}>Apr</Text>
            <Text style={styles.axisLabel}>May</Text>
            <Text style={styles.axisLabel}>Jun</Text>
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
  header: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  performanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  periodSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  periodText: {
    fontSize: 12,
    color: "#64748B",
  },
  chartContainer: {
    flexDirection: "row",
    height: 120,
    marginBottom: 12,
  },
  yAxis: {
    width: 30,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 8,
  },
  chartArea: {
    flex: 1,
    position: "relative",
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
  },
  chartLine: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  dataPoint: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3B82F6",
  },
  gridLines: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gridLine: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  xAxis: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 30,
  },
  axisLabel: {
    fontSize: 12,
    color: "#64748B",
  },
})

export default PropertyPerformance
