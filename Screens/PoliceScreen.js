import React from 'react';
import { useState } from 'react';
import { ScrollView, TouchableOpacity, Image, View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const Separator = () => <View style={styles.separator} />;

const PoliceScreen = () => {
  const navigation = useNavigation();

  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedQR, setScannedQR] = useState('');
  const [scannedTextVisible, setScannedTextVisible] = useState(false);

  const handleQRCodeScan = (e) => {
    const scannedData = e.data;
    // Handle the scanned data (e.g., navigate to a different screen or show the data)
    setScannedQR(scannedData);
    setScannedTextVisible(true);
    setShowQRScanner(false); // Hide the QR scanner after scanning
  };

  const openScanner = () => {
    setShowQRScanner(true); // Show the QR scanner
    setScannedTextVisible(false);
  };

  const closeScanner = () => {
    setShowQRScanner(false); // Close the QR scanner
    setScannedTextVisible(false);
  };

  const closeScannedText = () => {
    setScannedTextVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageBackground}>
        <Image style={styles.image} source={require('./assets/B4.png')} />
      </View>
      <Separator />

      {/* QR CODE SECTION */}
      <Text style={styles.verify}>SCAN QR CODE</Text>
      <TouchableOpacity style={styles.qrCodeButton} onPress={openScanner}>
        <Image
          source={require('./assets/scanner2.png')} // Replace with the actual QR code image source
        />
      </TouchableOpacity>

      {showQRScanner && (
        <>
          <QRCodeScanner
            onRead={handleQRCodeScan}
            showMarker={true}
            checkAndroid6Permissions={true}
            cameraStyle={styles.cameraContainer}
          />
          <TouchableOpacity style={styles.closeButton} onPress={closeScanner}>
            <Text style={styles.closeButtonText}>Close Scanner</Text>
          </TouchableOpacity>
        </>
      )}

      {scannedTextVisible && (
        <View style={styles.scannedTextContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.qrResultText}>{scannedQR}</Text>
          </ScrollView>
          <TouchableOpacity style={styles.closeTextButton} onPress={closeScannedText}>
            <Text style={styles.closeTextButtonText}>Close Text</Text>
          </TouchableOpacity>
        </View>
      )}
         {scannedQR && !scannedTextVisible && (
        <View style={styles.showTextButtonContainer}>
          <TouchableOpacity style={styles.showTextButton} onPress={() => setScannedTextVisible(true)}>
            <Text style={styles.showTextButtonText}>PREVIOUS USER DATA</Text>
          </TouchableOpacity>
        </View>
      )}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5F9EA0', // Set a background color if needed
    padding: 10,
  },
  image: {
    height: height * 0.1, // Responsive height
    width: width * 0.4, // Responsive width
    alignSelf: 'center', // Center the image horizontally
  },
  imageBackground: {
    backgroundColor: '#ffff',
    borderRadius: 10,
  },
  verify: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 14,
    borderRadius: 20,
    color: 'black',
  },
  separator: {
    marginVertical: 15,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  qrCodeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
  },
  qrResultContainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  qrResultText: {
    fontSize: 18,
    color: 'black',
  },
  showTextButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#00000A3C',
    marginTop: 25,
  },
  showTextButton: {
    backgroundColor: '#5F9EA0',
    padding: 10,
    borderRadius: 8,
  },
  
  closeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  scannedTextContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    justifyContent: 'flex-start',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  closeTextButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'green',
    padding: 10,
    borderRadius:1,
  },
  closeTextButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default PoliceScreen;
