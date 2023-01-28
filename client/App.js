import React from "react";
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, extendTheme, Text, Box, View } from "native-base";
import {StyleSheet} from 'react-native';
import Login from './screens/Login.js'
import LandingPage from "./screens/LandingPage.js";
export default function App() {
  // 2. Use at the root of your app
  return (
    <NativeBaseProvider theme={theme}>
      <View style={styles.container}>
        {/* <LandingPage/> */}
        <Login/>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '50%'
  },
});

const theme = extendTheme({
    components: {
      Button: {
        // Can simply pass default props to change default behaviour of components.
        baseStyle: {
          rounded: 'md',
        },
        defaultProps: {
          colorScheme: 'red'
        },
      },
    }
  });
