import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { requestCameraPermissions } from '../permissions/camera';
import { requestGalleryPermissions } from '../permissions/gallery';
import {  useState } from 'react';
import { Alert } from 'react-native';


export const useImagePicker = () => {
  const [photo, setPhoto] = useState<string | undefined>();

  // Función para seleccionar una imagen de la galería
  const selectImageFromLibrary = async () => {
    const hasPermission = await requestGalleryPermissions();
    if (hasPermission) {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets.length > 0) {
        setPhoto(result.assets[0].uri);
      }
    } else {
      Alert.alert('Permiso de galería denegado');
    }
  };

  // Función para tomar una foto con la cámara
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermissions();
    if (hasPermission) {
      const result = await launchCamera({ mediaType: 'photo' });
      if (result.assets && result.assets.length > 0) {
        setPhoto(result.assets[0].uri);
      }
    } else {
      Alert.alert('Permiso de cámara denegado');
    }
  };

  return {
    photo,       // Estado de la foto seleccionada o tomada
    selectImageFromLibrary,  // Función para seleccionar imagen
    takePhoto    // Función para tomar foto
  };
};
