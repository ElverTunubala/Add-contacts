import { useEffect, useState } from 'react';
import axios from 'axios';  
import { Contact } from '../interfaces/Contact';  // Asegúrate de que tu interfaz Contact refleje la estructura correcta

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const apiUrl = 'http://localhost:3000/contacts';  // Cambia esta URL por la de tu servidor backend

  // Cargar contactos desde el backend
  const loadContacts = async () => {
    try {
      const response = await axios.get(apiUrl);
      setContacts(response.data);
    } catch (error) {
      console.error('Error al cargar contactos:', error);
    }
  };

  // Agregar un contacto
  const addContact = async (contact: Omit<Contact, 'id'>) => {
    try {
      const response = await axios.post(apiUrl, contact);  // Aquí solo envías el contacto sin el 'id'
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.error('Error al agregar contacto:', error);
    }
  };

  // Actualizar un contacto
  const updateContact = async (id: string, updatedData: Partial<Contact>) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, updatedData);
      const updatedContacts = contacts.map(contact =>
        contact.id === id ? { ...contact, ...response.data } : contact
      );
      setContacts(updatedContacts);
    } catch (error) {
      console.error('Error al actualizar contacto:', error);
    }
  };

  // Eliminar un contacto
  const deleteContact = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      const filteredContacts = contacts.filter(contact => contact.id !== id);
      setContacts(filteredContacts);
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
    }
  };

  useEffect(() => {
    loadContacts();  // Cargar los contactos cuando el componente se monta
  }, []);

  return { contacts, loadContacts, addContact, updateContact, deleteContact };
};
