import React, { Component } from "react";
import { View, Button, Text, Spinner, Item, Accordion } from "native-base";
import { StyleSheet } from 'react-native';

import axios from 'axios'
import { NavigationEvents } from 'react-navigation'
import { TextInput } from "react-native-gesture-handler";
import { CheckBox } from 'native-base'

export default class TeacherFill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correctAnswer: {
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: '',
            },
            Question: '',


            isPress: false,
        }
    }


    Put = async () => {
        if (this.state.isPress == false) {
            this.setState({ isPress: true })
            await axios.put('https://fast-ridge-57035.herokuapp.com/api/exercise/' + this.props.navigation.getParam('exercise_ID', ''),
                {
                    Question: [...this.props.navigation.getParam('Question', ''),
                    { correctAnswer: this.state.correctAnswer, options: this.state.option, question: this.state.Question, type: "draganddrop" }
                    ]
                },
                {
                    headers: {
                        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InBpbXdpcGEi.Fr9-EvO3sQMjy19gYCMOTS3KzhoxPovPyDavL2R9qbI"
                    }
                })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((res) => {
                    console.log(res)
                })

            this.props.navigation.navigate('แบบฝึกหัด')
        }
    }

    render() {
        return (
            <>
                <Text>{JSON.stringify(this.state)}</Text>
                <View style={styles.main}>
                    <Text style={styles.font}>คำถาม</Text>

                    <Item style={styles.Input}>
                        <TextInput onChangeText={(e) => { this.setState({ Question: e }) }} value={this.state.Question} />
                    </Item>
                    <Text style={styles.font}>คำตอบที่เรียงแบบถูกต้อง</Text>

                    <View style={styles.answer}>
                        <Item style={styles.Input}>
                            <TextInput onChangeText={(e) => {
                                this.setState({
                                    correctAnswer: {
                                        ...this.state.correctAnswer,
                                        answer1: e
                                    }
                                })
                            }} value={this.state.correctAnswer.answer1} />
                        </Item>
                    </View>
                    <View style={styles.answer}>
                        <Item style={styles.Input}>
                            <TextInput onChangeText={(e) => {
                                this.setState({
                                    correctAnswer: {
                                        ...this.state.correctAnswer,
                                        answer2: e
                                    }
                                })
                            }} value={this.state.correctAnswer.answer2} />
                        </Item>
                    </View>
                    <View style={styles.answer}>
                        <Item style={styles.Input}>
                            <TextInput onChangeText={(e) => {
                                this.setState({
                                    correctAnswer: {
                                        ...this.state.correctAnswer,
                                        answer3: e
                                    }
                                })
                            }} value={this.state.correctAnswer.answer3} />
                        </Item>
                    </View>
                    <View style={styles.answer}>
                        <Item style={styles.Input}>
                            <TextInput onChangeText={(e) => {
                                this.setState({
                                    correctAnswer: {
                                        ...this.state.correctAnswer,
                                        answer4: e
                                    }
                                })
                            }} value={this.state.correctAnswer.answer4} />
                        </Item>
                    </View>
                    <View style={styles.answer}>
                        <Item style={styles.Input}>
                            <TextInput onChangeText={(e) => {
                                this.setState({
                                    correctAnswer: {
                                        ...this.state.correctAnswer,
                                        answer5: e
                                    }
                                })
                            }} value={this.state.correctAnswer.answer5} />
                        </Item>
                    </View>

                    <Button style={styles.button}
                        onPress={this.Put}
                    >
                        <Text>เพิ่มคำถาม</Text>
                    </Button>

                    {/* <View style={styles.Example}>
                        <Text style={styles.font}>ตัวอย่างแบบฝึกหัดแบบเดิมคำตอบ</Text>
                        <Text style={styles.font2}>คำถาม</Text>
                        <Button style={styles.button2}><Text style={styles.font3}>ตัวเลือกที่ 1</Text></Button>
                        <Button style={styles.button2}><Text style={styles.font3}>ตัวเลือกที่ 2</Text></Button>
                        <Button style={styles.button2}><Text style={styles.font3}>ตัวเลือกที่ 3</Text></Button>
                        <Button style={styles.button2}><Text style={styles.font3}>ตัวเลือกที่ 4</Text></Button>
                    </View> */}

                </View>

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
            backgroundColor: '#e0e0e0',

        },
        button: {
            justifyContent: 'center',
            width: 100,
            height: 50,
            borderRadius: 20,
            marginTop: 20,
            flexDirection: 'column',
            backgroundColor: '#01579b',
            marginBottom: 20

        },
        button2: {
            justifyContent: 'center',
            width: 280,
            height: 50,
            borderRadius: 20,
            marginTop: 20,
            flexDirection: 'column',
            backgroundColor: '#b4ffff',
            marginBottom: 25,

        },
        Input: {
            justifyContent: 'center',
            width: 350,
            height: 50,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row',
            marginTop: 10,
            borderRadius: 10,
            marginBottom: 20,
        },
        font: {
            fontSize: 20,
            fontFamily: 'Kanit-Bold'
        },
        font2: {
            fontSize: 20,
            fontFamily: 'Kanit-Thin'
        },
        font3: {
            fontSize: 16,
            fontFamily: 'Kanit-Thin',
            color: '#000000',
        },
        Example: {
            flex: 1,
            width: '90 %',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#80deea',
            borderRadius: 30,
            marginBottom: 20
        },
        answer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',

        },

    });