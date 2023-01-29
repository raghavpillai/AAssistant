import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
} from "react-native";
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function ToAirport({security, gate}) {
  const [coordinates, setCoords] = useState(null);

  const checkpoints = {
    "A12": {
      latitude:32.906782,
      longitude:-97.037392
    },
    "A21": {
      latitude:32.904625, 
      longitude:-97.035713
    },
    "A35": {
      latitude:32.902584, 
      longitude:-97.037473
    },
    "B30": {
      latitude:32.906431,
      longitude: -97.043917
    },
    "B9": {
      latitude:32.902958, 
      longitude:-97.043825
    },
    "C10": {
      latitude: 32.899379, 
      longitude: -97.036940
    },
    "C20": {
      latitude: 32.897224, 
      longitude: -97.035847
    },
    "C30": {
      latitude: 32.895648, 
      longitude: -97.036943
    },
    "D30": {
      latitude: 32.898803, 
      longitude: -97.044250
    },
    "D22": {
      latitude: 32.897660, 
      longitude: -97.044731
    },
    "D18": {
      latitude: 32.896345, 
      longitude: -97.044263
    },
    "E8": {
      longitude: 32.892087, 
      latitude: -97.036699
    },
    "E16": {
      longitude: 32.890048, 
      latitude: -97.035869
    },
    "E18": {
      latitude: 32.889437, 
      longitude: -97.036094
    },
    "E33": {
      latitude: 32.888329, 
      longitude: -97.037432
    }
  }

  useEffect(() => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=dfw+terminal+${security[0]}+gate+${gate}&key=AIzaSyDQTiDieElmopRZrCBJu3ZEBRt3jnSAvsE`
    fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      setCoords([
        {
          latitude:checkpoints[security].latitude,
          longitude:checkpoints[security].longitude
        },
        {
          latitude:responseJson.results[0].geometry.location.lat,
          longitude:responseJson.results[0].geometry.location.lng
        }
      ])
    })
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
