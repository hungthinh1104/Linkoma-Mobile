import React, { useState, useEffect } from 'react';
import { 
  ScrollView, 
  View, 
  StyleSheet, 
  RefreshControl, 
  StatusBar,
  Animated,
  Dimensions
} from 'react-native';
import { Text, Avatar, useTheme, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WeatherCard from '../components/home/WeatherCard';
import MaintenanceAlertCard from '../components/home/MaintenanceAlertCard';
import QuickStats from '../components/home/QuickStats';
import QuickAccess from '../components/home/QuickAccess';
import RecentActivityList from '../components/home/RecentActivityList';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState('Alex');
  const [scrollY] = useState(new Animated.Value(0));

  // Get time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Handle pull to refresh
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  // Header animation values
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 70],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [1, 0.3, 0],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [0, 0.7, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Animated Header */}
      <Animated.View style={[
        styles.header, 
        { height: headerHeight, backgroundColor: theme.colors.surface }
      ]}>
        <View style={styles.headerContent}>
          <Animated.View style={[styles.greetingContainer, { opacity: headerOpacity }]}>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>{userName}</Text>
          </Animated.View>
          
          <Animated.View style={[styles.compactHeader, { opacity: headerTitleOpacity }]}>
            <Text variant="titleMedium" style={styles.compactTitle}>Dashboard</Text>
          </Animated.View>
          
          <View style={styles.headerRight}>
            <IconButton
              icon="bell-outline"
              size={24}
              onPress={() => navigation.navigate('NotificationsMain')} 
              style={styles.notificationButton}
              animated
              rippleColor="#2563EB33"
            />
            <Avatar.Image 
              size={40} 
              source={
              { uri: "../../../assets/images/default-avatar.png" } }
              style={styles.avatar}
            />
          </View>
        </View>
      </Animated.View>
      
      {/* Main Content */}
      <Animated.ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Dashboard Sections */}
        <View style={styles.section}>
          <WeatherCard />
        </View>
        
        <View style={styles.section}>
          <MaintenanceAlertCard />
        </View>
        
        <View style={styles.sectionWithHeader}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="chart-bar" size={20} color="#2563EB" style={{marginRight: 6}} />
            <Text variant="titleMedium" style={styles.sectionTitle}>Quick Stats</Text>
            <IconButton
              icon="dots-horizontal"
              size={20}
              onPress={() => {}}
            />
          </View>
          <QuickStats />
        </View>
        
        <View style={styles.sectionWithHeader}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>Quick Access</Text>
            <Text variant="bodySmall" style={styles.seeAll}>See All</Text>
          </View>
          <QuickAccess />
        </View>
        
        <View style={styles.sectionWithHeader}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>Recent Activity</Text>
            <Text variant="bodySmall" style={styles.seeAll}>See All</Text>
          </View>
          <RecentActivityList />
        </View>
        
        {/* Footer Space */}
        <View style={styles.footerSpace} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9', // màu nền dịu hơn
  },
  header: {
    width: '100%',
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    zIndex: 10,
    borderBottomLeftRadius: 24, // thêm bo góc
    borderBottomRightRadius: 24, // thêm bo góc
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4, // cho Android
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  compactHeader: {
    position: 'absolute',
    left: 0,
    bottom: 12,
  },
  compactTitle: {
    fontWeight: 'bold',
    color: '#1E293B',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    marginRight: 8,
  },
  avatar: {
    backgroundColor: '#E2E8F0',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 20,
  },
  sectionWithHeader: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#1E293B',
  },
  seeAll: {
    color: '#2563EB',
    fontWeight: '500',
  },
  footerSpace: {
    height: 40,
  },
});

export default HomeScreen;