import { Alert, Platform } from "react-native";
import { PERMISSIONS, check, openSettings, request } from "react-native-permissions";
const getLocationPermission = () => {
  return Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  });
};

export const requestLocationPermission = async () => {
  const locationPermission = getLocationPermission();
  
  if (!locationPermission) {
    throw new Error('Location permission not supported on this platform.');
  }
  const status = await request(locationPermission);

  if (status === 'blocked') {
    await openSettings();
    return checkLocationPermission(); 
  }
  return status;
};

export const checkLocationPermission = async () => {
  const locationPermission = getLocationPermission();
  
  if (!locationPermission) {
    throw new Error('Location permission not supported on this platform.');
  }

  return check(locationPermission);
};
