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
import { Button, Spinner } from 'native-base'
import axios from 'axios'
import { NavigationEvents } from 'react-navigation'



export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: [],
            isLoading: true
        }
    }

    componentDidMount = async () => {
        this.getCourse()
    }

    getCourse = async () => {
        await axios.get('https://fast-ridge-57035.herokuapp.com/api/subjects',
            {
                headers: {
                    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InBpbXdpcGEi.Fr9-EvO3sQMjy19gYCMOTS3KzhoxPovPyDavL2R9qbI"
                }
            })
            .then(async (res) => {

                await this.setState({
                    subject: res.data.users
                })
            })
            .catch((error) => {
                console.log(error);
            }
            )
            .finally(async () => {
                await this.setState({
                    isLoading: false
                })
            })
    }

    render() {
        if (this.state.isLoading === false) {
            return (
                <View>{this.renderSubject()}
                    <NavigationEvents onDidFocus={() => { this.getCourse() }} /></View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Spinner color='blue' />
                </View>
            )
        }
    }
    renderSubject = () => {
        return (

            <View>
                {this.state.subject.map(
                    (item) => (
                        <View style={styles.rowContainer}>
                            <View style={styles.button}>
                                <Button raised primary text="Primary" style={styles.button}
                                    onPress={() => {
                                        this.props.navigation.navigate('เลือกแก้ไข', {
                                            _id: item._id
                                        })
                                    }}>
                                    <Text style={styles.font}>{item.subjectName}</Text>
                                </Button>
                            </View>
                        </View>
                    )
                )
                }
                <View style={styles.rowContainer}>
                    <View >
                        <Button raised primary text="Primary" style={styles.button2}
                            onPress={() => {
                                this.props.navigation.navigate('เพิ่มวิชา')
                            }}>

                            <Text style={{ fontSize: 50 }}>+</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    list: {
        marginHorizontal: 50,
        justifyContent: 'center',
    },
    buttonDiv: {
        marginHorizontal: 8,
    },
    button: {
        justifyContent: 'center',
        width: 350,
        height: 100,
        borderRadius: 20,
        flexDirection: 'column',
        backgroundColor: '#005b9f',
    },
    button2: {
        justifyContent: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
        flexDirection: 'column',
        marginTop: 10,
        backgroundColor: '#4fc3f7',
    },
    font: {
        fontSize: 30,
        fontFamily: 'Kanit-Bold',
        color: 'white'

    }
});