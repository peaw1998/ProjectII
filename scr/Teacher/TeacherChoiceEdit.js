import React, {Component} from 'react';
import {View, Button, Text, Spinner, Item, Accordion} from 'native-base';
import {StyleSheet} from 'react-native';

import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
import {TextInput} from 'react-native-gesture-handler';
import {CheckBox} from 'native-base';
import Modal from 'react-native-modal';
import token from '../token';

export default class TeacherChoiceEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswer: '',
      options: {
        options1: '',
        options2: '',
        options3: '',
        options4: '',
      },
      question: '',
      isPress: false,
      isModalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  componentDidMount = () => {
    this.setState({
      ...this.props.navigation.getParam('Question', 'test')[
        this.props.navigation.getParam('index', 'test')
      ],
      isPress: false,
    });
  };

  Delete = async () => {
    if (this.state.isPress == false) {
      this.setState({isPress: true});
      await axios
        .put(
          'https://fast-ridge-57035.herokuapp.com/api/exercise/' +
            this.props.navigation.getParam('exercise_ID', ''),
          {
            Question: [
              ...this.props.navigation
                .getParam('Question', '')
                .filter(
                  (item, index) =>
                    index !== this.props.navigation.getParam('index', 'test'),
                ),
            ],
          },
          {
            headers: {
              Authorization: 'Bearer ' + token.getToken(),
            },
          },
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res);
        });

      this.props.navigation.navigate('แบบฝึกหัด');
    }
  };

  Put = async () => {
    if (this.state.isPress == false) {
      this.setState({isPress: true});
      let arr = this.props.navigation.getParam('Question', '');
      arr[this.props.navigation.getParam('index', 'test')] = {
        correctAnswer: this.state.correctAnswer,
        options: this.state.options,
        question: this.state.question,
        type: 'choice',
      };
      await axios
        .put(
          'https://fast-ridge-57035.herokuapp.com/api/exercise/' +
            this.props.navigation.getParam('exercise_ID', ''),
          {
            Question: arr,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token.getToken(),
            },
          },
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res);
        });

      this.props.navigation.navigate('แบบฝึกหัด');
    }
  };

  render() {
    return (
      <>
        <View style={styles.main}>
          <Text style={styles.font}>คำถาม</Text>

          <Item style={styles.Input}>
            <TextInput
              onChangeText={(e) => {
                this.setState({question: e});
              }}
              value={this.state.question}
            />
          </Item>
          <Text style={styles.font}>ตัวเลือกคำตอบ</Text>

          <View style={styles.answer}>
            <Item style={styles.Input}>
              <TextInput
                onChangeText={(e) => {
                  this.setState({
                    options: {
                      ...this.state.options,
                      options1: e,
                    },
                  });
                }}
                value={this.state.options.options1}
              />
            </Item>
            <CheckBox
              right
              checked={this.state.correctAnswer === 'options1'}
              onPress={() => {
                this.setState({correctAnswer: 'options1'});
              }}
            />
          </View>
          <View style={styles.answer}>
            <Item style={styles.Input}>
              <TextInput
                onChangeText={(e) => {
                  this.setState({
                    options: {
                      ...this.state.options,
                      options2: e,
                    },
                  });
                }}
                value={this.state.options.options2}
              />
            </Item>
            <CheckBox
              checked={this.state.correctAnswer === 'options2'}
              onPress={() => {
                this.setState({correctAnswer: 'options2'});
              }}
            />
          </View>
          <View style={styles.answer}>
            <Item style={styles.Input}>
              <TextInput
                onChangeText={(e) => {
                  this.setState({
                    options: {
                      ...this.state.options,
                      options3: e,
                    },
                  });
                }}
                value={this.state.options.options3}
              />
            </Item>
            <CheckBox
              checked={this.state.correctAnswer === 'options3'}
              onPress={() => {
                this.setState({correctAnswer: 'options3'});
              }}
            />
          </View>
          <View style={styles.answer}>
            <Item style={styles.Input}>
              <TextInput
                onChangeText={(e) => {
                  this.setState({
                    options: {
                      ...this.state.options,
                      options4: e,
                    },
                  });
                }}
                value={this.state.options.options4}
              />
            </Item>
            <CheckBox
              checked={this.state.correctAnswer === 'options4'}
              onPress={() => {
                this.setState({correctAnswer: 'options4'});
              }}
            />
          </View>
          <CheckBox disabled={true} checked={true} />
          <Text style={styles.font2}>สำหรับเลือกข้อที่ถูกที่สุด</Text>
          <Button style={styles.button} onPress={this.Put}>
            <Text style={styles.font2}>แก้ไขคำถาม</Text>
          </Button>
          <Button
            style={{
              backgroundColor: '#ab000d',
              borderRadius: 20,
            }}
            onPress={this.toggleModal}>
            <Text style={styles.font}>ลบ</Text>
          </Button>
        </View>
        <View style={styles.center}>
          <Modal
            isVisible={this.state.isModalVisible}
            onBackdropPress={() => {
              this.setState({isModalVisible: !this.state.isModalVisible});
            }}
            style={styles.center}>
            <View style={styles.Modal}>
              <Text
                style={{
                  marginTop: 100,
                  fontSize: 20,
                  fontFamily: 'Kanit-Thin',
                }}>
                ต้องการลบวิชานี้จริงหรือไม่?
              </Text>
              <View style={styles.buttonModal}>
                <Button
                  onPress={this.Delete}
                  danger
                  style={{
                    width: 100,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  title="Show modal">
                  <Text style={styles.font}>ยืนยัน</Text>
                </Button>
                <Button
                  style={{
                    marginLeft: 20,
                    width: 100,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#9e9e9e',
                  }}
                  title="Show modal"
                  onPress={this.toggleModal}>
                  <Text style={styles.font}>ยกเลิก</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  button: {
    justifyContent: 'center',
    width: 130,
    height: 50,
    borderRadius: 20,
    marginTop: 20,
    flexDirection: 'column',
    backgroundColor: '#01579b',
    marginBottom: 20,
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
    fontFamily: 'Kanit-Bold',
  },
  font2: {
    fontSize: 20,
    fontFamily: 'Kanit-Thin',
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
    marginBottom: 20,
  },
  answer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Modal: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  buttonModal: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
});
