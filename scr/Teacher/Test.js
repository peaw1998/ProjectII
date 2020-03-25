import React, { Component } from "react";
import { View, Button, Text } from "native-base";
import { StyleSheet } from 'react-native';

export default class TeacherExercise extends Component {
    static navigationOptions = {
        title: 'แบบฝึกหัด',
    };
    render() {
        return (
            <View style={styles.main}>
                <View><Button style={styles.button} onPress={() => {
                    this.props.navigation.navigate('แก้ไขแบบฝึกหัด', {
                        _id: this.props.navigation.getParam('_id', 'test')
                    })
                }}><Text style={styles.font}> แบบฝึกหัด</Text ><Text style={styles.font}>ก่อนเรียน</Text></Button></View>
                <View style={{ marginTop: 80 }}><Button style={styles.button} onPress={() => {
                    this.props.navigation.navigate('แก้ไขแบบฝึกหัด', {
                        _id: this.props.navigation.getParam('_id', 'test')
                    })
                }}><Text style={styles.font}> แบบฝึกหัด</Text ><Text style={styles.font}>หลังเรียน</Text></Button></View>
            </View>
        )
    }
}
const styles = StyleSheet.create(
    {
        main: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#e0e0e0'
        },
        button: {
            justifyContent: 'center',
            width: 350,
            height: 100,
            borderRadius: 20,
            flexDirection: 'column',
            backgroundColor: '#01579b',

        },
        font: {
            fontSize: 30,
            fontFamily: 'Kanit-Bold'
        }
    });