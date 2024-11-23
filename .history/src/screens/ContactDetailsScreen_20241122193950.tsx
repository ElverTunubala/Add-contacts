import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, TextInput, Modal, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useContacts } from '../hooks/useContacts';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';

type ContactDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ContactDetails'>;
type ContactDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ContactDetails'>;

interface ContactDetailsScreenProps {
  route: ContactDetailsScreenRouteProp;
  navigation: ContactDetailsScreenNavigationProp;
}

const ContactDetailsScreen: React.FC<ContactDetailsScreenProps> = ({ route }) => {
  const { contact } = route.params;
  const { deleteContact, updateContact } = useContacts();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);
  const [photo, setPhoto] = useState(contact.photo);


  const handleDelete = () => {

    Alert.alert('Eliminar Contacto', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: () => {
          deleteContact(contact.id);
          navigation.goBack();
        },
        style: 'destructive',
      },
    ]);
  };

  const handleUpdate = () => {
    const updatedData = { name, phone, email,photo };
    updateContact(contact.id, updatedData);
    setModalVisible(false);
    navigation.goBack();
  };
   return (
    <View style={styles.container}>
      <Image source={{ uri: contact.photo || 'https://via.placeholder.com/100' }} style={styles.image} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.name}>{contact.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Celular</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Correo</Text>
        <Text style={styles.email}>{contact.email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Dirección</Text>
        {contact.address ? (
          <Text style={styles.address}>
            Latitude: {contact.address.latitude}, Longitude: {contact.address.longitude}
          </Text>
        ) : (
          <Text style={styles.address}>No disponible</Text>
        )}
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
        <AntDesign name="edit" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Actualizar Contacto</Text>

            <Image source={{ uri: contact.photo || 'https://via.placeholder.com/100' }} style={styles.image} />

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nombre"
            />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Teléfono"
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Correo"
              keyboardType="email-address"
            />
             {/* Botones para seleccionar imagen de la galería o cámara */}
             <TouchableOpacity style={styles.button} onPress={() => selectImageFromLibrary(setPhoto)}>
              <AntDesign name="picture" size={30} color="#fff" />
              <Text style={styles.buttonText}>Galería</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => takePhoto(setPhoto)}>
              <AntDesign name="camerao" size={30} color="#fff" />
              <Text style={styles.buttonText}>Cámara</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
              <Text style={styles.updateButtonText}>Actualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4CAF50',
    marginBottom: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  phone: {
    fontSize: 18,
    color: '#555',
  },
  email: {
    fontSize: 18,
    color: '#555',
  },
  address: {
    fontSize: 18,
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#ff5252',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    position: 'absolute',
    bottom: 30,
    right: 30,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#4CAF50',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default ContactDetailsScreen;
