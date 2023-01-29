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
    <ImageBackground source={bgimg} resizeMode="cover" style={styles.image} h="20%">
        <Image source={logoimg} style={styles.img}></Image>
      <View style={styles.top}>
        <Center w="80%" style={styles.container} blurRadius={5}>
        <Box safeArea p="2" w="90%" maxW="290" py="8"  marginBottom="30%" >
          <Heading size="lg" color="coolGray.800" fontWeight="semibold" >
          </Heading>
          <Heading mt="1" color="#000000" fontWeight="medium" size="xs" >
          </Heading>
          <VStack space={3} mt="5" style={styles.stack}>
            <FormControl>
              <FormControl.Label _text={{color: "rgb(103,121,134)"}}>First Name</FormControl.Label>
              <Input _text={{color: "#ffffff"}} type="" />
            </FormControl>
            <FormControl>
              <FormControl.Label _text={{color: "rgb(103,121,134)"}}>Last Name</FormControl.Label>
              <Input _text={{color: "#ffffff"}} type="" />
            </FormControl>
            <FormControl>
              <FormControl.Label _text={{color: "rgb(103,121,134)"}}>Record locator / ticket or credit number</FormControl.Label>
              <Input _text={{color: "#ffffff"}} type="" />
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
        width: '100%',
        height: '120%',
        marginTop: '-10%',
        position: 'absolute',
    },
    container: {
    height: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      marginLeft: '10%',
      borderRadius: 10,
      marginTop: '65%',
      marginLeft: '13.5%',
    },
    label: {
        color: '#ffffff'
    },
    logo: {
      position: 'absolute',
      marginTop: '-5%',
      width: '100%',
    },
    img: {
        height: 80,
        weight: 20,
    }
 
});