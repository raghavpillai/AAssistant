import { useState } from 'react';
import {
  StyleSheet,
  View,
} from "react-native";
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function ToSecurity() {
  const [coordinates] = useState([
    {
      latitude: 30.6187,
      longitude: -96.3365,
    },
    {
      latitude: 32.8998,
      longitude: -97.0403,
    },
  ]);
  return (
    <>
    <View style={styles.container}>
      <MapView
          style={styles.map1}
          initialRegion={{
            latitude: coordinates[0].latitude, 
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0121,
          }}>
          <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates[1]}
            apikey={"AIzaSyDQTiDieElmopRZrCBJu3ZEBRt3jnSAvsE"}
            strokeWidth={3}
            strokeColor="red"
          />
          <Marker coordinate={coordinates[0]} />
          <Marker coordinate={coordinates[1]} />
        </MapView>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: 7,
    width: "95%",
    height: "30%",
  },
  map1: {
    width: "105.27%",
    height: "295%",
    borderRadius: 7,
  },
});
