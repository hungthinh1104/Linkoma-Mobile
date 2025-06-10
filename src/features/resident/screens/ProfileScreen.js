"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert, Dimensions } from "react-native"
import { Text, Button, Card, Avatar, Divider, Badge } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const { width } = Dimensions.get("window")

const ProfileScreen = () => {
  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState("personal")
  const [showFullContract, setShowFullContract] = useState(false)

  // Mock data based on the provided database schema
  const [residentData, setResidentData] = useState({
    ResidentID: 101,
    Name: "Nguyễn Văn Anh",
    PhoneNumber: "0912345678",
    Email: "nguyenvananh@gmail.com",
    CitizenID: "079201001234",
    Address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    ApartmentID: 301,
    JoinDate: "2022-05-15",
    ProfileImage: null,
  })

  const [apartmentData, setApartmentData] = useState({
    ApartmentID: 301,
    ApartmentTypeID: 2,
    Floor: 3,
    Status: "Occupied",
    ApartmentType: {
      TypeName: "Premium 2-Bedroom",
      Area: 75.5,
      NumBedrooms: 2,
      NumBathrooms: 2,
      RentFee: 12000000,
      Description: "Căn hộ cao cấp 2 phòng ngủ với view thành phố",
    },
  })

  const [contractData, setContractData] = useState({
    ContractID: 201,
    ApartmentID: 301,
    ResidentID: 101,
    StartDate: "2022-06-01",
    EndDate: "2023-06-01",
    ExtendedTime: "2024-06-01",
    DepositAmount: 24000000,
    ContractTerms: "Hợp đồng thuê căn hộ 1 năm với điều khoản gia hạn",
    ContractFile: "contract_201.pdf",
    PaymentCycle: "Monthly",
    SignatureDate: "2022-05-20",
  })

  const [parkingData, setParkingData] = useState([
    {
      ParkingID: 150,
      ResidentID: 101,
      VehicleType: "Car",
      LicensePlate: "51F-12345",
      ParkingSlot: "B2-45",
      MonthlyFee: 1200000,
    },
    {
      ParkingID: 151,
      ResidentID: 101,
      VehicleType: "Motorbike",
      LicensePlate: "59P2-34567",
      ParkingSlot: "M1-78",
      MonthlyFee: 200000,
    },
  ])

  const [accountData, setAccountData] = useState({
    UserID: 501,
    ResidentID: 101,
    Username: "nguyenvananh",
    Role: "Resident",
    LastLogin: "2023-05-10 08:45:22",
    AccountStatus: "Active",
    TwoFactorEnabled: true,
    NotificationsEnabled: true,
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN")
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "This would open the profile editing screen")
  }

  const handleViewContract = () => {
    setShowFullContract(true)
  }

  const handleDownloadContract = () => {
    Alert.alert("Download Contract", "Contract PDF would be downloaded to your device")
  }

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => Alert.alert("Logged Out", "You have been logged out") },
    ])
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <View style={styles.tabContent}>
            <Card style={styles.infoCard}>
              <Card.Content>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Họ và tên</Text>
                  <Text style={styles.infoValue}>{residentData.Name}</Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Số điện thoại</Text>
                  <Text style={styles.infoValue}>{residentData.PhoneNumber}</Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{residentData.Email}</Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>CCCD/CMND</Text>
                  <Text style={styles.infoValue}>{residentData.CitizenID}</Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Địa chỉ thường trú</Text>
                  <Text style={styles.infoValue}>{residentData.Address}</Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Ngày đăng ký</Text>
                  <Text style={styles.infoValue}>{formatDate(residentData.JoinDate)}</Text>
                </View>
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button mode="contained" buttonColor="#3B82F6" style={styles.actionButton} onPress={handleEditProfile}>
                  Chỉnh sửa thông tin
                </Button>
              </Card.Actions>
            </Card>
          </View>
        )

      case "apartment":
        return (
          <View style={styles.tabContent}>
            <Card style={styles.infoCard}>
              <Card.Content>
                <View style={styles.apartmentHeader}>
                  <View>
                    <Text style={styles.apartmentNumber}>Căn hộ {apartmentData.ApartmentID}</Text>
                    <Text style={styles.apartmentType}>{apartmentData.ApartmentType.TypeName}</Text>
                  </View>
                  <Badge style={styles.statusBadge}>{apartmentData.Status}</Badge>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.apartmentDetails}>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="floor-plan" size={20} color="#3B82F6" />
                    <Text style={styles.detailValue}>{apartmentData.ApartmentType.Area} m²</Text>
                    <Text style={styles.detailLabel}>Diện tích</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="bed" size={20} color="#3B82F6" />
                    <Text style={styles.detailValue}>{apartmentData.ApartmentType.NumBedrooms}</Text>
                    <Text style={styles.detailLabel}>Phòng ngủ</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="shower" size={20} color="#3B82F6" />
                    <Text style={styles.detailValue}>{apartmentData.ApartmentType.NumBathrooms}</Text>
                    <Text style={styles.detailLabel}>Phòng tắm</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="elevator" size={20} color="#3B82F6" />
                    <Text style={styles.detailValue}>{apartmentData.Floor}</Text>
                    <Text style={styles.detailLabel}>Tầng</Text>
                  </View>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Giá thuê hàng tháng</Text>
                  <Text style={styles.rentValue}>{formatCurrency(apartmentData.ApartmentType.RentFee)}</Text>
                </View>

                <Divider style={styles.divider} />

                <Text style={styles.descriptionLabel}>Mô tả</Text>
                <Text style={styles.descriptionText}>{apartmentData.ApartmentType.Description}</Text>
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button
                  mode="outlined"
                  style={styles.outlinedButton}
                  onPress={() => navigation.navigate("MaintenanceRequest")}
                >
                  Yêu cầu bảo trì
                </Button>
                <Button
                  mode="contained"
                  buttonColor="#3B82F6"
                  style={styles.actionButton}
                  onPress={() => navigation.navigate("ApartmentDetails")}
                >
                  Xem chi tiết
                </Button>
              </Card.Actions>
            </Card>
          </View>
        )

      case "contract":
        return (
          <View style={styles.tabContent}>
            {showFullContract ? (
              <Card style={styles.contractCard}>
                <Card.Content>
                  <View style={styles.contractHeader}>
                    <Text style={styles.contractTitle}>HỢP ĐỒNG THUÊ CĂN HỘ</Text>
                    <Text style={styles.contractId}>Mã hợp đồng: #{contractData.ContractID}</Text>
                  </View>

                  <View style={styles.contractSection}>
                    <Text style={styles.sectionTitle}>THÔNG TIN CÁC BÊN</Text>
                    <View style={styles.contractParties}>
                      <View style={styles.partyInfo}>
                        <Text style={styles.partyTitle}>BÊN CHO THUÊ (BÊN A)</Text>
                        <Text style={styles.partyText}>Công ty TNHH Quản lý Chung cư ABC</Text>
                        <Text style={styles.partyText}>Địa chỉ: 456 Nguyễn Trãi, Quận 5, TP.HCM</Text>
                        <Text style={styles.partyText}>Đại diện: Ông Trần Văn Bình</Text>
                        <Text style={styles.partyText}>Chức vụ: Giám đốc</Text>
                      </View>

                      <View style={styles.partyInfo}>
                        <Text style={styles.partyTitle}>BÊN THUÊ (BÊN B)</Text>
                        <Text style={styles.partyText}>Họ và tên: {residentData.Name}</Text>
                        <Text style={styles.partyText}>CCCD/CMND: {residentData.CitizenID}</Text>
                        <Text style={styles.partyText}>Địa chỉ: {residentData.Address}</Text>
                        <Text style={styles.partyText}>Điện thoại: {residentData.PhoneNumber}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.contractSection}>
                    <Text style={styles.sectionTitle}>THÔNG TIN CĂN HỘ</Text>
                    <Text style={styles.contractText}>
                      Căn hộ số: {apartmentData.ApartmentID}, Tầng {apartmentData.Floor}
                    </Text>
                    <Text style={styles.contractText}>Loại căn hộ: {apartmentData.ApartmentType.TypeName}</Text>
                    <Text style={styles.contractText}>Diện tích: {apartmentData.ApartmentType.Area} m²</Text>
                    <Text style={styles.contractText}>
                      Số phòng ngủ: {apartmentData.ApartmentType.NumBedrooms}, Số phòng tắm:{" "}
                      {apartmentData.ApartmentType.NumBathrooms}
                    </Text>
                  </View>

                  <View style={styles.contractSection}>
                    <Text style={styles.sectionTitle}>THỜI HẠN HỢP ĐỒNG</Text>
                    <Text style={styles.contractText}>Ngày bắt đầu: {formatDate(contractData.StartDate)}</Text>
                    <Text style={styles.contractText}>Ngày kết thúc: {formatDate(contractData.EndDate)}</Text>
                    <Text style={styles.contractText}>Gia hạn đến: {formatDate(contractData.ExtendedTime)}</Text>
                    <Text style={styles.contractText}>Chu kỳ thanh toán: {contractData.PaymentCycle}</Text>
                  </View>

                  <View style={styles.contractSection}>
                    <Text style={styles.sectionTitle}>GIÁ TRỊ HỢP ĐỒNG</Text>
                    <Text style={styles.contractText}>
                      Giá thuê hàng tháng: {formatCurrency(apartmentData.ApartmentType.RentFee)}
                    </Text>
                    <Text style={styles.contractText}>Tiền đặt cọc: {formatCurrency(contractData.DepositAmount)}</Text>
                  </View>

                  <View style={styles.contractSection}>
                    <Text style={styles.sectionTitle}>ĐIỀU KHOẢN VÀ ĐIỀU KIỆN</Text>
                    <Text style={styles.contractText}>{contractData.ContractTerms}</Text>
                    <Text style={styles.contractText}>
                      Chi tiết các điều khoản khác vui lòng xem trong bản hợp đồng đầy đủ.
                    </Text>
                  </View>

                  <View style={styles.signatureSection}>
                    <Text style={styles.signatureDate}>Ngày ký hợp đồng: {formatDate(contractData.SignatureDate)}</Text>
                    <View style={styles.signatures}>
                      <View style={styles.signatureBlock}>
                        <Text style={styles.signatureTitle}>BÊN CHO THUÊ</Text>
                        <View style={styles.signatureImage}>
                          <MaterialCommunityIcons name="draw" size={24} color="#64748B" />
                        </View>
                        <Text style={styles.signatureName}>Trần Văn Bình</Text>
                      </View>

                      <View style={styles.signatureBlock}>
                        <Text style={styles.signatureTitle}>BÊN THUÊ</Text>
                        <View style={styles.signatureImage}>
                          <MaterialCommunityIcons name="draw" size={24} color="#64748B" />
                        </View>
                        <Text style={styles.signatureName}>{residentData.Name}</Text>
                      </View>
                    </View>
                  </View>
                </Card.Content>
                <Card.Actions style={styles.cardActions}>
                  <Button
                    mode="outlined"
                    style={styles.outlinedButton}
                    onPress={() => setShowFullContract(false)}
                    icon="arrow-left"
                  >
                    Quay lại
                  </Button>
                  <Button
                    mode="contained"
                    buttonColor="#3B82F6"
                    style={styles.actionButton}
                    onPress={handleDownloadContract}
                    icon="download"
                  >
                    Tải PDF
                  </Button>
                </Card.Actions>
              </Card>
            ) : (
              <Card style={styles.infoCard}>
                <Card.Content>
                  <View style={styles.contractSummary}>
                    <View style={styles.contractIcon}>
                      <MaterialCommunityIcons name="file-document" size={32} color="#3B82F6" />
                    </View>
                    <View style={styles.contractInfo}>
                      <Text style={styles.contractNumber}>Hợp đồng #{contractData.ContractID}</Text>
                      <Text style={styles.contractApartment}>Căn hộ {contractData.ApartmentID}</Text>
                    </View>
                    <Badge style={styles.contractStatus}>Đang hiệu lực</Badge>
                  </View>

                  <Divider style={styles.divider} />

                  <View style={styles.contractDates}>
                    <View style={styles.dateItem}>
                      <Text style={styles.dateLabel}>Ngày bắt đầu</Text>
                      <Text style={styles.dateValue}>{formatDate(contractData.StartDate)}</Text>
                    </View>

                    <View style={styles.dateArrow}>
                      <MaterialCommunityIcons name="arrow-right" size={20} color="#64748B" />
                    </View>

                    <View style={styles.dateItem}>
                      <Text style={styles.dateLabel}>Ngày kết thúc</Text>
                      <Text style={styles.dateValue}>{formatDate(contractData.EndDate)}</Text>
                    </View>

                    <View style={styles.dateArrow}>
                      <MaterialCommunityIcons name="arrow-right" size={20} color="#64748B" />
                    </View>

                    <View style={styles.dateItem}>
                      <Text style={styles.dateLabel}>Gia hạn đến</Text>
                      <Text style={styles.dateValue}>{formatDate(contractData.ExtendedTime)}</Text>
                    </View>
                  </View>

                  <Divider style={styles.divider} />

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Giá thuê hàng tháng</Text>
                    <Text style={styles.rentValue}>{formatCurrency(apartmentData.ApartmentType.RentFee)}</Text>
                  </View>

                  <Divider style={styles.divider} />

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Tiền đặt cọc</Text>
                    <Text style={styles.infoValue}>{formatCurrency(contractData.DepositAmount)}</Text>
                  </View>

                  <Divider style={styles.divider} />

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Chu kỳ thanh toán</Text>
                    <Text style={styles.infoValue}>{contractData.PaymentCycle}</Text>
                  </View>

                  <Divider style={styles.divider} />

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Ngày ký hợp đồng</Text>
                    <Text style={styles.infoValue}>{formatDate(contractData.SignatureDate)}</Text>
                  </View>
                </Card.Content>
                <Card.Actions style={styles.cardActions}>
                  <Button
                    mode="outlined"
                    style={styles.outlinedButton}
                    onPress={() => navigation.navigate("RenewContract")}
                  >
                    Gia hạn hợp đồng
                  </Button>
                  <Button
                    mode="contained"
                    buttonColor="#3B82F6"
                    style={styles.actionButton}
                    onPress={handleViewContract}
                  >
                    Xem hợp đồng
                  </Button>
                </Card.Actions>
              </Card>
            )}
          </View>
        )

      case "vehicle":
        return (
          <View style={styles.tabContent}>
            <Card style={styles.infoCard}>
              <Card.Content>
                <Text style={styles.sectionTitle}>Phương tiện đã đăng ký</Text>

                {parkingData.map((vehicle, index) => (
                  <View key={vehicle.ParkingID}>
                    <View style={styles.vehicleItem}>
                      <View style={styles.vehicleIcon}>
                        <MaterialCommunityIcons
                          name={vehicle.VehicleType === "Car" ? "car" : "motorbike"}
                          size={24}
                          color="#3B82F6"
                        />
                      </View>
                      <View style={styles.vehicleInfo}>
                        <Text style={styles.vehicleType}>
                          {vehicle.VehicleType === "Car" ? "Ô tô" : "Xe máy"} - {vehicle.LicensePlate}
                        </Text>
                        <Text style={styles.vehicleDetails}>
                          Vị trí đỗ: {vehicle.ParkingSlot} | Phí: {formatCurrency(vehicle.MonthlyFee)}/tháng
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.editButton}>
                        <MaterialCommunityIcons name="pencil" size={20} color="#64748B" />
                      </TouchableOpacity>
                    </View>
                    {index < parkingData.length - 1 && <Divider style={styles.divider} />}
                  </View>
                ))}
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button
                  mode="contained"
                  buttonColor="#3B82F6"
                  style={styles.actionButton}
                  onPress={() => navigation.navigate("AddVehicle")}
                  icon="plus"
                >
                  Thêm phương tiện
                </Button>
              </Card.Actions>
            </Card>

            <Card style={[styles.infoCard, styles.parkingMapCard]}>
              <Card.Content>
                <Text style={styles.sectionTitle}>Sơ đồ bãi đỗ xe</Text>
                <View style={styles.parkingMap}>
                  <View style={styles.mapPlaceholder}>
                    <MaterialCommunityIcons name="map" size={40} color="#64748B" />
                    <Text style={styles.mapText}>Bản đồ bãi đỗ xe</Text>
                  </View>
                </View>
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button mode="outlined" style={styles.outlinedButton} onPress={() => navigation.navigate("ParkingMap")}>
                  Xem bản đồ chi tiết
                </Button>
              </Card.Actions>
            </Card>
          </View>
        )

      case "settings":
        return (
          <View style={styles.tabContent}>
            <Card style={styles.infoCard}>
              <Card.Content>
                <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Tên đăng nhập</Text>
                  <Text style={styles.infoValue}>{accountData.Username}</Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Vai trò</Text>
                  <Text style={styles.infoValue}>{accountData.Role}</Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Trạng thái</Text>
                  <Badge style={[styles.statusBadge, { backgroundColor: "#10B981" }]}>
                    {accountData.AccountStatus}
                  </Badge>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Đăng nhập gần nhất</Text>
                  <Text style={styles.infoValue}>{accountData.LastLogin}</Text>
                </View>
              </Card.Content>
            </Card>

            <Card style={styles.infoCard}>
              <Card.Content>
                <Text style={styles.sectionTitle}>Cài đặt bảo mật</Text>

                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingLabel}>Xác thực hai yếu tố</Text>
                    <Text style={styles.settingDescription}>Tăng cường bảo mật cho tài khoản của bạn</Text>
                  </View>
                  <TouchableOpacity style={styles.toggleButton}>
                    <MaterialCommunityIcons
                      name={accountData.TwoFactorEnabled ? "toggle-switch" : "toggle-switch-off"}
                      size={36}
                      color={accountData.TwoFactorEnabled ? "#3B82F6" : "#94A3B8"}
                    />
                  </TouchableOpacity>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingLabel}>Thông báo</Text>
                    <Text style={styles.settingDescription}>Nhận thông báo về cập nhật và tin tức</Text>
                  </View>
                  <TouchableOpacity style={styles.toggleButton}>
                    <MaterialCommunityIcons
                      name={accountData.NotificationsEnabled ? "toggle-switch" : "toggle-switch-off"}
                      size={36}
                      color={accountData.NotificationsEnabled ? "#3B82F6" : "#94A3B8"}
                    />
                  </TouchableOpacity>
                </View>
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button
                  mode="outlined"
                  style={styles.outlinedButton}
                  onPress={() => navigation.navigate("ChangePassword")}
                >
                  Đổi mật khẩu
                </Button>
              </Card.Actions>
            </Card>

            <View style={styles.logoutSection}>
              <Button
                mode="contained"
                buttonColor="#EF4444"
                style={styles.logoutButton}
                onPress={handleLogout}
                icon="logout"
              >
                Đăng xuất
              </Button>
            </View>
          </View>
        )

      default:
        return null
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hồ sơ cá nhân</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <MaterialCommunityIcons name="cog" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <Avatar.Image
            size={80}
            source={
              residentData.ProfileImage ? { uri: residentData.ProfileImage } : require("../assets/default-avatar.png")
            }
            style={styles.avatar}
          />
          <View style={styles.nameSection}>
            <Text style={styles.profileName}>{residentData.Name}</Text>
            <View style={styles.apartmentBadge}>
              <MaterialCommunityIcons name="home" size={14} color="#3B82F6" />
              <Text style={styles.apartmentText}>Căn hộ {residentData.ApartmentID}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "personal" && styles.activeTab]}
            onPress={() => setActiveTab("personal")}
          >
            <MaterialCommunityIcons name="account" size={20} color={activeTab === "personal" ? "#3B82F6" : "#64748B"} />
            <Text style={[styles.tabText, activeTab === "personal" && styles.activeTabText]}>Cá nhân</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "apartment" && styles.activeTab]}
            onPress={() => setActiveTab("apartment")}
          >
            <MaterialCommunityIcons name="home" size={20} color={activeTab === "apartment" ? "#3B82F6" : "#64748B"} />
            <Text style={[styles.tabText, activeTab === "apartment" && styles.activeTabText]}>Căn hộ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "contract" && styles.activeTab]}
            onPress={() => setActiveTab("contract")}
          >
            <MaterialCommunityIcons
              name="file-document"
              size={20}
              color={activeTab === "contract" ? "#3B82F6" : "#64748B"}
            />
            <Text style={[styles.tabText, activeTab === "contract" && styles.activeTabText]}>Hợp đồng</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "vehicle" && styles.activeTab]}
            onPress={() => setActiveTab("vehicle")}
          >
            <MaterialCommunityIcons name="car" size={20} color={activeTab === "vehicle" ? "#3B82F6" : "#64748B"} />
            <Text style={[styles.tabText, activeTab === "vehicle" && styles.activeTabText]}>Phương tiện</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "settings" && styles.activeTab]}
            onPress={() => setActiveTab("settings")}
          >
            <MaterialCommunityIcons name="cog" size={20} color={activeTab === "settings" ? "#3B82F6" : "#64748B"} />
            <Text style={[styles.tabText, activeTab === "settings" && styles.activeTabText]}>Cài đặt</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  profileHeader: {
    backgroundColor: "#3B82F6",
    paddingTop: StatusBar.currentHeight + 12,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  settingsButton: {
    padding: 4,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  avatar: {
    backgroundColor: "#FFFFFF",
  },
  nameSection: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  apartmentBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
    gap: 4,
  },
  apartmentText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3B82F6",
  },
  tabsContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabsScroll: {
    paddingHorizontal: 16,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    gap: 6,
  },
  activeTab: {
    backgroundColor: "#DBEAFE",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  activeTabText: {
    color: "#3B82F6",
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  tabContent: {
    gap: 16,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#64748B",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
    flex: 1,
    textAlign: "right",
  },
  rentValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3B82F6",
    flex: 1,
    textAlign: "right",
  },
  divider: {
    backgroundColor: "#E5E7EB",
  },
  cardActions: {
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  actionButton: {
    borderRadius: 8,
  },
  outlinedButton: {
    borderRadius: 8,
    borderColor: "#3B82F6",
  },
  apartmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  apartmentNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  apartmentType: {
    fontSize: 14,
    color: "#64748B",
  },
  statusBadge: {
    backgroundColor: "#DCFCE7",
    color: "#16A34A",
    fontWeight: "600",
  },
  apartmentDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  detailItem: {
    alignItems: "center",
    gap: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginTop: 8,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  contractSummary: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  contractIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  contractInfo: {
    flex: 1,
  },
  contractNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  contractApartment: {
    fontSize: 14,
    color: "#64748B",
  },
  contractStatus: {
    backgroundColor: "#DCFCE7",
    color: "#16A34A",
    fontWeight: "600",
  },
  contractDates: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  dateItem: {
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },
  dateArrow: {
    marginHorizontal: -8,
  },
  contractCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  contractHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  contractTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
  },
  contractId: {
    fontSize: 14,
    color: "#64748B",
  },
  contractSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
  },
  contractParties: {
    gap: 16,
  },
  partyInfo: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 12,
  },
  partyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  partyText: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  contractText: {
    fontSize: 14,
    color: "#1E293B",
    marginBottom: 8,
  },
  signatureSection: {
    marginTop: 24,
  },
  signatureDate: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 16,
  },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  signatureBlock: {
    alignItems: "center",
    width: "40%",
  },
  signatureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  signatureImage: {
    width: 80,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#94A3B8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  signatureName: {
    fontSize: 14,
    color: "#1E293B",
  },
  vehicleItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  vehicleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleType: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
  },
  vehicleDetails: {
    fontSize: 14,
    color: "#64748B",
  },
  editButton: {
    padding: 8,
  },
  parkingMapCard: {
    marginTop: 0,
  },
  parkingMap: {
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  mapPlaceholder: {
    alignItems: "center",
  },
  mapText: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 8,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#64748B",
  },
  toggleButton: {
    padding: 4,
  },
  logoutSection: {
    marginVertical: 24,
    alignItems: "center",
  },
  logoutButton: {
    width: "80%",
    borderRadius: 8,
  },
})

export default ProfileScreen
