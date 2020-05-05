import React, {Component} from 'react';
import {View, Button, Text, Input, Item, Spinner, Row, Col} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
import token from '../token';
import moment from 'moment';

export default class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: [],
      isLoading: true,
    };
  }
  Get = async () => {
    await axios
      .get(
        'https://fast-ridge-57035.herokuapp.com/exercise/score/' +
          this.props.navigation.getParam('exercise_ID', ''),
        {
          headers: {
            Authorization: 'Bearer ' + token.getToken(),
          },
        },
      )
      .then(async res => {
        this.setState({score: res.data});
        console.log(this.state.score);
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
  componentDidMount = async () => {
    this.Get();
  };
  render() {
    if (this.state.isLoading === false) {
      return (
        <View>
          {this.render2()}
          <NavigationEvents
            onDidFocus={() => {
              this.Get();
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Spinner color="blue" />
        </View>
      );
    }
  }

  render2() {
    return (
      <>
        <View style={styles.main}>
          <Text style={styles.font4}>คะแนนทั้งหมด</Text>
          <Row>
            <Col>
              <Text style={styles.font3}>Username</Text>
            </Col>
            <Col>
              <Text style={styles.font3}>Score</Text>
            </Col>

            <Col>
              <Text style={styles.font3}>Date/Time</Text>
            </Col>
          </Row>
          {this.state.score.map(item => {
            return (
              <>
                <Row>
                  <Col>
                    <Text style={styles.font2}>{item.username}</Text>
                  </Col>
                  <Col>
                    <Text style={styles.font2}>{item.score}</Text>
                  </Col>
                  <Col>
                    <Text style={styles.font2}>
                      {moment(item.createdAt).format('DD/MM/YYYY h:mm')}
                    </Text>
                  </Col>
                </Row>
              </>
            );
          })}
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 25,
  },
  button: {
    justifyContent: 'center',
    width: 300,
    height: 200,
    borderRadius: 20,
    flexDirection: 'column',
    backgroundColor: '#01579b',
  },
  button2: {
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    flexDirection: 'column',
    marginTop: 10,
    backgroundColor: '#4fc3f7',
  },
  font1: {
    fontSize: 20,
    fontFamily: 'Kanit-Bold',
    marginLeft: 30,
  },
  font2: {
    fontSize: 18,
    fontFamily: 'Kanit-Thin',
  },
  font3: {
    fontSize: 20,
    fontFamily: 'Kanit-Bold',
  },
  font4: {
    fontSize: 25,
    fontFamily: 'Kanit-Bold',
    margin: 10,
  },
  fontAdd: {
    fontSize: 40,
    fontFamily: 'Kanit-Bold',
    color: 'white',
  },
  question: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    width: 350,
    // height: 200,
    borderRadius: 20,
    flexDirection: 'column',
  },
  score: {
    marginTop: 10,
    backgroundColor: '#4fc3f7',
    width: 350,
    borderRadius: 20,
    height: 60,
    flexDirection: 'column',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Modal: {
    width: 300,
    height: 400,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  buttonModal: {
    width: 300,
    height: 300,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  button: {
    justifyContent: 'center',
    width: 220,
    height: 70,
    borderRadius: 20,
    flexDirection: 'column',
    backgroundColor: '#01579b',
  },
});
