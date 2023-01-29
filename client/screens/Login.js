import { useState } from 'react';
import {StyleSheet, ImageBackground, Image, Text} from 'react-native';
import { Center, Heading, Box, VStack, FormControl, Button, Input } from "native-base";
import bgimg from '../assets/wallpaperflare.com_wallpaper.jpg'
import aa from '../assets/aatop.png'
import logo from '../assets/logo.png'
import {RecoilRoot,atom,selector,useRecoilState,useRecoilValue,} from 'recoil';

import { loggedState } from '../store/States';

export default function Login({func}){

    const [username, setUser] = useState({})
    const [password, setPass] = useState({})
    const [error, setError] = useState(false)
    const [user, setU] = useRecoilState(loggedState)

    const handleClick = () => {
      if(username.val === '' || password.val === ''){
        setError("Cannot have empty fields")
      }
      else {
        fetch('http://127.0.0.1:5000/api/post', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "username": username.val,
            "query": {
                "type": "login",
                "password": password.val
            }
          })
        }).then(response => response.json())
        .then(res => {
          if(!res[0]){
            setError(res[1])
          }
          else{
            setError(false)
            setU(res[1])
            func(true)
          }
        })
        
      }      
    }

    return (
      <>
      <ImageBackground style={styles.image} source={bgimg}></ImageBackground>
      <Image source={aa} style={styles.logo}></Image>
      <Image source={logo} style={styles.img}></Image>

    <Center w="80%" style={styles.container} blurRadius={5}>
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading size="lg" color="coolGray.800" fontWeight="semibold">
            Welcome
          </Heading>
          <Heading mt="1" color="#000000" fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label _text={{color: "#000000"}}>Username</FormControl.Label>
              <Input autoCapitalize="none" _text={{color: "#ffffff"}} type="" onChangeText={value => setUser({ ...username, val: value})}/>
            </FormControl>
            <FormControl>
              <FormControl.Label _text={{color: "#000000"}}>Password</FormControl.Label>
              <Input autoCapitalize="none" _text={{color: "#ffffff"}} type="password" onChangeText={value => setPass({ ...password, val: value})}/>
            </FormControl>
            <Button mt="2" _pressed={{backgroundColor: "#1153a9"}} bg="#3375cb" onPress={handleClick}>
              Sign In
            </Button>
          </VStack>
        </Box>
        {error && 
            <Text style={styles.error}>{error}</Text>
        }
      </Center>

      </>
      )
      ;
  };
  
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '175%',
        marginTop: '-100%',
        position: 'absolute',
    },
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      marginLeft: '10%',
      borderRadius: 10,
      marginTop: '60%'
    },
    label: {
        color: '#ffffff'
    },
    logo: {
      position: 'absolute',
      marginTop: '25%',
      marginLeft: '17%',
      width: '30%',
      height: '-5%'
    },
    img: {
      position: 'absolute',
      width: '20%',
      height: '6%',
      marginLeft: '58%',
      marginTop: '22%',
    },
    error: {
      color: 'red',
      marginTop: '-10%',
      paddingBottom: '10%'
    }
});
