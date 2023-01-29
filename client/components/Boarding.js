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
      "N/A": [0, "Boarding has not begun"],
      "Unconfirmed": [0, "Boarding has not begun"],
      "At Gate": [1, "Boarding will begin soon. Be ready for your group!"],
      "Boarding First Class": [2, "Now boarding First Class. Group A up next."],
      "Boarding Group A": [3, "Now boarding Group A. Group B up next."],
      "Boarding Group B": [4, "Now boarding Group B. Group C up next."],
      "Boarding Group C": [5, "Now boarding Group C. Group D up next."],
      "Boarding Group D": [6, "Now boarding Group D. Enjoy your flight!"],
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
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    },[])

    return (
      <>
        <View style={styles.container}>
            <Text style={styles.text}>{items[status][1]}</Text>
            <Progress.Bar progress={items[status][0]/6} width={315} color={'rgba(51,117,203,1)'} borderColor={"gray"} borderWidth={.4} style={styles.bar}/>
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
        marginLeft: "5.5%",
        marginTop: "20%"
      }
  });
  