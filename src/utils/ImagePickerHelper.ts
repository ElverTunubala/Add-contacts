import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

export const pickImageFromLibrary = async (): Promise<ImagePickerResponse> => {
  return await launchImageLibrary({
    mediaType: 'photo',
    maxWidth: 800,
    maxHeight: 800,
    quality: 0.8,
  });
};

export const takePhotoWithCamera = async (): Promise<ImagePickerResponse> => {
  return await launchCamera({
    mediaType: 'photo',
    maxWidth: 800,
    maxHeight: 800,
    quality: 0.8,
  });
};
