import React, {Component} from 'react';
import {View, Button, Text, Spinner, Item} from 'native-base';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
import {TextInput} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

export default class TeacherFill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswer: '',
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
              Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InBpbXdpcGEi.Fr9-EvO3sQMjy19gYCMOTS3KzhoxPovPyDavL2R9qbI',
            },
          },
        )
        .then(res => {
          console.log(res.data);
        })
        .catch(res => {
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
        question: this.state.question,
        type: 'fill',
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
              Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InBpbXdpcGEi.Fr9-EvO3sQMjy19gYCMOTS3KzhoxPovPyDavL2R9qbI',
            },
          },
        )
        .then(res => {
          console.log(res.data);
        })
        .catch(res => {
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
              onChangeText={e => {
                this.setState({question: e});
              }}
              value={this.state.question}
            />
          </Item>
          <Text style={styles.font}>คำตอบที่ถูกต้องที่สุด</Text>
          <Item style={styles.Input}>
            <TextInput
              onChangeText={e => {
                this.setState({correctAnswer: e});
              }}
              value={this.state.correctAnswer}
            />
          </Item>
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
    width: 150,
    height: 50,
    borderRadius: 20,
    marginTop: 20,
    flexDirection: 'column',
    backgroundColor: '#01579b',
    marginBottom: 20,
  },
  Input: {
    justifyContent: 'center',
    width: 350,
    height: 50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
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
