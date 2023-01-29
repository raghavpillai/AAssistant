import React from 'react';
import { useState } from 'react';
import {ImageBackground, StyleSheet, Text, View, Image, Pressable} from 'react-native';
import { Center, Heading, Box, VStack, FormControl, Input,Button } from "native-base";

import bgimg from '../assets/wallpaperflare.com_wallpaper.jpg'
import aa from '../assets/aatop.png'
import logoimg from '../assets/logo.png'
import chat from '../assets/chat.png'
import mail from '../assets/mail.png'
import Widget from '../components/Widget.js'
import CheckInButton from '../components/CheckInButton';
import ToAirport from '../components/ToAirport';
import BagSeat from '../components/BagSeat';
import BagConfirmation from '../components/BagConfirmation';
import ToSecurity from '../components/ToSecurity';
import ToGate from '../components/ToGate';
import Boarding from '../components/Boarding';
import SeatFinal from '../components/SeatFinal'

export default function FindTrip() {   
    return(
    <ImageBackground source={bgimg} resizeMode="cover" style={styles.image}>
      <View style={styles.top}>
        <Image style={styles.logoimg} source={logoimg}></Image>
        <Text style={styles.imgtxt}>Find Trip</Text>
        <Center w="120%" style={styles.container} blurRadius={5}>
        <Box safeArea p="2" w="100%" maxW="380" py="8">
          
          <VStack space={3} mt="5" style={styles.stack}>
            <FormControl>
              <Input _text={{color: "#ffffff"}} type="" />
            </FormControl>
            <FormControl>
              <Input _text={{color: "#ffffff"}} type="password" />
            </FormControl>
            <FormControl>
              <Input _text={{color: "#ffffff"}} type="password" />
            </FormControl>
         
            <Button mt="2" _pressed={{backgroundColor: "#1153a9"}} bg="#3375cb">
              Search
            </Button>
          </VStack>
        </Box>
      </Center>
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
 
  },
  logo: {
    padding: '10%',
  },
  companylogo: {
    width: 160,
    height: 40,
    marginLeft: "23%",
    marginTop: "10%",
  },
  logoimg: {
    width: 60,
    height: 50,
    marginTop: "10%",
  },
  imgtxt: {
    width: 100,
    height: 60,
    marginTop: "15%",
    fontSize: '26',
    color: 'white',
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
  stack: {
    backgroundColor: "white",
    marginRight: '20%',
  }
});