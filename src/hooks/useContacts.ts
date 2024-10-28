import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from '../interfaces/Contact';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'; 

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const loadContacts = async () => {
    try {
      const data = await AsyncStorage.getItem('contacts');
      console.log('Datos recuperados de AsyncStorage:', data);
      if (data) setContacts(JSON.parse(data));
    } catch (error) {
      console.error('Error al cargar contactos:', error);
    }
  };

  const addContact = async (contact: Omit<Contact, 'id'>) => {
    try {
      const newContact = { ...contact, id: uuidv4() };
      const updatedContacts = [...contacts, newContact];
      console.log('Contactos actualizados:', updatedContacts);

      setContacts(updatedContacts);
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
      console.log('Datos guardados en AsyncStorage:', JSON.stringify(updatedContacts)); 
    } catch (error) {
      console.error('Error al agregar contacto:', error);
    }
  };
  
  const updateContact = async (id: string, updatedData: Partial<Contact>) => {
    try {
      const updatedContacts = contacts.map(contact =>
        contact.id === id ? { ...contact, ...updatedData } : contact
      );
      setContacts(updatedContacts);
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
    } catch (error) {
      console.error('Error al actualizar contacto:', error);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const filteredContacts = contacts.filter(contact => contact.id !== id);
      setContacts(filteredContacts);
      await AsyncStorage.setItem('contacts', JSON.stringify(filteredContacts));
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return { contacts, loadContacts, addContact, updateContact, deleteContact };
};
