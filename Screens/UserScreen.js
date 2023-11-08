import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import QRCode from 'react-native-qrcode-svg';
import firestore from '@react-native-firebase/firestore';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const Separator = () => <View style={styles.separator} />;

const UserScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isQrModalVisible, setQrModalVisible] = useState(false); // State for modal visibility
  const toggleModalQr = () => {
    setQrModalVisible(!isQrModalVisible);
  };

  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [qrCodeValue, setQRCodeValue] = useState('');
  const [isModalVisibleQ, setModalVisibleQ] = useState(false);

  const [licenseInfo, setLicenseInfo] = useState('');
  const [registrationInfo, setRegistrationInfo] = useState('');
  const [taxTokenInfo, setTaxTokenInfo] = useState('');

  const [isLicenseModalVisible, setLicenseModalVisible] = useState(false);
  const [isRegistrationModalVisible, setRegistrationModalVisible] = useState(false);
  const [isTaxTokenModalVisible, setTaxTokenModalVisible] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false); // State for showing loading indicator
  const activityIndicatorRef = useRef(null); // Reference to the ActivityIndicator

  useEffect(() => {
    const userDocId = route.params.docId;
    firestore()
      .collection('USERS')
      .doc(userDocId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data();
          setLicenseInfo(userData.License_Info);
          setRegistrationInfo(userData.Registration_Info);
          setTaxTokenInfo(userData.Tax_Token_Info);
        } else {
          console.log('Document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error getting document:', error);
      });
  }, [route.params.docId]);

  const generateQRCode = () => {
    const combinedText = `"License Information:"\n${licenseInfo}\n"Registration Information:"\n${registrationInfo}\n"Tax Token Information:"\n${taxTokenInfo}`;
    setQRCodeValue(combinedText);
    setModalVisibleQ(true);
  };

  const openLicenseModal = () => {
    setLicenseModalVisible(true);
  };

  const openRegistrationModal = () => {
    setRegistrationModalVisible(true);
  };

  const openTaxTokenModal = () => {
    setTaxTokenModalVisible(true);
  };

  const toggleLicenseModal = () => {
    setLicenseModalVisible(!isLicenseModalVisible);
  };

  const toggleRegistrationModal = () => {
    setRegistrationModalVisible(!isRegistrationModalVisible);
  };

  const toggleTaxTokenModal = () => {
    setTaxTokenModalVisible(!isTaxTokenModalVisible);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // Show the loading indicator during the logout process
    setIsLoggingOut(true);
    if (activityIndicatorRef.current) {
      activityIndicatorRef.current.startAnimating();
    }

    // Simulate a delay for logout (you can replace this with actual logout logic)
    setTimeout(() => {
      // Stop the loading indicator
      setIsLoggingOut(false);
      if (activityIndicatorRef.current) {
        activityIndicatorRef.current.stopAnimating();
      }

      // After the logout process, navigate to the landing_page
      navigation.navigate('landing_page');
    }, 2000); // Change 2000 to your desired delay (in milliseconds)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageBackground}>
        <Image style={styles.image} source={require('./assets/B4.png')} />
      </View>
      <Separator />

      {/* QR CODE SECTION */}
      <Text style={styles.verify}>TAP TO OPEN QR CODE</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.qrCodeButton} onPress={generateQRCode}>
          <Image
            style={styles.qrCodeImage}
            source={require('./assets/qr-code.png')}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisibleQ}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisibleQ(false)}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <QRCode
              value={qrCodeValue}
              size={200}
            />
            <Image
              source={{ uri: `data:image/png;base64,${qrCodeValue}` }}
              style={{ width: 200 }}
            />
            <View style={styles.closeButtonContainer}>
              <Button title="Close" onPress={() => setModalVisibleQ(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/* VERIFICATION SECTION */}
      <Separator />

      <View>
        <Text style={styles.verify}>DOCUMENT</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonLicense}
            onPress={() => openLicenseModal()}
          >
            <Text style={styles.buttonText}>License</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRegistration}
            onPress={() => openRegistrationModal()}
          >
            <Text style={styles.buttonText}>Registration Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonTaxtoken}
            onPress={() => openTaxTokenModal()}
          >
            <Text style={styles.buttonText}>Tax Token</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isLicenseModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleLicenseModal}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.docmodalView}>
            <Text>{licenseInfo}</Text>
            <Button title="Close" onPress={toggleLicenseModal} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={isRegistrationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleRegistrationModal}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.docmodalView}>
            <Text>{registrationInfo}</Text>
            <Button title="Close" onPress={toggleRegistrationModal} />
          </View>
        </View>
      </Modal>
      <Modal
        visible={isTaxTokenModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleTaxTokenModal}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.docmodalView}>
            <Text>{taxTokenInfo}</Text>
            <Button title="Close" onPress={toggleTaxTokenModal} />
          </View>
        </View>
      </Modal>

     {/* Logout Button */}
{isLoggingOut ? (
  <View style={styles.loadingIndicatorContainer}>
    <ActivityIndicator
      ref={activityIndicatorRef}
      size="large"
      color="#0000ff"
    />
  </View>
) : (
  <View style={styles.logoutButtonContainer}>
    <TouchableOpacity title="Logout" onPress={handleLogout} >
    <Text style={styles.logoutbuttonText}>LOGOUT</Text></TouchableOpacity>
  </View>
)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B6B1EB',
    padding: 10,
  },
  image: {
    height: height * 0.1,
    width: width * 0.4,
    alignSelf: 'center',
  },
  imageBackground: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    marginTop: 10,
  },
  verify: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 35,
    borderRadius: 20,
    color: 'black',
  },

  buttonLicense: {
    backgroundColor: '#FEBA57',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    width: 350, // Adjust button width
  },
  buttonRegistration: {
    backgroundColor: '#787EFF',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    width: 350, // Adjust button width
  },
  buttonTaxtoken: {
    backgroundColor: '#4DB7C6',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    width: 350, // Adjust button width
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 20,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  docmodalView: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  qrCodeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  qrCodeImage: {
    width: 100,
    height: 100,
  },
  imageInModal: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  closeButtonContainer: {
    marginTop: 20,
  },
  logoutButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50, // Increase the height to make the button more prominent
    width: '100%', 
    // Adjust the background color
    
  },
  loadingIndicatorContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50, // Increase the height to make the button more prominent
    width: '100%', 
  },
  logoutbuttonText: {
    fontSize: 15,
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default UserScreen;
