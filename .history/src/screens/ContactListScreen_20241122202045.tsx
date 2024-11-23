import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList,  
  TouchableOpacity, 
  Image, 
  StyleSheet 
} from 'react-native';
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
      style={styles.contactContainer}
    >
      <Image source={{ uri: item.photo }} style={styles.contactImage} />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => deleteContact(item.id)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {contacts.length === 0 ? (
        <Text style={styles.emptyText}>No hay contactos disponibles.</Text>
      ) : (
        <FlatList 
          data={contacts} 
          keyExtractor={(item) => item.id} 
          renderItem={renderItem} 
        />
      )}
      <TouchableOpacity 
        style={styles.newContactButton} 
        onPress={() => navigation.navigate('NewContact')}
      >
        <Text style={styles.newContactButtonText}>Nuevo Contacto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  contactPhone: {
    fontSize: 14,
    color: '#777',
  },
  deleteButton: {
    backgroundColor: '#FF5C5C',
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#999',
  },
  newContactButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  newContactButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ContactListScreen;
