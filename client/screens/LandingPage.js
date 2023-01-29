import React, { useEffect } from 'react';
import { useState } from 'react';
import {ImageBackground, StyleSheet, Text, View, Box, Image, Button, Pressable} from 'react-native';

import bgimg from '../assets/wp.png'
import aa from '../assets/aatop.png'
import logoimg from '../assets/logo.png'
import chat from '../assets/chat.png'
import mail from '../assets/mail.png'
import Widget from '../components/Widget.js'
import BagSeat from '../components/BagSeat';
import BagConfirmation from '../components/BagConfirmation';
import ToSecurity from '../components/ToSecurity';
import ToGate from '../components/ToGate';
import Boarding from '../components/Boarding';
import SeatFinal from '../components/SeatFinal'
import DelayBreakdown from '../components/DelayBreakdown';

import * as Progress from "react-native-progress";

import { useRecoilState } from 'recoil';

import { loggedState, ticketNum, securityGate } from '../store/States';

export default function LandingPage() {
    const [view, setView] = useState(0)

    const [user, setU] = useRecoilState(loggedState)
    const [ticket, setTicket] = useRecoilState(ticketNum)
    const [security, setSecurity] = useRecoilState(securityGate)
  
    const Page = () => {
        if (view == 0){
            return(<BagSeat func={setView}/>)
        }
        else if (view == 1){
            return(<BagConfirmation/>)
        }
        else if (view == 2) {
          console.log(security)
          return(<ToSecurity security={security}/>)
        }
        else if (view == 3) {
          return (<ToGate security={security} gate={ticket[1][0].gate}/>)
        }
        else if (view == 4) {
          return (<Boarding/>)
        }
        else if(view == 5) {
          return (<SeatFinal/>)
        }
        else {
          return  (<DelayBreakdown />)
        }
          
          
    }

    const Task = () => {
    if (view == 0) {
          return (<Text>Choose a seat and bag amount</Text>)
        }
        else if (view == 1) {
          return (<Text>Note down your bag id's</Text>)
        }
        else if (view == 2) {
          return (<Text>Make your way to the airport terminal</Text>)
        }
        else if (view == 3) {
          return (<Text>Make your way to your gate</Text>)
        }
        else if (view == 4) {
          return (<Text>Wait for your group to be called</Text>)
        }
        else if (view == 5)
          return (<Text>Make your way to your seat</Text>)
        else {
          return (<Text>View your time break down</Text>)
        }
    }

    const handleClick = (side) => {
      if(side === "left"){
          if(view == 0){
              setView(0)
          }
          else{
              setView(Math.abs(view-1))
          }
      }
      else{
        if (view == 6) {
          setView(6)
        }
        else
          setView(Math.abs(view+1))
      }
    }
    return(

    <ImageBackground source={bgimg} resizeMode="cover" style={styles.image}>
      <View style={styles.top}>
        <Image style={styles.companylogo} source={aa}></Image>
        <Image style={styles.logoimg} source={logoimg}></Image>
        <Text>                                     </Text>
        <Image source={chat}></Image>
        <Text>      </Text>
        <Image source={mail}></Image>
      </View>
      
      <View style={styles.widget}>
        <Widget 
          departure={ticket[1][0].departure_time}
          flightNum={ticket[1][0].name}
          gate={ticket[1][0].gate}
        />
      </View>
      
      <View style={styles.task}>
        <View style={[styles.spacersm, styles.row]}>
          <Text style={[styles.bold, styles.major]}><Task/></Text>
        </View>
      </View>

        <View style={styles.card}>
            <View style={styles.buttonrow}>
           
        <Button title="<" style={styles.btn1} onPress={()=>handleClick("left")} />
             
              <Button title=">" style={styles.btn2} onPress={()=>handleClick("next")} />
            </View>
            <Page style={styles.page}/>
            
        </View>
    </ImageBackground>
    )
    

};

const styles = StyleSheet.create({
  image: {
    height: "100%",
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 20,
    lineHeight: 84,
    fontWeight: 'bold',
    padding: "10%",
  },
  top: {
    flexDirection:'row', 
    flexWrap:'wrap',
    paddingTop: '15%',
    paddingLeft: '8%',
  },
  logo: {
    padding: '10%',

  },
  companylogo: {
    width: 80,
    height: 20,
  },
  logoimg: {
    width: 30,
    height: 25
  },
  widget: {
    paddingLeft: '5%',
    paddingTop: '10%',
    height: 1000,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 7,
    height: '40%',
    width: '90%',
    marginLeft: '5%',
    marginTop: '5%',
    position: 'relative',
  },
  task: {
    marginTop: '-192%',
    marginLeft: '5%',
    height: '10%',
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 7,
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
  },    
  bold: {
    fontWeight: 'bold'
  },
  spacersm: {
      marginHorizontal: '8%',
      marginTop: '7%'
  },
  light: {
    color: "#bbbcc0"
  },
  major: {
    fontSize: '20px',
    justifyContent: "center"
  },
  btn1: {
    position: "absolute",
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgb(70,145,247)',
  },
  btn2: {
    position: "absolute",
    flex: 1,
    justifyContent: 'center',  
    textAlign: 'center'  
  },
  page: {
    flex:2,
  },
  buttonrow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around',
    color: 'black',
  }
});