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
import {RecoilRoot,atom,selector,useRecoilState,useRecoilValue,} from 'recoil';

import { userInputs, loggedState, ticketNum, bagIds } from "../store/States";

const data = [
  {
    label: "5A",
    value: "1",
  },
  { label: "5B", value: "2" },
  { label: "5C", value: "3" },
  { label: "6A", value: "4" },
  { label: "6B", value: "5" },
  { label: "6C", value: "6" },
];

const data1 = [
  {
    label: "0",
    value1: "1",
},
  { label: "1", value1: "2" },
  { label: "2", value1: "3" },
  { label: "3", value1: "4" },
  { label: "4", value1: "5" },
  { label: "5", value1: "6" },
  { label: "6", value1: "7" },
  { label: "7", value1: "8" },
  { label: "8", value1: "9" },
  { label: "9", value1: "10" },

];

const BagSeat = ({func}) => {
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);

  const [isFocus, setIsFocus] = useState(true);
  const [isFocus1, setIsFocus1] = useState(true);

  const [seat, setSeat] = useState('')
  const [bags, setBags] = useState('')

  const [inputs, setInputs] = useRecoilState(userInputs)
  const [user, setUser] = useRecoilState(loggedState)
  const [ticket, setTicket] = useRecoilState(ticketNum)
  const [ids, setId] = useRecoilState(bagIds)

  const handleClick = () => {
    console.log(seat, bags)
    setInputs({
      seat: seat,
      bags: parseInt(bags)
    })
    fetch('http://127.0.0.1:5000/api/post', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "username": user.name,
          "query": {
              "type": "checkin_bags",
              "flight_number": ticket[1].flight.name,
              "bag_count": parseInt(bags)
          }
        })
      }).then(response => response.json())
        .then(res => {
          console.log(res[1])
        setId(res[1])
    })
    func(1)
  }

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
          setSeat(item.label)
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
        valueField="value1"
        placeholder={!isFocus1 ? "Select item" : "How many bags do you have?"}
        searchPlaceholder="Search..."
        value={value1}
        onFocus={() => setIsFocus1(true)}
        onBlur={() => setIsFocus1(true)}
        onChange={(item) => {
          setBags(item.label)
          setValue1(item.value1);
          setIsFocus1(false);
        }}
        renderLeftIcon={() => (
          <Image style={styles.companylogo} source={bb}></Image>
        )}
       
      />
       <Pressable style={styles.button} onPress={handleClick}>
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
