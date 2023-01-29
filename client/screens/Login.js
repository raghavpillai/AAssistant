import { useState } from 'react';
import {StyleSheet, ImageBackground, Image, Text} from 'react-native';
import { Center, Heading, Box, VStack, FormControl, Button, Input } from "native-base";
import bgimg from '../assets/wallpaperflare.com_wallpaper.jpg'
import aa from '../assets/aa.png'

export default function Login(){

    const [username, setUser] = useState({})
    const [password, setPass] = useState({})
    const [error, setError] = useState(false)

    const handleClick = () => {
      if(username.val === '' || password.val === ''){
        setError(true)
      }
      else {
        setError(false)
      }      
    }

    return (
      <>
      <ImageBackground style={styles.image} source={bgimg}></ImageBackground>
      <Image source={aa} style={styles.logo}></Image>
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
              <Input _text={{color: "#ffffff"}} type="" onChangeText={value => setUser({ ...username, val: value})}/>
            </FormControl>
            <FormControl>
              <FormControl.Label _text={{color: "#000000"}}>Password</FormControl.Label>
              <Input _text={{color: "#ffffff"}} type="password" onChangeText={value => setPass({ ...password, val: value})}/>
            </FormControl>
            <Button mt="2" _pressed={{backgroundColor: "#1153a9"}} bg="#3375cb" onPress={handleClick}>
              Sign In
            </Button>
          </VStack>
        </Box>
        {error && 
            <Text style={styles.error}>Fields Can't Be Empty</Text>
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
      marginTop: '-5%',
      width: '100%',

    },
    error: {
      color: 'red',
      marginTop: '-10%',
      paddingBottom: '10%'
    }
});
