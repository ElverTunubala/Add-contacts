
export const selectImageFromLibrary = async () => {
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