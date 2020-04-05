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
        <View style={styles.form}>
          <TextInput style={{padding: 15}} placeholder="Username" />
        </View>
        <View style={styles.form}>
          <TextInput
            style={{padding: 15}}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <Button>
          <Text>Log in</Text>
        </Button>
        <View>
          <Button>
            <Text>Sign up</Text>
          </Button>

          <Text>forget Password</Text>
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
    backgroundColor: '#ede7f6',
  },
  font: {
    fontSize: 35,
    fontFamily: 'Kanit-Bold',
    color: '#217983',
  },
  form: {
    margin: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 30,
    height: 55,
    width: 300,
    borderColor: '#81b9bf',
    borderWidth: 3,
  },
});
