import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type MapScreenRouteProp = RouteProp<RootStackParamList, 'ContactMaps'>;

const MapScreen = () => {
  const route = useRoute<MapScreenRouteProp>();
  const { onSelectLocation } = route.params; 
  const mapRef = useRef<MapView | null>(null);
  const [coordinates, setCoordinates] = React.useState<{ latitude: number; longitude: number } | null>(null);

  const handlePress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCoordinates({ latitude, longitude });
    onSelectLocation(`Lat: ${latitude}, Lng: ${longitude}`); 
    console.log(latitude,longitude)// Pasar la dirección
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        loadingEnabled={true}
        onPress={handlePress} // Manejar el toque en el mapa
      >
        {coordinates && (
          <Marker coordinate={coordinates} title={`Lat: ${coordinates.latitude}, Lng: ${coordinates.longitude}`} />
        )}
      </MapView>
      <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
});

export default MapScreen;
