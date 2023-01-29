import React from "react";
import { useState } from "react";
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, extendTheme, Text, Box, View } from "native-base";
import { StyleSheet } from "react-native";
import Login from "./screens/Login.js";
import LandingPage from "./screens/LandingPage.js";
import FindTrip from "./screens/FindTrip.js";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {RecoilRoot,atom,selector,useRecoilState,useRecoilValue,} from 'recoil';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  // 2. Use at the root of your app

  const [logged, setLogged] = useState(undefined)

  if(logged !== undefined){
    return (
      <RecoilRoot>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={FindTrip}/>
            <Tab.Screen name="Dashboard" component={LandingPage} />
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
      </RecoilRoot>
    );
  }
  else{
    return (
      <RecoilRoot>
      <NativeBaseProvider theme={theme}>
        <Login func={setLogged}/>
      </NativeBaseProvider>
      </RecoilRoot>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
});

const theme = extendTheme({
  components: {
    Button: {
      // Can simply pass default props to change default behaviour of components.
      baseStyle: {
        rounded: "md",
      },
      defaultProps: {
        colorScheme: "red",
      },
    },
  },
});
