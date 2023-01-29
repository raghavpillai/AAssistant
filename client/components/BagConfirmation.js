import {StyleSheet, ImageBackground, Image, Text, Button, View} from 'react-native';
import { Center, Heading, Box, VStack, FormControl,  Input } from "native-base";
import * as Progress from 'react-native-progress';

export default function BagConfirmation(){
    return (
      <>
        <View style={styles.container}>
        <Text style={styles.text}>Your bags have been confirmed. Their ID's are:  </Text>
        </View>
      </>
      );
  };

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 7,
        width: '95%',
        height: '30%'
    },
    text: {
        marginTop: '-5%',
        fontSize: 24,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

});
