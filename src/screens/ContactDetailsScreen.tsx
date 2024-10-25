import React from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Contact } from '../interfaces/Contact';
import { useContacts } from '../hooks/useContacts';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ContactDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ContactDetails'>;

type ContactDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ContactDetails'
>;

interface ContactDetailsScreenProps {
  route: ContactDetailsScreenRouteProp;
  navigation: ContactDetailsScreenNavigationProp;
}

const ContactDetailsScreen: React.FC<ContactDetailsScreenProps> = ({ route }) => {
  const { contact } = route.params;
  const { deleteContact } = useContacts();
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      <Image source={{ uri: contact.photo || 'https://via.placeholder.com/100' }} style={styles.image} />
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.phone}>{contact.phone}</Text>
      <Text style={styles.email}>{contact.email}</Text>
      <Button title="Eliminar" onPress={handleDelete} />
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
});

export default ContactDetailsScreen;
