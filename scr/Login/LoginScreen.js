import React, {Component} from 'react';
import {Button, Spinner, Left, Right, Body} from 'native-base';
import AnimationButton from '../../Animation';
import {Navigator, Text, StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <View>
          <Text>123</Text>
          <Text>123</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
