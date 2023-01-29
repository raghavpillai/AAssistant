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
  import ProgressBar from "./ProgressBar";
  export default function Boarding() {
    return (
      <>
        <View style={styles.container}>
            <Text style={styles.text}>Group 1 is now boarding</Text>
            <ProgressBar></ProgressBar>
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
    text: {
        padding: "5%",
        fontSize: 24,
        lineHeight: 25,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: 'rgb(70,145,247)',
        textAlign: 'center'
      },
  });
  