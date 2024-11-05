import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Contact } from '../interfaces/Contact';

interface ContactCardProps {
  contact: Contact;
  onPress: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onPress }) => {
  console.log('Contact data:', contact); // Verifica que los datos sean correctos
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: contact.photo || 'https://via.placeholder.com/50' }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ContactCard;
