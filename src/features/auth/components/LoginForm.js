import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Alert,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { TextInput, Button, Text, Switch } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const LoginForm = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const isManager = email.toLowerCase().includes('manager');

  const handleLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: isManager ? 'ManagerTabs' : 'ResidentTabs' }],
    });
  };

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !enrolled) {
      return Alert.alert('Biometric not available', 'Your device does not support biometric authentication.');
    }

    const result = await LocalAuthentication.authenticateAsync({ 
      promptMessage: 'Login with Biometrics',
      fallbackLabel: 'Use Password'
    });
    
    if (result.success) {
      navigation.reset({
        index: 0,
        routes: [{ name: isManager ? 'ManagerTabs' : 'ResidentTabs' }],
      });
    } else {
      Alert.alert('Authentication failed');
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={require('../../../assets/images/apartment-building.jpg')}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient
          colors={['rgba(37, 99, 235, 0.8)', 'rgba(59, 130, 246, 0.6)', 'rgba(147, 197, 253, 0.4)']}
          style={styles.gradient}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.container}>
                {/* Logo/Icon Section */}
                <View style={styles.logoContainer}>
                  <View style={styles.logoCircle}>
                    <MaterialCommunityIcons name="home-city" size={40} color="#FFFFFF" />
                  </View>
                </View>

                {/* Header Section */}
                <View style={styles.headerContainer}>
                  <Text style={styles.header}>
                    Welcome to{' '}
                    <Text style={styles.highlight}>Linkoma</Text>
                  </Text>
                  <Text style={styles.subtext}>
                    Your seamless experience for modern apartment living and management.
                  </Text>
                </View>

                {/* Form Section */}
                <View style={styles.formContainer}>
                  <View style={styles.form}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        label="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        mode="outlined"
                        theme={{
                          colors: {
                            primary: '#2563EB',
                            outline: '#E5E7EB',
                          }
                        }}
                        left={<TextInput.Icon icon="email-outline" />}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        mode="outlined"
                        theme={{
                          colors: {
                            primary: '#2563EB',
                            outline: '#E5E7EB',
                          }
                        }}
                        left={<TextInput.Icon icon="lock-outline" />}
                        right={
                          <TextInput.Icon 
                            icon={showPassword ? 'eye-off' : 'eye'} 
                            onPress={() => setShowPassword(!showPassword)} 
                          />
                        }
                      />
                    </View>

                    <View style={styles.switchRow}>
                      <View style={styles.rememberMe}>
                        <Switch 
                          value={rememberMe} 
                          onValueChange={setRememberMe} 
                          color="#2563EB"
                          style={styles.switch}
                        />
                        <Text style={styles.switchLabel}>Remember Me</Text>
                      </View>
                      <TouchableOpacity style={styles.forgotPasswordButton}>
                        <Text style={styles.linkText}>Forgot Password?</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Login Button */}
                    <LinearGradient
                      colors={['#2563EB', '#3B82F6']}
                      style={styles.loginButtonGradient}
                    >
                      <Button
                        mode="contained"
                        onPress={handleLogin}
                        style={styles.loginButton}
                        buttonColor="transparent"
                        contentStyle={styles.buttonContent}
                        labelStyle={styles.loginButtonLabel}
                      >
                        Login to My Account
                      </Button>
                    </LinearGradient>

                    {/* Register Button */}
                    <Button
                      mode="outlined"
                      onPress={() => {}}
                      style={styles.registerButton}
                      contentStyle={styles.buttonContent}
                      labelStyle={styles.registerButtonLabel}
                      theme={{
                        colors: {
                          outline: '#FFFFFF',
                        }
                      }}
                    >
                      Create New Account
                    </Button>

                    {/* Divider */}
                    <View style={styles.dividerContainer}>
                      <View style={styles.divider} />
                      <Text style={styles.dividerText}>OR</Text>
                      <View style={styles.divider} />
                    </View>

                    {/* Biometric Button */}
                    <TouchableOpacity 
                      style={styles.biometricButton}
                      onPress={handleBiometricAuth}
                    >
                      <MaterialCommunityIcons name="fingerprint" size={24} color="#2563EB" />
                      <Text style={styles.biometricText}>Login with Biometrics</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: height,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  highlight: {
    color: '#FEF3C7',
  },
  subtext: {
    fontSize: 16,
    textAlign: 'center',
    color: '#F3F4F6',
    lineHeight: 24,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  switchLabel: {
    marginLeft: 12,
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  forgotPasswordButton: {
    padding: 4,
  },
  linkText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 16,
  },
  loginButtonGradient: {
    borderRadius: 16,
    marginTop: 8,
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButton: {
    borderRadius: 16,
  },
  registerButton: {
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2563EB',
    backgroundColor: 'transparent',
  },
  buttonContent: {
    paddingVertical: 12,
  },
  loginButtonLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  registerButtonLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#2563EB',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#9CA3AF',
    fontWeight: '500',
    fontSize: 14,
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.2)',
  },
  biometricText: {
    marginLeft: 12,
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default LoginForm;