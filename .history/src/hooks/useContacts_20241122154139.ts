import { useEffect, useState } from 'react';
import axios from 'axios';  
import { Contact } from '../interfaces/Contact';
import { v4 as uuidv4 } from 'uuid';  // Si sigues usando UUID para los identificadores (aunque no lo necesitarás si el backend lo genera)

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const apiUrl = 'http://localhost:3000/contacts';  // Cambia esta URL por la URL de tu servidor backend

  // Cargar los contactos desde el backend
  const loadContacts = async () => {
    try {
      const response = await axios.get(apiUrl);
      setContacts(response.data);
    } catch (error) {
      console.error('Error al cargar contactos:', error);
    }
  };

  // Crear un nuevo contacto
  const addContact = async (contact: Omit<Contact, 'id'>) => {
    try {
      const newContact = { ...contact, id: uuidv4() };  // UUID si lo necesitas, sino puedes omitirlo
      const response = await axios.post(apiUrl, newContact);
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