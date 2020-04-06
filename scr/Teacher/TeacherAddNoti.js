import React, {Component} from 'react';
import {View, Text, Button, Input, Item, Spinner} from 'native-base';
import {StyleSheet, Image, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import token from '../token';

export default class TeacherSubjectEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationName: '',
      content: '',
      isPress: false,
    };
  }

  Post = async () => {
    if (this.state.isPress == false) {
      this.setState({isPress: true});
      await axios
        .post(
          'https://fast-ridge-57035.herokuapp.com/api/notification',
          {
            notificationName: this.state.notificationName,
            content: this.state.content,
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

      this.props.navigation.navigate('ประกาศทั้งหมด');
    }
  };

  render() {
    return (
      <>
        <View style={styles.main}>
          <Text style={styles.font}>ชื่อประกาศ</Text>
          <Item style={styles.Input}>
            <TextInput
              onChangeText={(e) => {
                this.setState({notificationName: e});
              }}
              value={this.state.notificationName}
            />
          </Item>
          <Text style={styles.font}>เนื้อหาประกาศ</Text>
          <Item style={styles.Input}>
            <TextInput
              onChangeText={(e) => {
                this.setState({content: e});
              }}
              value={this.state.content}
            />
          </Item>
          <Item style={styles.button}>
            <Button style={{backgroundColor: '#00701a', borderRadius: 20}}>
              <Text style={styles.font} onPress={this.Post}>
                บันทึก
              </Text>
            </Button>
          </Item>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  Input: {
    justifyContent: 'center',
    width: 350,
    height: 50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    justifyContent: 'center',
    width: 100,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    marginTop: 10,
  },
  font: {
    fontSize: 20,
    fontFamily: 'Kanit-Thin',
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
