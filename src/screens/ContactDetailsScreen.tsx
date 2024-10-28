import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, TextInput, Modal, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useContacts } from '../hooks/useContacts';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

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

  // State para el modal y campos de actualización
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);

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
    const updatedData = { name, phone, email };
    updateContact(contact.id, updatedData);
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: contact.photo || 'https://via.placeholder.com/100' }} style={styles.image} />
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.phone}>{contact.phone}</Text>
      <Text style={styles.email}>{contact.email}</Text >
      <Button title="Eliminar" onPress={handleDelete} />
      <Icon name="accessibility-outline" />;
      
      {/* Botón para abrir el modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.openModalText}>Actualizar Contacto</Text>
      </TouchableOpacity>

      {/* Modal para actualizar contacto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Actualizar Contacto</Text>
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
            <Button title="Actualizar" onPress={handleUpdate} />
            <Button title="Cerrar" onPress={() => setModalVisible(false)} color="gray" />
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
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phone: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  openModalText: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ContactDetailsScreen;
