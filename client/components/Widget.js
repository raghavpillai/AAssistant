import { StyleSheet, ImageBackground, Image, Text, View } from "react-native";
import {
  Center,
  Heading,
  Box,
  VStack,
  FormControl,
  Button,
  Input,
} from "native-base";
import * as Progress from "react-native-progress";
import t from '../assets/test.png'


export default function Widget({departure, flightNum, gate}) {
  const date = new Date(departure * 1000);
  return (
    <>
      <View style={styles.container}>
        <View style={[styles.row, styles.spacersm]}>
          <Text style={[styles.item, styles.bold]}>DFW</Text>
          <Text style={[styles.item, styles.bold]}>LHR</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.item]}>Dallas</Text>
          <Text style={[styles.item]}>London</Text>
        </View>
        <View>
            <Progress.Bar progress={1} width={315} color={'rgba(230,230,230, 1)'} style={[styles.bar, styles.spacersm]}/>
        </View>
        <View style={[styles.row, styles.spacersm]}>
          <Text style={[styles.item, styles.light, styles.bold]}>
            Departure
          </Text>
          <Text style={[styles.item, styles.light, styles.bold]}>
            Flight Number
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.item]}>{date.getMonth()+1}/{date.getDate()}</Text>
          <Text style={[styles.item]}>{flightNum}</Text>
        </View>
        <View style={[styles.row, styles.spacersm]}>
          <Text style={[styles.item, styles.light, styles.bold]}>Time</Text>
          <Text style={[styles.item, styles.light, styles.bold]}>Terminal</Text>
          <Text style={[styles.item, styles.light, styles.bold]}>Gate</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.item]}>{date.getHours() % 12}:{date.getMinutes()}PM</Text>
          <Text style={[styles.item]}>{gate[0]}</Text>
          <Text style={[styles.item]}>{gate}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 7,
    width: "95%",
    height: "20%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  spacersm: {
    marginTop: "3.5%",
  },
  spacerlg: {
    marginTop: "10%",
  },
  light: {
    color: "#bbbcc0",
  },
  bar: {
    width: "90%",
    height: '10%',
    marginLeft: "5%",
  },
});
