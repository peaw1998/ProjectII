import React from 'react';
import {View, Button, Text, Spinner, Row} from 'native-base';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import token from '../token';

export default class Score extends React.Component {
  componentDidMount = async () => {
    console.log('ball nha hee');
    axios
      .post(
        'https://fast-ridge-57035.herokuapp.com/exercise/score/' +
          this.props.navigation.getParam('_id', 'test'),
        {
          score: this.props.navigation.getParam('score', 0),
        },
        {
          headers: {
            Authorization: 'Bearer ' + token.getToken(),
          },
        },
      )
      .then(res => {
        console.log(res.data);
        console.log('test ja');
      })
      .catch(err => {
        console.log(err.data);
        console.log(this.props.navigation.getParam('_id', 'test'));
      });
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.center}>
          <Image
            source={require('../../images/4.png')}
            style={{width: 200, height: 200}}
          />
          <Text style={styles.font3}>
            คะแนนที่ได้ {this.props.navigation.getParam('score', 0)}
          </Text>
        </View>
      </View>
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
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    height: 650,
  },
  button: {
    justifyContent: 'center',
    width: 350,
    height: 100,
    borderRadius: 20,
    flexDirection: 'column',
    backgroundColor: '#01579b',
  },
  font: {
    fontSize: 30,
    fontFamily: 'Kanit-Bold',
  },
  font3: {
    fontSize: 30,
    fontFamily: 'Kanit-Bold',
    color: '#217983',
  },
  font2: {
    fontSize: 20,
    fontFamily: 'Kanit-Regular',
  },
  next: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
  },
});
