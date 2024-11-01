import { Alert, Platform } from "react-native"
import { PERMISSIONS, request } from "react-native-permissions"

export const requestCameraPermissions = async () => {
    const cameraPermission = Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
    });

    if (!cameraPermission) {
        console.log('Camera permission is not available for this platform.');
        Alert.alert('Camera permission not available');
        return false;
    }

    console.log(`Requesting camera permission: ${cameraPermission}`);
    const cameraResult = await request(cameraPermission);
    console.log(`Camera permission result: ${cameraResult}`);

    if (cameraResult === 'granted') {
        console.log('Camera permission granted');
    } else {
        console.log('Camera permission denied');
    }

    return cameraResult === 'granted';
};
