import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Avatar, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            }),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={require('../../../assets/images/avatar.png')}
        style={{ marginBottom: 20 }}
      />
      <Text style={styles.name}>Hà Thị Thu</Text>
      <Text style={styles.email}>ha.thuthu@example.com</Text>

      <Button
        mode="outlined"
        onPress={handleLogout}
        style={styles.logoutButton}
        labelStyle={{ color: '#EF4444' }}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f9fafb',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  logoutButton: {
    borderColor: '#EF4444',
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 12,
    paddingHorizontal: 16,
  },
});

export default ProfileScreen;
c