import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useContacts } from '../hooks/useContacts';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { requestCameraPermissions } from '../permissions/camera';
import { requestGalleryPermissions } from '../permissions/gallery';

type NewContactScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NewContact'
>;

interface NewContactScreenProps {
  navigation: NewContactScreenNavigationProp;
}

const NewContactScreen: React.FC<NewContactScreenProps> = ({ navigation }) => {
  const { addContact } = useContacts();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>(); // Estado para la dirección

  const handleAddContact = () => {
    if (name && phone && email) {
      addContact({ name, phone, email, photo, address }); // Guardar dirección
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

  const openMaps = () => {
    navigation.navigate('ContactMaps', {
      onSelectLocation: (selectedAddress: string) => setAddress(selectedAddress) 
    });
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={selectImageFromLibrary}>
          <Text style={styles.buttonText}>Seleccionar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Tomar Foto</Text>
        </TouchableOpacity>
      </View>

      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.addButtonText}>Agregar Contacto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={openMaps}>
        <Text style={styles.buttonText}>Agregar Dirección</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NewContactScreen;
