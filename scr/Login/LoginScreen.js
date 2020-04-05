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

export default class LoginScreen extends Component {
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
          <Button style={styles.button3}>
            <Text>Learner</Text>
          </Button>
          <Button style={styles.button3}>
            <Text>Teacher</Text>
          </Button>
        </View>
        <View style={styles.form}>
          <TextInput
            style={{color: '#fff'}}
            placeholder="Username"
            placeholderTextColor="#fff"
          />
        </View>
        <View style={styles.form}>
          <TextInput
            style={{color: '#fff'}}
            placeholder="Password"
            placeholderTextColor="#fff"
            secureTextEntry={true}
          />
        </View>
        <View>
          <Button style={styles.button}>
            <Text>Log in</Text>
          </Button>
        </View>
        <View style={styles.type}>
          <Button style={styles.button3}>
            <Text>Sign up</Text>
          </Button>
          <Button style={styles.button2}>
            <Text>Forget Password</Text>
          </Button>
        </View>
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
