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

export default function BagConfirmation() {
  const list = [{ id: "1" }];
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
        `Check-in successful! 
        Bag ID's {'\n'} 12345 {'\n'} 12345

        </Text>
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
    color: "black",
  },
});
