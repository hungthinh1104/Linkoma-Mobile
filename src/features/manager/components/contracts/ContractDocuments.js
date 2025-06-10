import { memo } from "react"
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { Text, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const ContractDocuments = memo(({ documents }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN")
  }

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "file-pdf-box"
      case "doc":
      case "docx":
        return "file-word-box"
      case "jpg":
      case "jpeg":
      case "png":
        return "file-image-box"
      default:
        return "file-document-box"
    }
  }

  const getFileColor = (type) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "#EF4444"
      case "doc":
      case "docx":
        return "#2563EB"
      case "jpg":
      case "jpeg":
      case "png":
        return "#059669"
      default:
        return "#64748B"
    }
  }

  const handleDocumentPress = (document) => {
    Alert.alert(document.name, "Choose an action for this document", [
      { text: "View", onPress: () => Alert.alert("View", `Opening ${document.name}`) },
      { text: "Download", onPress: () => Alert.alert("Download", `Downloading ${document.name}`) },
      { text: "Share", onPress: () => Alert.alert("Share", `Sharing ${document.name}`) },
      { text: "Cancel", style: "cancel" },
    ])
  }

  const handleAddDocument = () => {
    Alert.alert("Add Document", "Choose document source", [
      { text: "Camera", onPress: () => Alert.alert("Camera", "Camera would open") },
      { text: "Gallery", onPress: () => Alert.alert("Gallery", "Gallery would open") },
      { text: "Files", onPress: () => Alert.alert("Files", "File picker would open") },
      { text: "Cancel", style: "cancel" },
    ])
  }

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Contract Documents</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddDocument}>
            <MaterialCommunityIcons name="plus" size={20} color="#3B82F6" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.documentList}>
          {documents.map((document) => (
            <TouchableOpacity
              key={document.id}
              style={styles.documentItem}
              onPress={() => handleDocumentPress(document)}
              activeOpacity={0.7}
            >
              <View style={styles.documentLeft}>
                <View style={[styles.fileIcon, { backgroundColor: `${getFileColor(document.type)}15` }]}>
                  <MaterialCommunityIcons
                    name={getFileIcon(document.type)}
                    size={24}
                    color={getFileColor(document.type)}
                  />
                </View>
                <View style={styles.documentInfo}>
                  <Text style={styles.documentName}>{document.name}</Text>
                  <Text style={styles.documentDetails}>
                    {document.type.toUpperCase()} • {document.size} • {formatDate(document.uploadDate)}
                  </Text>
                </View>
              </View>

              <View style={styles.documentActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialCommunityIcons name="download" size={16} color="#64748B" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialCommunityIcons name="share-variant" size={16} color="#64748B" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialCommunityIcons name="dots-vertical" size={16} color="#64748B" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Document Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.categoriesTitle}>Document Categories</Text>
          <View style={styles.categoriesList}>
            <View style={styles.categoryChip}>
              <MaterialCommunityIcons name="file-document" size={16} color="#3B82F6" />
              <Text style={styles.categoryText}>
                Contracts ({documents.filter((d) => d.name.includes("Agreement")).length})
              </Text>
            </View>
            <View style={styles.categoryChip}>
              <MaterialCommunityIcons name="card-account-details" size={16} color="#10B981" />
              <Text style={styles.categoryText}>
                Identity ({documents.filter((d) => d.name.includes("ID")).length})
              </Text>
            </View>
            <View style={styles.categoryChip}>
              <MaterialCommunityIcons name="certificate" size={16} color="#F59E0B" />
              <Text style={styles.categoryText}>
                Certificates ({documents.filter((d) => d.name.includes("Certificate")).length})
              </Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  addButtonText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "500",
  },
  documentList: {
    gap: 12,
    marginBottom: 20,
  },
  documentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
  },
  documentLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  documentDetails: {
    fontSize: 12,
    color: "#64748B",
  },
  documentActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  categoriesSection: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 16,
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  categoriesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  categoryText: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "500",
  },
})

export default ContractDocuments
