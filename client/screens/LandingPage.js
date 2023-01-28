import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Box, Image} from 'react-native';

import bgimg from '../assets/wallpaperflare.com_wallpaper.jpg'
import aa from '../assets/aatop.png'
import logoimg from '../assets/logo.png'
import chat from '../assets/chat.png'
import mail from '../assets/mail.png'
import Widget from '../components/Widget.js'

const LandingPage = () => (

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
          <Text style={[styles.bold, styles.major]}>Check into security in 48h</Text>
        </View>
      </View>

      <View style={styles.card}></View>

    </ImageBackground>
    

);

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
    marginTop: '5%'
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
    fontSize: '20px'
  },

  
});

export default LandingPage;