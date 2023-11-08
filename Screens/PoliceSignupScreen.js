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

const PoliceSignupScreen = () => {
  const navigation = useNavigation();
  const [policeID, setPoliceID] = useState('');
  const [policeIDError, setPoliceIDError] = useState('');
  const [emailID, setEmailID] = useState('');
  const [emailIDError, setEmailIDError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  //Database Integration and management code here
  const firebaseSignup=()=>{
    // Create a user object with the provided data
    const police = {
      policeID,
      emailID,
      password,
    };
    firestore()
    .collection('POLICE')
    .add(police)
    .then((docRef) => {
      const id=docRef.id;
      console.log('Document ID:', id); // This is the unique document ID
      console.log('Police data saved successfully:', police);
      setLoading(false);
      // Navigate to the desired screen, e.g., 'ocr_license'
      navigation.navigate('police_screen', {id});
    })
    .catch((error) => {
      console.error('Error saving police data:', error);
      setLoading(false);
    });

}
  
  const handleLogin = () => {
    navigation.navigate('login_police');
  };
  const handleSignup = () => {
    // Reset previous error messages
    setPoliceIDError('');
    setEmailIDError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let hasError = false;

    // Check if email or username is empty
    if (!policeID) {
      setPoliceIDError('Police ID is required');
      hasError = true;
    }

     // Check if password is empty
     if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }
    if (!emailID) {
      setEmailIDError('Email is required');
      hasError = true;
    }

    // Check if confirm password is empty
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      hasError = true;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      setConfirmPasswordError('Passwords do not match');
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
      navigation.navigate('police_screen')
      setLoading(false);
    }, 1000);
    //navigation.navigate('PoliceScreen'); // navigate to police home page(QR scanner page)
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logoB1.png')} style={styles.logo} />
      <Text style={styles.title}>Police Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Police ID"
        value={policeID}
        onChangeText={text => setPoliceID(text)}
      />
      {policeIDError ? (
        <Text style={styles.errorText}>{policeIDError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={emailID}
        onChangeText={text => setEmailID(text)}
      />
      {emailIDError ? (
        <Text style={styles.errorText}>{emailIDError}</Text>
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
      {/* <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password</Text>
      </TouchableOpacity> */}
      <Text style={styles.text}>Signed in already? </Text>
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
    backgroundColor: '#5F9EA0',
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
    color:'white',
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
    color: '#338E',
    fontSize: 16,
    marginTop: 10,
    fontWeight:'900',
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

export default PoliceSignupScreen;
