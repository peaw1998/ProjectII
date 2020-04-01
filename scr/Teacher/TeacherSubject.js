import React, { Component } from 'react';
import { View, Text, Button, Input, Item, Spinner } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import axios from 'axios'
import { NavigationEvents } from 'react-navigation'



export default class SubjectTeacher extends Component {


    constructor(props) {
        super(props);
        this.state = {
            subject: [],
            chapter: [],
            isLoading: true
        }
    }
    componentDidMount = async () => {

        this.getCourse()
    }

    getCourse = async () => {
        await axios.get('https://fast-ridge-57035.herokuapp.com/api/subject/' + this.props.navigation.getParam('_id', 'test'),
            {
                headers: {
                    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InBpbXdpcGEi.Fr9-EvO3sQMjy19gYCMOTS3KzhoxPovPyDavL2R9qbI"
                }
            })
            .then(async (res) => {
                await this.setState({
                    subject: res.data.chapterID
                })
                console.log(res.data)
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
                    <NavigationEvents onDidFocus={() => { this.getCourse() }} />
                </View>

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

    renderSubject() {

        return (
            <View
            // style={styles.main}
            >

                {this.state.subject.map(
                    (item) => (
                        <View style={styles.rowContainer}>
                            <View >
                                <Button raised primary text="Primary" style={styles.button}
                                    onPress={() => {
                                        this.props.navigation.navigate('แก้ไขบทเรียน', {
                                            _id: item._id
                                        })
                                    }}>
                                    <Text style={styles.font}>{
                                        item.chapterName
                                    }</Text>
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
                                this.props.navigation.navigate('เพิ่มบทเรียน', {
                                    _id: this.props.navigation.getParam('_id', 'test')
                                })
                            }}>
                            {/* <Text style={styles.font}>เพิ่มบทเรียน</Text> */}
                            <Text style={{ fontSize: 50 }}>+</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        rowContainer: {
            margin: 8,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        main: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#e0e0e0'
        },
        Input: {
            justifyContent: 'center',
            width: 350,
            height: 50,
            backgroundColor: '#FFFFFF',
            flexDirection: 'column',
            marginTop: 10,
            borderRadius: 10
        },
        button: {
            justifyContent: 'center',
            width: 350,
            height: 80,
            borderRadius: 20,
            flexDirection: 'column',
            marginTop: 10,
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
            fontSize: 20,
            fontFamily: 'Kanit-Thin'
        }
    });
