import {StyleSheet, ImageBackground, Image, Text, Button, View} from 'react-native';
import { Center, Heading, Box, VStack, FormControl,  Input } from "native-base";
import * as Progress from 'react-native-progress';
import toDFW from "../assets/map1.jpg"

export default function ToAirport(){
    return (
      <>
        <View style={styles.container}>
        <Image style={styles.map1} source={toDFW}></Image>
        </View>
      </>
      );
  };

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 7,
        width: '95%',
        height: '30%'
    },
    map1: {
      width:"105.27%",
      height: "295%",
      borderRadius: 7
    }

});
