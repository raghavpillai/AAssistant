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


export default function Widget() {
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
            <Progress.Bar progress={1} width={315} color={'rgba(150,150,150, 1)'} borderColor={"gray"} borderWidth={.4} style={[styles.bar, styles.spacersm]}/>
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
          <Text style={[styles.item]}>Jan 31, 2023</Text>
          <Text style={[styles.item]}>AA 20</Text>
        </View>
        <View style={[styles.row, styles.spacersm]}>
          <Text style={[styles.item, styles.light, styles.bold]}>Time</Text>
          <Text style={[styles.item, styles.light, styles.bold]}>Terminal</Text>
          <Text style={[styles.item, styles.light, styles.bold]}>Gate</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.item]}>3:25 pm</Text>
          <Text style={[styles.item]}>D</Text>
          <Text style={[styles.item]}>D25</Text>
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
    marginLeft: "5%",
  },
});
