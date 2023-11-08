import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export default function OCRLicence() {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const [image, setImage] = useState('');
  const [recognizedText, setRecognizedText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [uploadDone, setUploadDone] = useState(false); // New state variable

  const route = useRoute();
 

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSuccessModal = () => {
    setIsSuccessModalVisible(!isSuccessModalVisible);
  };

  const pickImage = async () => {
    let result = await launchImageLibrary({mediaType: 'photo'});
    if (result != undefined) {
      setImage(result.assets[0].uri);
      recognizeText(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    try {
      const result = await launchCamera({mediaType: 'photo'});
      if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        recognizeText(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error opening the camera:', error);
    }
  };

  const recognizeText = async imageUri => {
    if (imageUri !== '') {
      const result = await TextRecognition.recognize(imageUri);
      if (result !== undefined) {
        const filteredText = filterText(result.text);
        setRecognizedText(filteredText);
        setEditedText(filteredText);
        setUploadDone(true); // Set uploadDone to true when the Upload button is clicked
        toggleModal();
      }
    }
  };

  const filterText = text => {
    const filteredText = text.replace(
      /[^a-zA-Z0-9\n\s/০-৯অ-ঔক-জড-য়&:,-]|[\s\S]?[০-৯অ-ঔক-জড-য়].?\//g,
      '',
    );
    return filteredText;
  };

  const handleTextUpload = () => {
    // console.log('Edited Text:', editedText);
     const id = route.params.docId; // Retrieve the docId from navigation params
    firestore()
      .collection('USERS')
      .doc(id) // Use the docId passed from the previous screen
      .update({License_Info: editedText})
      .then(() => {
        console.log('Recognized text saved successfully.');
      })
      .catch(error => {
        console.error('Error saving recognized text:', error);
      });

    toggleModal();
    toggleSuccessModal();
  };

  const handleNextButton = () => {
    if (uploadDone) {
      navigation.navigate('ocr_registration',{id:route.params.docId});

      setIsLoadingNext(true);
      setTimeout(() => {
        setIsLoadingNext(false);
      }, 3000);
    } else {
      // Show a message or take any other action to prompt the user to upload documents first
      alert('Please upload your license informations before proceeding.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.content}>
          <Text style={styles.title}>OCR LICENSE</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Pick Image</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={openCamera}>
              <Text style={styles.buttonText}>Open Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={handleNextButton}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.modalTextInput}
                multiline
                value={editedText}
                onChangeText={text => setEditedText(text)}
              />
              <Button title="Upload" onPress={handleTextUpload} />
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isSuccessModalVisible}>
            <View style={styles.successModalContent}>
              <Text style={styles.successText}>Upload successful!</Text>
              <Button title="Close" onPress={toggleSuccessModal} />
            </View>
          </Modal>
          {isLoadingNext && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={isLoadingNext}>
              <View style={styles.loadingModalContent}>
                <ActivityIndicator size="large" color="#007AFF" />
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B6B1EB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
   borderRadius: 20,
    marginVertical: 8,
    width: 300, // Adjust button width
  },
  smallButton: {
    backgroundColor: '#007F',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
    width: 100, // Adjust button width
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  modalTextInput: {
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  successModalContent: {
    flex: 1,
    backgroundColor: 'rgba(66,75, 166, 0.😎',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: 'white',
    fontSize: 18,
  },
  loadingModalContent: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
