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
import Modal from 'react-native-modal';
import axios from 'axios';

export default class ForgetTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
          <Text style={styles.font}>FORGET PASSWORD</Text>

          <View style={styles.form}>
            <TextInput
              style={{color: '#fff'}}
              placeholder="E-mail"
              placeholderTextColor="#fff"
              autoCompleteType="email"
              keyboardType="email-address"
              value={this.state.email}
              autoCapitalize="none"
              onChangeText={e => this.setState({email: e})}
            />
          </View>

          <View>
            <Button
              rounded
              style={styles.button}
              onPress={() => {
                axios
                  .post(
                    'https://fast-ridge-57035.herokuapp.com/auth/teacher/forgetpassword',
                    {
                      email: this.state.email,
                    },
                  )
                  .then(res => {
                    //console.log(res.data);
                    this.toggleModal();
                  })
                  .catch(err => {
                    //console.log(err);
                    this.toggleModal2();
                  });
              }}>
              <Text>Send</Text>
            </Button>
          </View>
        </View>

        <View style={styles.center}>
          <Modal
            isVisible={this.state.isModalVisible}
            // onBackdropPress={() => {
            //   this.setState({isModalVisible: !this.state.isModalVisible});
            // }}
            style={styles.center}>
            <View style={styles.Modal}>
              <Text
                style={{
                  marginTop: 100,
                  fontSize: 20,
                  fontFamily: 'Kanit-Thin',
                }}>
                กรุณาตรวจสอบรหัสผ่านใหม่ใน Email ของท่าน
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

        <View style={styles.center}>
          <Modal isVisible={this.state.isModalVisible2} style={styles.center}>
            <View style={styles.Modal}>
              <Text
                style={{
                  marginTop: 100,
                  fontSize: 20,
                  fontFamily: 'Kanit-Thin',
                }}>
                ไม่พบ E-mail กรุณากรอกใหม่อีกครั้ง
              </Text>
              <View style={styles.buttonModal}>
                <Button
                  onPress={this.toggleModal2}
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
    fontSize: 30,
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
    alignItems: 'center',
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
