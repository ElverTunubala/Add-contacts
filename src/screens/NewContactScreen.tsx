import React, { useState } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import { useContacts } from '../hooks/useContacts';
import { pickImageFromLibrary } from '../utils/ImagePickerHelper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// Definimos el tipo de navegación para esta pantalla
type NewContactScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NewContact'
>;

interface NewContactScreenProps {
  navigation: NewContactScreenNavigationProp;
}

const NewContactScreen: React.FC<NewContactScreenProps> = ({ navigation }) => {
  const { addContact } = useContacts();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<string | undefined>();

  const handleAddContact = () => {
    if (name && phone && email) {
      addContact({ name, phone, email, photo });
      navigation.goBack();
    }
  };

  const selectImage = async () => {
    const result = await pickImageFromLibrary();
    if (result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <View>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput placeholder="Teléfono" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput placeholder="Correo" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Button title="Seleccionar Foto" onPress={selectImage} />
      {photo && <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />}
      <Button title="Agregar Contacto" onPress={handleAddContact} />
    </View>
  );
};

export default NewContactScreen;
