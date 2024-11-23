import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useContacts } from '../hooks/useContacts';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { requestCameraPermissions } from '../permissions/camera';
import { requestGalleryPermissions } from '../permissions/gallery';
import { useFocusEffect, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { checkLocationPermission, requestLocationPermission } from '../permissions/location';

type NewContactScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewContact'>;
type NewContactScreenRouteProp = RouteProp<RootStackParamList, 'NewContact'>; // Define el tipo para la ruta

interface NewContactScreenProps {navigation: NewContactScreenNavigationProp}

const NewContactScreen: React.FC<NewContactScreenProps> = () => {
  const navigation = useNavigation<NewContactScreenNavigationProp>();
  const { addContact } = useContacts();
  const route = useRoute<NewContactScreenRouteProp>(); 

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<string | undefined>();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

   // useEffect para actualizar el estado de location si recibimos coordenadas
   useEffect(() => {
    console.log("estado de location: ",route.params?.location);
    if (route.params?.location) {
      setLocation(route.params.location);
    }
  }, [route.params?.location]);
  

  const handleAddContact = () => {
    if (name && phone && email) {
      const newContact = { name, phone, email, photo, address: location };
      console.log("Datos a enviar:", newContact);
      addContact(newContact);
      navigation.goBack();
    } else {
      console.warn('Por favor completa todos los campos.');
    }
  };
 
  const selectImageFromLibrary = async () => {
    const hasPermission = await requestGalleryPermissions();
    if (hasPermission) {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets.length > 0) {
        setPhoto(result.assets[0].uri);
      }
    } else {
      Alert.alert('Permiso de galería denegado');
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermissions();
    if (hasPermission) {
      const result = await launchCamera({ mediaType: 'photo' });
      if (result.assets && result.assets.length > 0) {
        setPhoto(result.assets[0].uri);
      }
    } else {
      Alert.alert('Permiso de cámara denegado');
    }
  };

  const openMaps = async () => {
    try {
      const permissionStatus = await checkLocationPermission();

      if (permissionStatus !== 'granted') {
        const requestStatus = await requestLocationPermission();

        if (requestStatus !== 'granted') {
          Alert.alert('Location Permission', 'Location permission is required to access the map.');
          return;
        }
      }
      navigation.navigate('ContactMaps');
  
    } catch (error) {
      console.error('Error checking or requesting permission:', error);
      Alert.alert('Error', 'There was an issue with location permissions.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Esta función se ejecutará cada vez que regreses a esta pantalla
      if (location) {
        console.log("soy location de add contacts", location);
      }
    }, [location])
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput 
          style={styles.input} 
          placeholder="Nombre" 
          value={name} 
          onChangeText={setName} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Teléfono" 
          value={phone} 
          onChangeText={setPhone} 
          keyboardType="phone-pad" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Correo" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
        />
        <Text style={styles.selectText}>Seleccionar Foto</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={selectImageFromLibrary}>
            <AntDesign name="picture" size={30} color="#fff" />
            <Text style={styles.buttonText}>Galería</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <AntDesign name="camerao" size={30} color="#fff" />
            <Text style={styles.buttonText}>Cámara</Text>
          </TouchableOpacity>
        </View>

        {photo && <Image source={{ uri: photo }} style={styles.image} />}

        {location && (
          <Text style={styles.addressText}>
            Latitud: {location.latitude},
            Longitud: {location.longitude}
          </Text>
        )}

        <TouchableOpacity style={styles.addMap} onPress={openMaps}>
          <EvilIcons name="location" size={30} color="#fff" />
          <Text style={styles.buttonText}>Ubicación</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <Text style={styles.addButtonText}>Agregar Contacto</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20, 
  },
  button: {
    flex: 1,
    backgroundColor: '#1E90FF',
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  selectText: {
    color: '#777',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: '85%',
    height: 100,
    marginBottom: 5,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  addMap: {
    flexDirection: 'row',
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 15,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addressText: {
    color: '#333',
    marginVertical: 10,
    fontSize: 16,
  },
});

export default NewContactScreen;
