import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
} from "react-native";
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function ToAirport({terminal, gate, func}) {
  const mode = 'walking'; // 'walking';
  const origin = `dfw ${terminal}`;
  const destination = `dfw gate ${gate}`;
  const APIKEY = 'AIzaSyDQTiDieElmopRZrCBJu3ZEBRt3jnSAvsE';
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

  const [coordinates, setCoords] = useState(null);

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      setCoords([
        {
          latitude:responseJson.routes[0].legs[0].start_location.lat,
          longitude:responseJson.routes[0].legs[0].start_location.lng
        },
        {
          latitude:responseJson.routes[0].legs[0].end_location.lat,
          longitude:responseJson.routes[0].legs[0].end_location.lng
        }
      ])
    })
    .catch(e => {console.warn(e)});
  },[])

  if(coordinates != null){

  
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
  );}
  else {
    return <></>
  }
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
