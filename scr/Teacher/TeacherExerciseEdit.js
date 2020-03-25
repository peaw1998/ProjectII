import React, { Component } from "react";
import { View, Button, Text, Input, Item, Spinner } from "native-base";
import { StyleSheet, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import axios from 'axios'
import { NavigationEvents } from 'react-navigation'


export default class ExerciseEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,

        }
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    render() {
        return (
            <>
                <View style={styles.main}>
                    {this.props.navigation.getParam('Data', [{ Question: [] }])[0].Question
                        .map((item, index) => {
                            return (
                                <TouchableOpacity style={styles.question}
                                    onPress={() => {
                                        if (item.type === 'fill')
                                            this.props.navigation.navigate('แก้ไขคำถาม',
                                                {
                                                    index: index,
                                                    Question: this.props.navigation.getParam('Data', [{ Question: [] }])[0].Question,
                                                    exercise_ID: this.props.navigation.getParam('Data', [{ Question: [] }])[0]._id,
                                                }
                                            )
                                        else if (item.type === 'choice')
                                            this.props.navigation.navigate('แก้ไขคำถาม2',
                                                {
                                                    index: index,
                                                    Question: this.props.navigation.getParam('Data', [{ Question: [] }])[0].Question,
                                                    exercise_ID: this.props.navigation.getParam('Data', [{ Question: [] }])[0]._id,
                                                }
                                            )
                                        else if (item.type === 'draganddrop')
                                            this.props.navigation.navigate('แก้ไขคำถาม3',
                                                {
                                                    index: index,
                                                    Question: this.props.navigation.getParam('Data', [{ Question: [] }])[0].Question,
                                                    exercise_ID: this.props.navigation.getParam('Data', [{ Question: [] }])[0]._id,
                                                }
                                            )
                                    }}
                                >
                                    <Text style={styles.font1}>ข้อที่ {index + 1}</Text>
                                    <Text style={styles.font2}>{item.question}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    <Button style={styles.button2} onPress={this.toggleModal}>
                        <Text style={styles.fontAdd}>+</Text >
                    </Button>
                </View>
                <View style={styles.center}>
                    <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => { this.setState({ isModalVisible: !this.state.isModalVisible }) }} style={styles.center}>
                        <View style={styles.Modal}>
                            <Text style={styles.font2}>เลือกชนิดของแบบฝึกหัดข้อนี้</Text>
                            <View style={styles.buttonModal}>
                                <Button danger style={styles.button} title="Show modal"
                                    onPress={() => {
                                        this.toggleModal()
                                        this.props.navigation.navigate('เพิ่มแบบฝึกหัดแบบหลายตัวเลือก', {
                                            exercise_ID: this.props.navigation.getParam('Data', [{ Question: [] }])[0]._id,
                                            Question: this.props.navigation.getParam('Data', [{ Question: [] }])[0].Question
                                        })
                                    }
                                    }
                                >
                                    <Text style={styles.font3} >คำตอบหลายตัวเลือก</Text>
                                </Button>
                                <Button style={styles.button} title="Show modal" onPress={() => {
                                    this.toggleModal()
                                    this.props.navigation.navigate('เพิ่มแบบฝึกหัดเติมคำตอบ', {
                                        exercise_ID: this.props.navigation.getParam('Data', [{ Question: [] }])[0]._id,
                                        Question: this.props.navigation.getParam('Data', [{ Question: [] }])[0].Question
                                    })
                                }
                                }>
                                    <Text style={styles.font3}>เติมคำตอบ</Text>
                                </Button>
                                <Button style={styles.button} title="Show modal"
                                    onPress={() => {
                                        this.toggleModal()
                                        this.props.navigation.navigate('เพิ่มแบบฝึกหัดแบบลากและวาง', {
                                            exercise_ID: this.props.navigation.getParam('Data', [{ Question: [] }])[0]._id,
                                            Question: this.props.navigation.getParam('Data', [{ Question: [] }])[0].Question
                                        })
                                    }
                                    }>
                                    <Text style={styles.font3}>ลากและวางคำตอบ</Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </View>
            </>
        );
    }
}
const styles = StyleSheet.create(
    {
        main: {
            flex: 1,
            flexDirection: 'column',
            // justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#e0e0e0'
        },
        button: {
            justifyContent: 'center',
            width: 300,
            height: 200,
            borderRadius: 20,
            flexDirection: 'column',
            backgroundColor: '#01579b'
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
        font1: {
            fontSize: 20,
            fontFamily: 'Kanit-Bold',
            marginLeft: 30,

        },
        font2: {
            fontSize: 20,
            fontFamily: 'Kanit-Thin',
            marginLeft: 30,
            marginRight: 10,
            marginBottom: 10
        },
        font3: {
            fontSize: 15,
            fontFamily: 'Kanit-Bold',
        },
        fontAdd: {
            fontSize: 40,
            fontFamily: 'Kanit-Bold',
            color: 'white'
        },
        question: {
            marginTop: 10,
            backgroundColor: '#ffffff',
            width: 350,
            // height: 200,
            borderRadius: 20,
            flexDirection: 'column',
        },
        center: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        Modal: {
            width: 300,
            height: 400,
            justifyContent: 'center',
            borderRadius: 20,
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            flexDirection: 'column',

        },
        buttonModal: {
            width: 300,
            height: 300,
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: 'transparent',
            flexDirection: 'column',
        },
        button: {
            justifyContent: 'center',
            width: 220,
            height: 70,
            borderRadius: 20,
            flexDirection: 'column',
            backgroundColor: '#01579b',

        },


    });