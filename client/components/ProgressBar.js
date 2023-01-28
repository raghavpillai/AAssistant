import {StyleSheet, ImageBackground, Image, Text, View} from 'react-native';
import { Center, Heading, Box, VStack, FormControl, Button, Input } from "native-base";
import * as Progress from 'react-native-progress';

export default function ProgressBar(){
    return (
      <>
        <Progress.Bar progress={0.29} width={350} color={'rgba(71,137,223, 1)'} borderColor={"white"} borderWidth={.4}/>
      </>
      )
      ;
  };
