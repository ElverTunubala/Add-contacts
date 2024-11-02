import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useContacts } from '../hooks/useContacts';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { requestCameraPermissions } from '../permissions/camera';
import { requestGalleryPermissions } from '../permissions/gallery';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

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
      onSelectLocation: (selectedAddress: string) => setAddress(selectedAddress),
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

      <TouchableOpacity style={styles.addMap} onPress={openMaps}>
        <EvilIcons name="location" size={30} color="#fff" />
        <Text style={styles.buttonText}>Ubicación</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.addButtonText}>Agregar Contacto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Alinear hacia el inicio
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
    justifyContent: 'space-around', // Distribución mejorada
    width: '100%',
    marginBottom: 20, // Mayor separación
  },
  button: {
    flex: 1,
    backgroundColor: '#1E90FF',
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 20, // Margen horizontal entre botones
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5, // Espacio entre el icono y el texto
  },
  selectText: {
    color: '#777',
    fontWeight: 'bold',
    marginVertical: 10, // Espacio vertical adicional
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
    marginTop: 20, // Mayor separación
  },
  addMap: {
    flexDirection: 'row',
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center', // Centrado del contenido
    marginTop: 15, // Espacio superior
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NewContactScreen;
