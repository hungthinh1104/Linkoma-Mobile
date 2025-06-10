// src/features/auth/screens/LoginScreen.js
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    const role = email.includes('admin')
      ? 'admin'
      : email.includes('manager')
      ? 'manager'
      : 'resident';

    navigation.reset({
      index: 0,
      routes: [{ name: getTabByRole(role) }],
    });
  };

  const getTabByRole = (role) => {
    switch (role) {
      case 'admin':
        return 'AdminTabs';
      case 'manager':
        return 'ManagerTabs';
      default:
        return 'ResidentTabs';
    }
  };

  return <LoginForm email={email} setEmail={setEmail} onLogin={handleLogin} />;
};

export default LoginScreen;
