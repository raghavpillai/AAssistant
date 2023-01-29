import {StyleSheet, ImageBackground, Image, Text, View} from 'react-native';
import { Center, Heading, Box, VStack, FormControl, Button, Input } from "native-base";
import * as Progress from 'react-native-progress';

export default function Widget(){
    return (
      <>
        <View style={styles.container}>
            <View style={[styles.row, styles.spacersm]}> 
                <Text style={[styles.item, styles.bold]}>LHR</Text>
                <Text style={[styles.item, styles.bold]}>SFO</Text>
            </View>
            <View style={styles.row}> 
                <Text style={[styles.item]}>London</Text>
                <Text style={[styles.item]}>San Francisco</Text>
            </View>
            <View>
                <Progress.Bar progress={0.1} width={320} color={'rgba(71,137,223, 1)'} borderColor={"black"} borderWidth={.4} style={[styles.bar, styles.spacersm]}/>
            </View>
            <View style={[styles.row, styles.spacersm]}> 
                <Text style={[styles.item, styles.light, styles.bold]}>Departure</Text>
                <Text style={[styles.item, styles.light, styles.bold]}>Flight Number</Text>
            </View>
            <View style={styles.row}> 
                <Text style={[styles.item]}>Feb 25, 2022</Text>
                <Text style={[styles.item]}>123456</Text>
            </View>
            <View style={[styles.row, styles.spacersm]}> 
                <Text style={[styles.item, styles.light, styles.bold]}>Gate</Text>
                <Text style={[styles.item, styles.light, styles.bold]}>Terminal</Text>
            </View>
            <View style={styles.row}> 
                <Text style={[styles.item]}>15</Text>
                <Text style={[styles.item]}>E</Text>
            </View>
        </View>
      </>
      )
      ;
  };

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 7,
        width: '95%',
        height: '20%'
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
    },
    bold: {
        fontWeight: 'bold'
    },
    spacersm: {
        marginTop: '5%'
    },
    spacerlg: {
        marginTop: '10%'
    },
    light: {
        color: "#bbbcc0"
    },
    bar: {
        width: '90%',
        marginLeft: '5%',
    },

});
