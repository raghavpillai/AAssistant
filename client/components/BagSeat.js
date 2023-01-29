import React, { useState } from "react";
import {
  TextInput,
  Input,
  Box,
  Heading,
  VStack,
  FormControl,
} from "native-base";

import { Button, StyleSheet, Text, View, Image, Pressable } from "react-native";
import aa from '../assets/seat.png'
import bb from '../assets/luggage.png'


import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import BagConfirmation from "./BagConfirmation";
import { RNSVGSymbol } from "react-native-svg";
const data = [
  {
    label: "8A",
    value: "1",
  },
  { label: "8B", value: "2" },
  { label: "8C", value: "3" },
  { label: "9A", value: "4" },
  { label: "9B", value: "5" },
  { label: "9C", value: "6" },
];

const data1 = [
  {
    label: "0",
    value: "1",
  },
  { label: "1", value: "2" },
  { label: "2", value: "3" },
  { label: "3", value: "4" },
  { label: "4", value: "5" },
  { label: "5", value: "6" },
  { label: "6", value: "6" },
  { label: "7", value: "6" },
  { label: "8", value: "6" },
  { label: "9", value: "6" },

];

const BagSeat = ({func}) => {
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);

  const [isFocus, setIsFocus] = useState(true);
  const [isFocus1, setIsFocus1] = useState(true);

  const [text, onChangeText] = React.useState("");
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "rgb(70,145,247)" }]}>Seat</Text>
      );
    }
    return null;
  };

  const renderLabel1 = () => {
    if (value1 || isFocus1) {
      return (
        <Text style={[styles.label1, isFocus1 && { color: "rgb(70,145,247)" }]}>Bag</Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "rgb(70,145,247)" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.arrowIconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "Select your seat"}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(true)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Image style={styles.companylogo} source={aa}></Image>
        )}
      />
      {renderLabel1()}
      <Dropdown
        style={[styles.dropdown, isFocus1 && { borderColor: "rgb(70,145,247)" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.arrowIconStyle}
        data={data1}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus1 ? "Select item" : "How many bags do you have?"}
        searchPlaceholder="Search..."
        value={value1}
        onFocus={() => setIsFocus1(true)}
        onBlur={() => setIsFocus1(true)}
        onChange={(item) => {
          setValue1(item.value1);
          setIsFocus1(false);
        }}
        renderLeftIcon={() => (
          <Image style={styles.companylogo} source={bb}></Image>
        )}
       
      />
       <Pressable style={styles.button} onPress={() => func(2)}>
          <Text style={styles.text}>Submit</Text>
        </Pressable>
    </View>
  );
};




export default BagSeat;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: "10%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 14,
  },
  label1: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 12,
    left: 22,
    top: 90,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  temp: {
    width: "100%",
  },
  btn: {
    marginTop: "100%",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  companylogo: {
    width: '6%',
    height: '60%',
    marginLeft: '1%',
    marginRight: '3.5%',
  },
  button: {
    position: "absolute",
    marginTop: "52.5%",
    marginLeft: "21.5%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2.5,
    paddingHorizontal:80,
    borderRadius: 4,
    backgroundColor: 'rgb(70,145,247)',
  },
  text: {
    color:'white',
  }
});