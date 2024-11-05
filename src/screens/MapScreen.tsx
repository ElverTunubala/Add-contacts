import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type MapScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ContactMaps'>;

const MapScreen: React.FC = () => {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const mapRef = useRef<MapView | null>(null);
  const [coordinates, setCoordinates] = React.useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);

  const handlePress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCoordinates({ latitude, longitude });
    onSelectLocation({ latitude, longitude });
  };

  // Esta función se encargará de pasar la ubicación seleccionada de vuelta
  const onSelectLocation = (location: { latitude: number; longitude: number }) => {
    console.log('Ubicación seleccionada:', location);
    
    setTimeout(() => {
      navigation.goBack();
    }, 8000); 
  };
  useEffect(() => {
    // Hide loading indicator once map has loaded
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        loadingEnabled={true}
        onMapLoaded={() => setLoading(false)}
        onPress={handlePress}
      >
        {coordinates && (
          <Marker
            coordinate={coordinates}
            title={`Lat: ${coordinates.latitude}, Lng: ${coordinates.longitude}`}
          />
        )}
      </MapView>
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loading: { position: 'absolute', top: '50%', left: '50%', marginLeft: -20, marginTop: -20 },
});

export default MapScreen;
