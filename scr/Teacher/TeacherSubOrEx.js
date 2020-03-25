import React, { Component } from 'react';
import { Navigator, NativeModules, Text, StyleSheet, View, ScrollView } from 'react-native';
import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    ListItem
} from 'react-native-material-ui';
import Container from '../Container';
import { Button } from 'native-base'



export default class Main extends Component {

    render() {

        return (
            <View style={styles.Main}>
                <View style={styles.rowContainer}>
                    <View style={styles.button}>
                        <Button raised primary text="Primary" style={styles.button}
                            onPress={() => {
                                this.props.navigation.navigate('บทเรียน', {
                                    _id: this.props.navigation.getParam('_id', 'test')
                                })
                            }}>
                            <Text style={styles.font}>เนื้อหาบทเรียน</Text>
                        </Button>

                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.button}>
                        <Button raised primary text="Primary" style={styles.button}
                            onPress={() => {
                                this.props.navigation.navigate('แบบฝึกหัด', {
                                    _id: this.props.navigation.getParam('_id', 'test')
                                })
                            }}>
                            <Text style={styles.font} >แบบฝึกหัด</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    Main: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80
    },
    button: {
        justifyContent: 'center',
        width: 300,
        height: 200,
        borderRadius: 20,
        flexDirection: 'column',
        fontFamily: 'Kanit-Bold',
        backgroundColor: '#005b9f',
    },
    font: {
        fontSize: 30,
        fontFamily: 'Kanit-Bold',
        color: 'white'
    }
});