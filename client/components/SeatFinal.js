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
  import seat from "../assets/8a.jpg";
  import { userInputs } from "../store/States";
  import {useRecoilState} from 'recoil';
    
  export default function ToGate() {
    const [seatNum, setSeatNum] = useRecoilState(userInputs)
    console.log(seatNum.seat)
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.big}>{seatNum.seat}</Text>
          <Image style={styles.map1} source={seat}></Image>
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
      width: "74%",
      height: "382%",
      marginLeft: '15.75%',
      transform: [{ rotate: '270deg'}],
    },
    big: {
      color: '#59eb00',
      weight: 'bold',
      fontSize: 42,
      position: 'absolute',
      marginLeft: '35%',
      textAlign: 'center',
    
    }
  });
  