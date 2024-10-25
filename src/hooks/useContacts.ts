import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from '../interfaces/Contact';
import { v4 as uuidv4 } from 'uuid';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const loadContacts = async () => {
    const data = await AsyncStorage.getItem('contacts');
    console.log('Loaded contacts:', data);
    if (data) {
      setContacts(JSON.parse(data));
  } else {
    setContacts([]);
    }
  };

  const addContact = async (contact: Omit<Contact, 'id'>) => {
    console.log('Adding contact:', contact);
    const newContact = { ...contact, id: uuidv4() };

    // Usar la función de actualización basada en el estado anterior
    setContacts((prevContacts) => {
      const updatedContacts = [...prevContacts, newContact];
      AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return updatedContacts;
    });

    console.log('Adding contact:', newContact);

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

  return { contacts, loadContacts, addContact, updateContact, deleteContact };
};
