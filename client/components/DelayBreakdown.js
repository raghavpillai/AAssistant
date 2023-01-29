import React from 'react';

import {ImageBackground, StyleSheet, Text, View, Image, Pressable} from 'react-native';
import {useRecoilState} from 'recoil';

import { timeDelay } from '../store/States';

import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie} from "victory-native";

export default function DelayBreakdown() {   

    const [delay, setDelay] = useRecoilState(timeDelay)

    console.log(delay)

    const data = [
        { totalDelay: 1, earnings: delay.totalDelay, label: "Total Time Spent" },
        { travelTime: 2, earnings: delay.travelTime, label: "Time Spent Traveling"},
        { checkpointDelay: 3, earnings: delay.checkpointDelay, label: "Time Spent in Security" },
    ];

    return(
        <View style={styles.container}>
            <View>
                <View style={styles.row}>
                    <Text style={[styles.item, styles.bold]}>Total:</Text>
                    <Text style={styles.item}>{parseFloat(delay.totalDelay/60).toFixed(2)} hours</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.item, styles.bold]}>Commute:</Text>
                    <Text style={styles.item}>{parseFloat(delay.travelTime/60).toFixed(2)} hours</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.item, styles.bold]}>Checkpoints:</Text>
                    <Text style={styles.item}>{parseFloat(delay.checkpointDelay/60).toFixed(2)} hours</Text>
                </View>
                
            </View>
            <View style={styles.chart}>
                <VictoryPie width={250} data={data} 
                x="portion" y="earnings" 
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: "rgba(255, 255, 255, 0)",
      borderRadius: 7,
      width: "95%",
      height: "30%",
    },
    map1: {
      width: "105.27%",
      height: "295%",
      borderRadius: 7,
    },
    chart: {
        marginTop: "-20%",
        marginLeft: "12%",
        width:500,
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },

    bold: {
        fontWeight: 'bold',
    },

    item: {
        flex: 1,
        textAlign: 'center'
    }
});