import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LandingPage = () => {
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingPolice, setLoadingPolice] = useState(false);
  const navigation = useNavigation();

  const handleUserButtonClick = () => {
    setLoadingUser(true); // Start loading animation

    // Simulate some async operation (e.g., navigation) after 1 second
    setTimeout(() => {
      navigation.navigate('signup_user');
      setLoadingUser(false); // Stop loading animation
    }, 1000);
  };

  const handlePoliceButtonClick = () => {
    setLoadingPolice(true); // Start loading animation

    // Simulate some async operation after 1 second
    setTimeout(() => {
      // Perform the action you want (e.g., navigation or other functionality)
      navigation.navigate('signup_police');
      setLoadingPolice(false); // Stop loading animation
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logoB1.png')} style={styles.logo} />
      <Text style={styles.title}>WELCOME TO BIQR</Text>
      <TouchableOpacity
        style={styles.userButton}
        onPress={handleUserButtonClick}
        disabled={loadingUser}>
        {loadingUser ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>USER</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pliceButton}
        onPress={handlePoliceButtonClick}
        disabled={loadingPolice}>
        {loadingPolice ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>POLICE</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B6B1EB', // Set the background color as needed
  },
  logo: {
    width: 200, // Adjust the logo width as needed
    height: 200, // Adjust the logo height as needed
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userButton: {
    width: 200,
    height: 50,
    backgroundColor: '#FEBA57', // Set the button background color
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  pliceButton: {
    width: 200,
    height: 50,
    backgroundColor: '#787EFF', // Set the button background color
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LandingPage;
