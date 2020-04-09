import React, {Component} from 'react';
import {View, Button, Text, Spinner} from 'native-base';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
import token from '../token';

export const initial = {
  question: [],
  isLoading: true,
  Pre: [],
  Post: [],
};

export default class TeacherExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
      isLoading: true,
      Pre: [],
      Post: [],
    };
  }

  test = async () => {
    await this.Get();
    //console.log(this.state.question);
    let arr = this.state.question.filter(item => {
      if (item.preTest === true) return true;
      else return false;
    });
    this.setState({
      Pre: arr,
    });
    let arr2 = this.state.question.filter(item => {
      if (item.postTest === true) return true;
      else return false;
    });
    this.setState({
      Post: arr2,
    });
  };

  componentDidMount = async () => {
    this.test();
  };

  Get = async () => {
    await axios
      .get(
        'https://fast-ridge-57035.herokuapp.com/api/exercises/subject/' +
          this.props.navigation.getParam('_id', 'test'),
        {
          headers: {
            Authorization: 'Bearer ' + token.getToken(),
          },
        },
      )
      .then(async res => {
        await this.setState({
          question: res.data,
        });
        //console.log(res.data);
      })
      .catch(error => {
        //console.log(error);
      })
      .finally(async () => {
        await this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    if (this.state.isLoading === false) {
      return (
        <>
          {this.render2()}
          <NavigationEvents
            onDidFocus={() => {
              this.setState({...initial}, () => {
                this.test();
              });
            }}
          />
        </>
      );
    } else {
      return (
        <View style={styles.container}>
          <Spinner color="blue" />
        </View>
      );
    }
  }
  render2 = () => {
    return (
      <View style={styles.main}>
        {/* <NavigationEvents onDidFocus={() => { this.test() }} /> */}
        <View>
          <Button
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('แก้ไขแบบฝึกหัด', {
                _id: this.props.navigation.getParam('_id', 'test'),
                Data: this.state.Pre,
                preTest: true,
                postTest: false,
                test: this.test(),
              });
            }}>
            <Text style={styles.font}> แบบฝึกหัด</Text>
            <Text style={styles.font}>ก่อนเรียน</Text>
          </Button>
        </View>
        <View style={{marginTop: 80}}>
          <Button
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('แก้ไขแบบฝึกหัด', {
                _id: this.props.navigation.getParam('_id', 'test'),
                Data: this.state.Post,
                preTest: false,
                postTest: true,
              });
            }}>
            <Text style={styles.font}> แบบฝึกหัด</Text>
            <Text style={styles.font}>หลังเรียน</Text>
          </Button>
        </View>
      </View>
    );
  };
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
});
