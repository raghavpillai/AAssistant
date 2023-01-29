import { useState, useEffect } from "react";

import {
    StyleSheet,
    ImageBackground,
    Image,
    Text,
    Button,
    View,
  } from "react-native";
  import { Center, Heading, Box, VStack, FormControl, Input } from "native-base";

  import { useRecoilState } from 'recoil';

  import { loggedState, ticketNum} from '../store/States';

  import * as Progress from "react-native-progress";
  import ProgressBar from "./ProgressBar";
  export default function Boarding() {
    const [status, setStatus] = useState('N/A')

    const [user, setU] = useRecoilState(loggedState)
    const [ticket, setT] = useRecoilState(ticketNum)

    const items = {
      "N/A": 0,
      "Unconfirmed": 0,
      "At Gate": 1,
      "Boarding First Class": 2,
      "Boarding Group A": 3,
      "Boarding Group B": 4,
      "Boarding Group C": 5,
      "Boarding Group D": 6
    }

    useEffect(() => {
      let interval = setInterval(() => {
        fetch('http://127.0.0.1:5000/api/post', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
              "username": user.name,
              "query": {
                  "type": "get_flight_status",
                  "flight_number": ticket[1][0].name,
              }
            })
          }).then(response => response.json())
            .then(res => {
              setStatus(res[1].flight.status)
        })
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    },[])

    return (
      <>
        <View style={styles.container}>
            <Text style={styles.text}>Group 1 is now boarding</Text>
            <Progress.Bar progress={items[status]/6} width={315} color={'rgba(51,117,203,1)'} borderColor={"gray"} borderWidth={.4} style={styles.bar}/>
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
      bar: {
        marginLeft: "5.5%"
      }
  });
  