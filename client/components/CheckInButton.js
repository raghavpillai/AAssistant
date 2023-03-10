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
import { Pressable } from "react-native";
import ProgressBar from "./ProgressBar";
export default function CheckInButton({func}) {
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => func(1)}>
          <Text style={styles.text}>Check In</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: 7,
    width: "100%",
    height: "30%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  spacersm: {
    marginTop: "5%",
  },
  spacerlg: {
    marginTop: "10%",
  },
  light: {
    color: "#bbbcc0",
  },
  bar: {
    width: "90%",
    marginLeft: "5%",
  },
  button: {
    position: "absolute",
    marginTop: "20%",
    marginLeft: "17.0%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 60,
    borderRadius: 4,
    backgroundColor: "rgb(70,145,247)",
  },
  text: {
    marginTop: "-5%",
    fontSize: 24,
    lineHeight: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
