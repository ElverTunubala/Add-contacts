import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

interface Contact {
  name: string;
  phone: string;
  email: string;
}

interface Props {
  onAddContact: (contact: Contact) => void;
}

const AddContact: React.FC<Props> = ({ onAddContact }) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleAddContact = () => {
    if (!name || !phone ) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    onAddContact({ name, phone, email });
    setName('');
    setPhone('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Emailes:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="phone-pad"
      />
      <Button title="Agregar Contacto" onPress={handleAddContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default AddContact;
