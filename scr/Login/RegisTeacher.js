import React, {Component} from 'react';
import {
  Button,
  Spinner,
  Left,
  Right,
  Body,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import AnimationButton from '../../Animation';
import {
  Navigator,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native-animatable';
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import translate from '../Translate';
import Modal from 'react-native-modal';

export default class RegisTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm: '',
      word: '',
      isModalVisible: false,
      isModalVisible2: false,
    };
  }
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  toggleModal2 = () => {
    this.setState({isModalVisible2: !this.state.isModalVisible2});
  };
  ValidateEmail = (mail) => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        myForm.emailAddr.value,
      )
    ) {
      return false;
    }
    return true;
  };

  render() {
    return (
      <>
        <View style={styles.Container}>
          <View>
            <Image
              source={require('../../images/regis.png')}
              style={{width: 200}}
            />
          </View>
          <Text style={styles.font}>SIGN UP</Text>

          <View style={styles.form}>
            <TextInput
              style={{color: '#fff'}}
              placeholder="Username"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              value={this.state.username}
              onChangeText={(e) => this.setState({username: e})}
            />
          </View>
          <View style={styles.form}>
            <TextInput
              style={{color: '#fff'}}
              placeholder="E-mail"
              placeholderTextColor="#fff"
              autoCompleteType="email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={this.state.email}
              onChangeText={(e) => this.setState({email: e})}
            />
          </View>
          <View style={styles.form}>
            <TextInput
              style={{color: '#fff'}}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry={true}
              autoCapitalize="none"
              value={this.state.password}
              onChangeText={(e) => this.setState({password: e})}
            />
          </View>
          <View style={styles.form}>
            <TextInput
              style={{color: '#fff'}}
              placeholder="Confirm Password"
              placeholderTextColor="#fff"
              secureTextEntry={true}
              autoCapitalize="none"
              value={this.state.confirm}
              onChangeText={(e) => this.setState({confirm: e})}
            />
          </View>
          <View>
            <Button
              style={styles.button}
              onPress={() => {
                if (this.state.password !== this.state.confirm) {
                  this.setState({
                    word: 'Password ไม่ตรงกัน กรุณากรอกใหม่อีกครั้ง',
                  });
                  this.toggleModal();
                } else if (
                  !(
                    this.state.username &&
                    this.state.password &&
                    this.state.email
                  )
                ) {
                  this.setState({word: 'กรุณากรอกข้อมูลให้ครบถ้วน'});
                  this.toggleModal();
                } else if (this.state.password.length < 8) {
                  this.setState({word: 'Password ต้องมีอย่างน้อย 8 ตัวอักษร'});
                  this.toggleModal();
                } else if (this.ValidateEmail(this.state.email)) {
                  this.setState({word: 'E-mail ไม่ถูกต้อง'});
                  this.toggleModal();
                } else {
                  axios
                    .post(
                      'https://fast-ridge-57035.herokuapp.com/auth/learner/signup',
                      {
                        username: this.state.username,
                        password: this.state.password,
                        email: this.state.email,
                      },
                    )
                    .then((res) => {
                      console.log(res.data);
                      this.setState({word: translate(res.data)});
                      this.toggleModal2();
                    })
                    .catch((err) => {
                      console.log(translate(err.response.data));
                      this.setState({word: translate(err.response.data)});
                      this.toggleModal();
                    });
                }
              }}>
              <Text>Sign up</Text>
            </Button>
          </View>
        </View>

        <View style={styles.center}>
          <Modal isVisible={this.state.isModalVisible} style={styles.center}>
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
                  onPress={this.toggleModal}
                  success
                  style={{
                    width: 100,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  title="Show modal">
                  <Text style={styles.font3}>ตกลง</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.center}>
          <Modal isVisible={this.state.isModalVisible2} style={styles.center}>
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
                  onPress={() => this.props.navigation.navigate('Login')}
                  success
                  style={{
                    width: 100,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  title="Show modal">
                  <Text style={styles.font3}>ตกลง</Text>
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
  Container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004163',
  },
  font: {
    fontSize: 35,
    fontFamily: 'Kanit-Bold',
    color: '#fff',
  },
  font2: {
    fontSize: 15,
    fontFamily: 'Kanit-Bold',
    color: '#fff',
  },
  button: {
    width: 100,
    justifyContent: 'center',
    borderRadius: 30,
    margin: 5,
    backgroundColor: '#c0ffe6',
  },
  button3: {
    width: 100,
    justifyContent: 'center',
    borderRadius: 30,
    margin: 5,
    backgroundColor: '#f5fffd',
  },
  button2: {
    width: 140,
    justifyContent: 'center',
    borderRadius: 30,
    margin: 5,
    backgroundColor: '#f5fffd',
  },
  form: {
    margin: 10,
    backgroundColor: '#01579b',
    borderRadius: 30,
    height: 55,
    width: 300,
    borderColor: '#f5fffd',
    borderWidth: 3,
    // alignItems: 'center',
    paddingStart: 20,
  },
  type: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#b23751',
    borderRadius: 40,
    padding: 15,
  },
  Modal: {
    width: 300,
    height: 200,
    justifyContent: 'space-evenly',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  buttonModal: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
