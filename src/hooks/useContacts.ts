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
      if (data) setContacts(JSON.parse(data));
    } catch (error) {
      console.error('Error al cargar contactos:', error);
    }
  };

  const addContact = async (contact: Omit<Contact, 'id'>) => {

    const newContact = { ...contact, id: uuidv4() };
    const updatedContacts = [...contacts, newContact];
    console.log('Contactos actualizados:', updatedContacts);

    setContacts(updatedContacts);
    await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };
  
  const updateContact = async (id: string, updatedData: Partial<Contact>) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === id ? { ...contact, ...updatedData } : contact
    );
    setContacts(updatedContacts);
    await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const deleteContact = async (id: string) => {
    const filteredContacts = contacts.filter(contact => contact.id !== id);
    setContacts(filteredContacts);
    await AsyncStorage.setItem('contacts', JSON.stringify(filteredContacts));
  };
  //importante para cargar los contactos
  useEffect(() => {
    loadContacts();
  }, []);

  return { contacts, loadContacts, addContact, updateContact, deleteContact };
};
