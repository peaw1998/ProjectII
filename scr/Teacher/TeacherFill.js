import React, {Component} from 'react';
import {View, Button, Text, Spinner, Item} from 'native-base';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
import {TextInput} from 'react-native-gesture-handler';
import token from '../token';

export default class TeacherFill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswer: '',
      Question: '',
      isPress: false,
    };
  }

  Put = async () => {
    if (this.state.isPress == false) {
      this.setState({isPress: true});
      await axios
        .put(
          'https://fast-ridge-57035.herokuapp.com/api/exercise/' +
            this.props.navigation.getParam('exercise_ID', ''),
          {
            Question: [
              ...this.props.navigation.getParam('Question', ''),
              {
                correctAnswer: this.state.correctAnswer,
                question: this.state.Question,
                type: 'fill',
              },
            ],
          },
          {
            headers: {
              Authorization: 'Bearer ' + token.getToken(),
            },
          },
        )
        .then(res => {
          //console.log(res.data);
        })
        .catch(res => {
          //console.log(res);
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
                this.setState({Question: e});
              }}
              value={this.state.Question}
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
            <Text>เพิ่มคำถาม</Text>
          </Button>
          <View style={styles.Example}>
            <Text style={styles.font}>ตัวอย่างแบบฝึกหัดแบบเดิมคำตอบ</Text>
            <Text style={styles.font2}>คำถาม</Text>
            <Item style={styles.Input}>
              <TextInput style={styles.font2} placeholder="ส่วนเติมคำตอบ" />
            </Item>
          </View>
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
    width: 100,
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
});
