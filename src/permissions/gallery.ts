import { Alert, Platform } from "react-native";
import { PERMISSIONS, request } from "react-native-permissions";

export const requestGalleryPermissions = async () => {
    const galleryPermission = Platform.select({
        android: parseInt(Platform.Version as string, 10) >= 30 
            ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES 
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    });

    if (!galleryPermission) {
        console.log('Gallery permission is not available for this platform.');
        Alert.alert('Gallery permission not available');
        return false;
    }

    console.log(`Requesting gallery permission: ${galleryPermission}`);
    const galleryResult = await request(galleryPermission);
    console.log(`Gallery permission result: ${galleryResult}`);

    if (galleryResult === 'granted') {
        console.log('Gallery permission granted');
    } else {
        console.log('Gallery permission denied');
    }

    return galleryResult === 'granted';
};