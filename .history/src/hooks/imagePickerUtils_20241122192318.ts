import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { requestCameraPermissions } from '../permissions/camera';
import { requestGalleryPermissions } from '../permissions/gallery';
import { Alert } from 'react-native';
import React, { useEffect, 
    useState } from 'react';

const [photo, setPhoto] = useState<string | undefined>();

export const selectImageFromLibrary = async (setPhoto: React.Dispatch<React.SetStateAction<string | null>>) => {
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

  export const takePhoto = async () => {
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