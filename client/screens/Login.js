import {StyleSheet, ImageBackground} from 'react-native';
import { Center, Heading, Box, VStack, FormControl, Button, Input } from "native-base";
import bgimg from '../assets/wallpaperflare.com_wallpaper.jpg'

export default function Login(){
    return (
        
    <Center w="100%">
        <ImageBackground style={styles.image} source={bgimg} blurRadius={5}></ImageBackground>
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading size="lg" color="coolGray.800" fontWeight="semibold">
            Welcome
          </Heading>
          <Heading mt="1" color="#ffffff" fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label _text={{color: "#ffffff"}}>Username</FormControl.Label>
              <Input _text={{color: "#ffffff"}} type="" />
            </FormControl>
            <FormControl>
              <FormControl.Label _text={{color: "#ffffff"}}>Password</FormControl.Label>
              <Input _text={{color: "#ffffff"}} type="password" />
            </FormControl>
            <Button mt="2" _pressed={{backgroundColor: "#1153a9"}} bg="#3375cb">
              Sign In
            </Button>
          </VStack>
        </Box>
      </Center>
      )
      ;
  };
  
const styles = StyleSheet.create({
    image: {
        width: '150%',
        height: '150%',
        marginTop: '-100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0, 0.5)'
    },
    container: {
        marginTop: '50%'
    },
    label: {
        color: '#ffffff'
    }
});
