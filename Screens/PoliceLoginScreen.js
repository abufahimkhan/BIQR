import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const PoliceLoginScreen = () => {
  const navigation = useNavigation();
  const [policeID, setPoliceID] = useState('');

  const [policeIDError, setPoliceIDError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const checkLogin = () => {

    firestore()
      .collection('POLICE')
      .where('policeID', '==', policeID)
      .where('password', '==', password)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          // If there is a matching user in the database
          const docId = querySnapshot.docs[0].id; // Get the document ID
          console.log('Logging in...');
          setLoading(true);
  
          setTimeout(() => {
            console.log(docId)
            navigation.navigate('police_screen', { docId }); // Pass the document ID to the user screen
            setLoading(false);
          }, 1000);
        } else {
          // No matching user found
          Alert.alert('Incorrect ID or Password');
        }
      })
      .catch((error) => {
        console.log(error);
      });

  
};


  const handleLogin = () => {
    // Reset previous error messages
    setPoliceIDError('');
    setPasswordError('');
    //setConfirmPasswordError('');

    let hasError = false;

    // Check if police ID is empty
    if (!policeID) {
      setPoliceIDError('Police ID is required');
      hasError = true;
    }

    // Check if password is empty
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }


    if (hasError) {
      // If there are errors, do not proceed with signup
      return;
    }

    checkLogin();

    // Passwords match, proceed with signup
    console.log('Logging in...');

    // Show the loading popup
    setLoading(true);

    // After 1 second, clear the error messages and hide the loading popup
    setTimeout(() => {
     // navigation.navigate('police_screen');
      setLoading(false);
    }, 1000);
    //navigation.navigate('PoliceScreen'); // navigate to police home page(QR scanner page)

    
  };

  return (
    <View style={styles.container}>
       <Image source={require('./assets/logoB1.png')} style={styles.logo} />
      <Text style={styles.title}>Police Login</Text>
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
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      {loading && (
        <View style={styles.loadingPopup}>
          <ActivityIndicator size="large" color="#00A36C" />
          <Text style={styles.loadingText}>Logging in...</Text>
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
  forgetText: {
    color: '#338E',
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

export default PoliceLoginScreen;
