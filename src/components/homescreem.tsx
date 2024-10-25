
import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import AddContact from './AddContact';

interface Contact {
    name: string;
    phone: string;
    email:string;
  }

const homescreem = () => {

    const [contacts, setContacts] = useState<Contact[]>([]);

    const handleAddContact = (contact: Contact) => {
      setContacts((prevContacts) => [...prevContacts, contact]);
    };
  return (
    <View style={styles.container}>
    <AddContact onAddContact={handleAddContact} />
    <FlatList
      data={contacts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.contactItem}>
          <Text>{item.name}</Text>
          <Text>{item.phone}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  </View>
  )
}

export default homescreem

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
      },
      contactItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
})