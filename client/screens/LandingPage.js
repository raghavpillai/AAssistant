import React from 'react';
import { useState } from 'react';
import {ImageBackground, StyleSheet, Text, View, Box, Image, Button} from 'react-native';

import bgimg from '../assets/wallpaperflare.com_wallpaper.jpg'
import aa from '../assets/aatop.png'
import logoimg from '../assets/logo.png'
import chat from '../assets/chat.png'
import mail from '../assets/mail.png'
import Widget from '../components/Widget.js'
import CheckInButton from '../components/CheckInButton';
import ToAirport from '../components/ToAirport';
import BagSeat from '../components/BagSeat';

export default function LandingPage() {
    const [view, setView] = useState(0)
    const Page = () => {
        if(view == 0){
            return(<ToAirport />)
        }
        else if(view == 1){
            return(<CheckInButton func={setView}/>)
        }
        else{
            return(<BagSeat />)
        }
    }

    // const items = [a, b, a]
    const handleClick = (side) => {
      if(side === "left"){
          if(view == 0){
              setView(3)
          }
          else{
              setView(Math.abs(view-1)%3)
          }
      }
      else{
          setView(Math.abs(view+1)%3)
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
      
      <View style={styles.widget}><Widget /></View>
      
      <View style={styles.task}>
        <View style={[styles.spacersm, styles.row]}>
          <Text style={[styles.light, styles.bold]}>Task</Text>
          <Text style={[styles.bold, styles.major]}>Check-in to your flight in 48 hrs.</Text>
        </View>
      </View>

        <View  style={styles.card}>
            <View style={styles.buttonrow}>
              <Button title="back" style={styles.btn1} onPress={()=>handleClick("left")} />
              <Button title="next" style={styles.btn2} onPress={()=>handleClick("right")} />
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
      marginTop: '5%',
      marginLeft: '5%'
  },
  light: {
    color: "#bbbcc0"
  },
  major: {
    fontSize: '20px',
  },
  btn1: {
    position: "absolute",
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',

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
    justifyContent: 'center'
  }
});