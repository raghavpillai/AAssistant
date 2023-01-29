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
        Check-in successful!
        </Text>
        <View style={styles.bottomform}><Text style={styles.subtext}>Hi</Text></View>
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
  text: {
    padding: "5%",
    fontSize: 24,
    lineHeight: 25,
    letterSpacing: 0.25,
    color: "rgb(70,145,247)",
    textAlign: "center",
  },
  bottomform: {
    backgroundColor: 'rgb(70,145,247)',
    marginLeft: '9%',
    width: '80%',
    height: '150%',
  },
  subtext: {
    color: 'white',
  }
});
