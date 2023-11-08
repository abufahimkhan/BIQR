import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

const UserSignupScreen = () => {
  const navigation = useNavigation();
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const [emailOrPhoneError, setEmailOrPhoneError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  //Database Integration and management code here
  const firebaseSignup=()=>{
      // Create a user object with the provided data
      const user = {
        emailOrPhone,
        password,
      };
      firestore()
      .collection('USERS')
      .add(user)
      .then((docRef) => {
        const docId=docRef.id;
        console.log('Document ID:', docRef.id); // This is the unique document ID
        console.log('User data saved successfully:', user);
        setLoading(false);
        // Navigate to the desired screen, e.g., 'ocr_license'
        navigation.navigate('ocr_license', {docId});
      })
      .catch((error) => {
        console.error('Error saving user data:', error);
        setLoading(false);
      });

  }
  const handleLogin = () => {
    navigation.navigate('login_user');
  };
  const handleSignup = () => {
    // Reset previous error messages
    setEmailOrPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let hasError = false;

    // Check if email or Phone is empty
    if (!emailOrPhone) {
      setEmailOrPhoneError('Email or Phone number is required.');
      hasError = true;
    }

    // Check if password is empty
    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    }

    // Check if confirm password is empty
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required.');
      hasError = true;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setConfirmPasswordError('Passwords do not match.');
      hasError = true;
    }

    if (hasError) {
      // If there are errors, do not proceed with signup
      return;
    }

    // Passwords match, proceed with signup
    console.log('Signing up...');

    // Show the loading popup
    setLoading(true);
    firebaseSignup();

    // After 1 second, clear the error messages and hide the loading popup
    setTimeout(() => {
    

      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logoB1.png')} style={styles.logo} />
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or Phone number"
        value={emailOrPhone}
        onChangeText={text => setEmailOrPhone(text)}
      />
      {emailOrPhoneError ? (
        <Text style={styles.errorText}>{emailOrPhoneError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      {confirmPasswordError ? (
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      ) : null}
      <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Already have an account?</Text>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginText}> Login</Text>
      </TouchableOpacity>

      {/* Loading Animation */}
      {loading && (
        <View style={styles.loadingPopup}>
          <ActivityIndicator size="large" color="#00A36C" />
          <Text style={styles.loadingText}>Signing up...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B6B1EB',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#00000A3C',
    textDecorationColor: 'black',
    color: 'white',
  },
  loginButton: {
    width: 200,
    height: 50,
    backgroundColor: '#00A36C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginBottom: 5,
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  loginText: {
    color: '#338ED9',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '900',
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  loadingPopup: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
});

export default UserSignupScreen;
