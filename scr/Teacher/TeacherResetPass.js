import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Input,
  Item,
  Spinner,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Left,
  Body,
  Right,
  Footer,
} from 'native-base';
import {StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
import Modal from 'react-native-modal';
import AnimationButton from '../../Animation';
import token from '../token';

export default class TeacherResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm: '',
      isLoading: true,
      isModalVisible: false,
      isModalVisible2: false,
      word: '',
    };
  }
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  toggleModal2 = () => {
    this.setState({isModalVisible2: !this.state.isModalVisible2});
  };

  changePass = async () => {
    await axios
      .put(
        'https://fast-ridge-57035.herokuapp.com/auth/teacher/changepassword',
        {
          password: this.state.password,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token.getToken(),
          },
        },
      )
      .then(res => {
        //console.log(res.data);
        this.toggleModal();
        this.props.navigation.navigate('Login');
      });
  };

  render() {
    return (
      <>
        <Card style={{flex: 0, height: 300}}>
          <CardItem>
            <Left>
              <Thumbnail source={require('../../images/6.png')} />
              <Body>
                <Text style={styles.font2}>
                  {this.props.navigation.getParam('username', 'test')}
                </Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem>
            <Left>
              <Text style={styles.font3}>Password ใหม่</Text>
            </Left>
            <Body
              style={{borderColor: '#a0a0a0', borderWidth: 1, borderRadius: 5}}>
              <TextInput
                style={{color: '#a0a0a0'}}
                placeholder="Password"
                placeholderTextColor="#a0a0a0"
                secureTextEntry={true}
                value={this.state.password}
                autoCapitalize="none"
                onChangeText={e => {
                  this.setState({
                    password: e,
                  });
                }}
              />
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Text style={styles.font3}>ยืมยัน Password ใหม่</Text>
            </Left>
            <Body
              style={{borderColor: '#a0a0a0', borderWidth: 1, borderRadius: 5}}>
              <TextInput
                style={{color: '#a0a0a0'}}
                placeholder="Password"
                placeholderTextColor="#a0a0a0"
                secureTextEntry={true}
                value={this.state.confirm}
                autoCapitalize="none"
                onChangeText={e => {
                  this.setState({
                    confirm: e,
                  });
                }}
              />
            </Body>
          </CardItem>
        </Card>
        <View style={styles.test2}>
          <AnimationButton
            animation="bounceIn"
            text="test"
            onPress={() => {
              if (this.state.password !== this.state.confirm) {
                //console.log('not duplicate');
                this.setState({word: 'กรุณากรอกรหัสให้เหมือนกัน'});
                this.toggleModal2();
              } else if (this.state.password.length < 8) {
                //console.log('too short');
                this.setState({word: 'รหัสควรมีอย่างน้อย 8 ตัวอักษร'});
                this.toggleModal2();
              } else {
                //console.log('success');
                this.toggleModal();
              }
            }}
            styles={styles}>
            <TouchableOpacity style={styles.reset}>
              <Body>
                <Text style={styles.font4}>Reset Password</Text>
              </Body>
            </TouchableOpacity>
          </AnimationButton>
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
                ต้องการแก้ไขรหัสผ่านหรือไม่?
              </Text>
              <View style={styles.buttonModal}>
                <Button
                  danger
                  style={{
                    width: 100,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  title="Show modal"
                  onPress={this.changePass}>
                  <Text style={styles.font}>ยืนยัน</Text>
                </Button>
                <Button
                  light
                  style={{
                    width: 100,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginStart: 10,
                  }}
                  title="Show modal"
                  onPress={this.toggleModal}>
                  <Text style={styles.font}>ยกเลิก</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.center}>
          <Modal
            isVisible={this.state.isModalVisible2}
            onBackdropPress={() => {
              this.setState({isModalVisible2: !this.state.isModalVisible2});
            }}
            style={styles.center}>
            <View style={styles.Modal}>
              <Text
                style={{
                  marginTop: 100,
                  fontSize: 20,
                  fontFamily: 'Kanit-Thin',
                }}>
                {this.state.word}
              </Text>
              <View style={styles.buttonModal}>
                <Button
                  danger
                  style={{
                    width: 100,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  title="Show modal"
                  onPress={this.toggleModal2}>
                  <Text style={styles.font}>เข้าใจ</Text>
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
    alignItems: 'center',
    // backgroundColor: '#e0e0e0'
  },
  font4: {
    fontSize: 25,
    fontFamily: 'Kanit-Bold',
    color: 'white',
    marginLeft: 15,
  },
  font: {
    fontSize: 15,
    fontFamily: 'Kanit-Regular',
    color: '#000',
  },
  font2: {
    fontSize: 22,
    fontFamily: 'Kanit-Regular',
    color: '#000',
  },
  font3: {
    fontSize: 18,
    fontFamily: 'Kanit-Regular',
    color: '#000',
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#b23751',
    padding: 10,
    margin: 5,
  },
  reset: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#65b237',
    padding: 10,
    margin: 5,
  },
  test2: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 8,
  },
  form: {
    margin: 10,
    backgroundColor: '#f5fffd',
    borderRadius: 30,
    height: 55,
    width: '50%',
    borderColor: '#01579b',
    borderWidth: 3,
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
