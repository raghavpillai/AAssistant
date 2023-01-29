import React from 'react';
import { useState } from 'react';
import {ImageBackground, StyleSheet, Text, View, Image, Pressable} from 'react-native';
import { Center, Heading, Box, VStack, FormControl, Input,Button } from "native-base";

import bgimg from '../assets/wallpaperflare.com_wallpaper.jpg'
import logoimg from '../assets/logo.png'

import {RecoilRoot,atom,selector,useRecoilState,useRecoilValue,} from 'recoil';

import { loggedState, ticketNum } from '../store/States';

export default function FindTrip({ navigation }) {   

  const [fname, setFname] = useState({})
  const [lname, setLname] = useState({})
  const [user, setU] = useRecoilState(loggedState)
  const [ticket, setTicket] = useRecoilState(ticketNum)

  const handleClick = () => {
    console.log(user)
    console.log(user.name)
    console.log(ticket)
    fetch('http://127.0.0.1:5000/api/post', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": user.name,
        "query": {
            "type": "get_flight_status",
            "flight_number": ticket.value
        }
      })
    }).then(response => response.json())
    .then(res => {
      console.log(res)
      setTicket(res)
      navigation.navigate('Dashboard')
    })
    
  }

    return(
    <ImageBackground source={bgimg} resizeMode="cover" style={styles.image} h="20%">
      <View style={styles.top}>
        <Image style={styles.logoimg} source={logoimg}></Image>
        <Text style={styles.companylogo}>Find Trips</Text>
        <Center w="80%" style={styles.container} blurRadius={5}>
        <Box safeArea p="2" w="90%" maxW="290" py="8"  marginBottom="30%" >
          <Heading size="lg" color="coolGray.800" fontWeight="semibold" >
          </Heading>
          <Heading mt="1" color="#000000" fontWeight="medium" size="xs" >
          </Heading>
          <VStack space={3} mt="5" style={styles.stack}>
            <FormControl>
              <FormControl.Label _text={{color: "rgb(103,121,134)"}}>First Name</FormControl.Label>
              <Input _text={{color: "#ffffff"}} type="" onChangeText={value => setFname({ ...fname, val: value})}/>
            </FormControl>
            <FormControl>
              <FormControl.Label _text={{color: "rgb(103,121,134)"}}>Last Name</FormControl.Label>
              <Input _text={{color: "#ffffff"}} type="" onChangeText={value => setLname({ ...lname, val: value})}/>
            </FormControl>
            <FormControl>
              <FormControl.Label _text={{color: "rgb(103,121,134)"}}>Record locator / ticket or credit number</FormControl.Label>
              <Input _text={{color: "#ffffff"}} type="" onChangeText={value => setTicket({value})}/>
            </FormControl>
            <Button mt="2" _pressed={{backgroundColor: "#1153a9"}} bg="#3375cb" onPress={handleClick}>
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
      marginTop: '55%',
      marginLeft: '10%',
    },
    label: {
        color: '#ffffff'
    },
    logo: {
      position: 'absolute',
      marginTop: '-5%',
      width: '100%',
    },
    companylogo: {
      width: 100,
      height: 1,
      marginTop: '37%',
      marginLeft: '38%',
      position: "absolute",
      fontSize: 30,
      color: "#ffffff",
      fontWeight: 'bold',
    },
    logoimg: {
      width: "10%",
    
      height: '-1%',
      marginTop: '31%',
      marginLeft: '13%',
      position: "absolute",
    },
    top: {
      flexDirection:'row', 
      flexWrap:'wrap',
      paddingTop: '15%',
    },
  
 
});