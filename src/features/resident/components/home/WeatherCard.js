import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const WeatherCard = () => {
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCardPress = () => {
    // Navigate to detailed weather screen
    navigation.navigate('WeatherDetails');
  };

  const handleRefreshWeather = async () => {
    setIsRefreshing(true);
    // Simulate weather data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      Alert.alert('Weather Updated', 'Latest weather information has been loaded.');
    }, 1500);
  };

  const handleLocationPress = () => {
    Alert.alert(
      'Change Location',
      'Would you like to update your location?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Update', onPress: () => console.log('Update location') }
      ]
    );
  };

  return (
    <TouchableOpacity onPress={handleCardPress} activeOpacity={0.7}>
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleLocationPress} style={styles.locationRow}>
              <MaterialCommunityIcons name="map-marker" size={16} color="#64748B" />
              <Text style={styles.location}>Hanoi, Vietnam</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRefreshWeather} disabled={isRefreshing}>
              <MaterialCommunityIcons 
                name={isRefreshing ? "loading" : "refresh"} 
                size={16} 
                color="#64748B" 
                style={isRefreshing ? styles.rotating : null}
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.mainContent}>
            <View style={styles.leftSection}>
              <TouchableOpacity style={styles.iconContainer} onPress={handleCardPress}>
                <MaterialCommunityIcons name="weather-cloudy" size={48} color="#3B82F6" />
              </TouchableOpacity>
              <Text style={styles.temp}>22°</Text>
            </View>
            
            <View style={styles.rightSection}>
              <Text style={styles.condition}>Partly Cloudy</Text>
              <Text style={styles.feelsLike}>Feels like 24°</Text>
              
              <View style={styles.detailsRow}>
                <TouchableOpacity style={styles.detail} onPress={() => Alert.alert('Humidity', 'Current humidity is 65%')}>
                  <MaterialCommunityIcons name="water-percent" size={16} color="#64748B" />
                  <Text style={styles.detailText}>65%</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detail} onPress={() => Alert.alert('Wind Speed', 'Current wind speed is 12 km/h')}>
                  <MaterialCommunityIcons name="weather-windy" size={16} color="#64748B" />
                  <Text style={styles.detailText}>12 km/h</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
  },
  location: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    padding: 12,
  },
  temp: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  condition: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  feelsLike: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  detailsRow: {
    gap: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  rotating: {
    transform: [{ rotate: '45deg' }],
  },
});

export default WeatherCard;