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
  Alert,
} from 'react-native';
import {View} from 'react-native-animatable';
import {TextInput} from 'react-native-gesture-handler';
// import AsyncStorage from '@react-native-community/async-storage';
import token from '../token';
import axios from 'axios';

export default class LoginScreen extends Component {
  state = {
    mode: '',
    username: '',
    password: '',
  };
  render() {
    return (
      <View style={styles.Container}>
        <View>
          <Image
            source={require('../../images/login2.png')}
            style={{width: 200}}
          />
        </View>
        <Text style={styles.font}>LOG IN</Text>
        <View style={styles.type}>
          <Button
            rounded
            style={
              this.state.mode === 'learner' ? styles.button : styles.button3
            }
            onPress={() => {
              if (this.state.mode === 'learner') {
                this.setState({
                  mode: '',
                });
              } else {
                this.setState({
                  mode: 'learner',
                });
              }
              this.setState({
                username: '',
                password: '',
              });
            }}>
            <Text>Learner</Text>
          </Button>
          <Button
            rounded
            style={
              this.state.mode === 'teacher' ? styles.button : styles.button3
            }
            onPress={() => {
              if (this.state.mode === 'teacher') {
                this.setState({
                  mode: '',
                });
              } else {
                this.setState({
                  mode: 'teacher',
                });
              }
              this.setState({
                username: '',
                password: '',
              });
            }}>
            <Text>Teacher</Text>
          </Button>
        </View>
        {this.state.mode !== '' ? (
          <>
            <View style={styles.form}>
              <TextInput
                style={{color: '#fff'}}
                placeholder="Username"
                placeholderTextColor="#fff"
                value={this.state.username}
                autoCapitalize="none"
                onChangeText={(e) => {
                  this.setState({
                    username: e,
                  });
                }}
              />
            </View>
            <View style={styles.form}>
              <TextInput
                style={{color: '#fff'}}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                value={this.state.password}
                autoCapitalize="none"
                onChangeText={(e) => {
                  this.setState({
                    password: e,
                  });
                }}
              />
            </View>
            <View>
              <Button
                rounded
                style={styles.button}
                onPress={() => {
                  if (this.state.mode === 'learner') {
                    axios
                      .post(
                        'https://fast-ridge-57035.herokuapp.com/auth/learner/login',
                        {
                          username: this.state.username,
                          password: this.state.password,
                        },
                      )
                      .then(async (res) => {
                        // await AsyncStorage.setItem('token', res.data);
                        token.setToken(res.data);
                        this.setState({username: '', password: ''});
                        this.props.navigation.navigate('Home');
                      })
                      .catch((error) => {
                        Alert.alert('', 'wrong username or password');
                      });
                  } else if (this.state.mode === 'teacher') {
                    axios
                      .post(
                        'https://fast-ridge-57035.herokuapp.com/auth/teacher/login',
                        {
                          username: this.state.username,
                          password: this.state.password,
                        },
                      )
                      .then(async (res) => {
                        // await AsyncStorage.setItem('token', res.data);
                        token.setToken(res.data);
                        this.setState({username: '', password: ''});
                        this.props.navigation.navigate('วิชาทั้งหมด');
                      })
                      .catch((error) => {
                        Alert.alert('', 'wrong username or password');
                      });
                  }
                }}>
                <Text>Log in</Text>
              </Button>
            </View>
            <View style={styles.type}>
              <Button
                rounded
                style={styles.button3}
                onPress={() => {
                  if (this.state.mode === 'learner') {
                    this.props.navigation.navigate('Register');
                  } else if (this.state.mode === 'teacher') {
                    this.props.navigation.navigate('สมัครสมาชิก');
                  }
                }}>
                <Text>Sign up</Text>
              </Button>
              <Button
                rounded
                style={styles.button2}
                onPress={() => {
                  if (this.state.mode === 'learner') {
                    this.props.navigation.navigate('Password');
                  } else if (this.state.mode === 'teacher') {
                    this.props.navigation.navigate('ลืมรหัสผ่าน');
                  }
                }}>
                <Text>Forget Password</Text>
              </Button>
            </View>
          </>
        ) : null}
      </View>
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
});
