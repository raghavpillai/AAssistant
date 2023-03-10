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
import {useRecoilState} from 'recoil';
import { bagIds } from "../store/States";

export default function BagConfirmation() {
  const [ids, setIds] = useRecoilState(bagIds)

  const list = [{ id: "1" }];
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
        Check-in successful!
        </Text>
        <View style={styles.cc}>
          <Text style={styles.txt}>Bag IDs</Text>
          {ids && ids.map((item, key) => {
            return (
              <Text key={key} style={styles.subtext}>{item}</Text>
            )
          })}
        </View>
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
  cc: {
    marginLeft: '9%',
    width: '80%',
    height: '150%',
    display: 'flex',
    borderRadius:'19',
  },
  subtext: {
    color: 'black',
    display: 'flex',
    textAlign: "center",
    backgroundColor: 'rgb(70,145,247)',
    width: '30%',
    marginLeft: '35%',
    height: "20%",
    justifyContent: 'center',
    marginTop: '0%',
    borderRadius: '15',
    color: 'white',
  },
  txt: {
    textAlign: 'center',
    marginBottom: '5%',
    fontSize: 24,
  }
});
