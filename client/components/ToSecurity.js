import {
    StyleSheet,
    ImageBackground,
    Image,
    Text,
    Button,
    View,
  } from "react-native";
  import { Center, Heading, Box, VStack, FormControl, Input } from "native-base";
  import * as Progress from "react-native-progress";
  import toSEC from "../assets/securitymap.png";
  
  export default function ToSecurity() {
    return (
      <>
        <View style={styles.container}>
          <Image style={styles.map1} source={toSEC}></Image>
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
      height: "334%",
    },
  });
  