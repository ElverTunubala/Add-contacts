import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import { useContacts } from '../hooks/useContacts';
import { Contact } from '../interfaces/Contact';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type ContactListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ContactList'
>;

const ContactListScreen: React.FC = () => {
  const { contacts, loadContacts, deleteContact } = useContacts();
  const navigation = useNavigation<ContactListScreenNavigationProp>();

  useEffect(() => {
    loadContacts();

    const unsubscribe = navigation.addListener('focus', () => {
      loadContacts();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ContactDetails', { contact: item })}
      style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}
    >
      <Image source={{ uri: item.photo }} style={{ width: 50, height: 50, borderRadius: 25 }} />
      <View style={{ marginLeft: 10 }}>
        <Text>{item.name}</Text>
        <Text>{item.phone}</Text>
      </View>
      <Button title="Eliminar" onPress={() => deleteContact(item.id)} />
    </TouchableOpacity>
  );

  return (
    <View>
      {contacts.length === 0 ? (
      <Text>No hay contactos disponibles.</Text>
    ) : (
      <FlatList data={contacts} keyExtractor={(item) => item.id} renderItem={renderItem} />
    )}
    <Button title="Nuevo Contacto" onPress={() => navigation.navigate('NewContact')} />
    </View>
  );
};

export default ContactListScreen;
