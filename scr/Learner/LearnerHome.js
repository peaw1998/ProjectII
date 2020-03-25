import React, { Component } from 'react';
import { Navigator, NativeModules, Text, StyleSheet, View, ScrollView, Spinner } from 'react-native';
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
import axios from 'axios'


export default class LearnerHome extends Component {
    render() {
        return (
            <>
                <View style={styles.main}><Text>123</Text></View>
                <ScrollView ><Text>123</Text>
                    <Text>123</Text>
                    <Text>123</Text>
                    {/* <Text>123</Text> */}
                    <Text>123</Text></ScrollView>
            </>
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
            backgroundColor: '#000',

        },
        main2: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#555',

        },

    });