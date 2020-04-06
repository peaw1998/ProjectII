import React, {Component} from 'react';
import {View, Text, Button, Input, Item, Spinner} from 'native-base';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
import AnimationButton from '../../Animation';
import token from '../token';

export default class LearnerSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: [],
      chapter: [],
      isLoading: true,
    };
  }
  componentDidMount = async () => {
    this.getCourse();
  };

  getCourse = async () => {
    await axios
      .get(
        'https://fast-ridge-57035.herokuapp.com/api/subject/' +
          this.props.navigation.getParam('_id', 'test'),
        {
          headers: {
            Authorization: 'Bearer ' + token.getToken(),
          },
        },
      )
      .then(async (res) => {
        await this.setState({
          subject: res.data.chapterID,
        });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
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
        <View>
          {this.renderSubject()}
          <NavigationEvents
            onDidFocus={() => {
              this.getCourse();
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

  renderSubject() {
    return (
      <View style={styles.main}>
        <View style={styles.test2}>
          <AnimationButton
            // animationIn="fadeIn"
            animation="bounceIn"
            text="test"
            // color="red"
            onPress={() => {
              this.props.navigation.navigate('Exercise', {
                _id: this.props.navigation.getParam('_id', 'test'),
                test: true,
              });
            }}
            styles={styles}>
            <TouchableOpacity style={styles.test3}>
              <Image
                source={require('../../images/3.png')}
                style={{width: 60, height: 60}}></Image>
              <Text style={styles.font}>แบบฝึกหัดก่อนเรียน</Text>
            </TouchableOpacity>
          </AnimationButton>
        </View>

        {/* <Button
          raised
          primary
          text="Primary"
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('Exercise', {
              _id: this.props.navigation.getParam('_id', 'test'),
              test: true,
            });
          }}>
          <Text style={styles.font}>แบบฝึกหัดก่อนเรียน</Text>
        </Button> */}

        {this.state.subject.map((item) => (
          <View style={styles.test2}>
            <AnimationButton
              // animationIn="fadeIn"
              animation="bounceIn"
              text="test"
              // color="red"
              onPress={() => {
                this.props.navigation.navigate('Chapter', {
                  _id: item._id,
                });
              }}
              styles={styles}>
              <TouchableOpacity style={styles.test}>
                <Image
                  source={require('../../images/2.png')}
                  style={{width: 60, height: 60}}></Image>

                <Text style={styles.font}>{item.chapterName}</Text>
              </TouchableOpacity>
            </AnimationButton>
          </View>

          // <View style={styles.rowContainer}>
          //   <View>
          //     <Button
          //       raised
          //       primary
          //       text="Primary"
          //       style={styles.button}
          //       onPress={() => {
          //         this.props.navigation.navigate('Chapter', {
          //           _id: item._id,
          //         });
          //       }}>
          //       <Text style={styles.font}>{item.chapterName}</Text>
          //     </Button>
          //   </View>
          // </View>
        ))}
        <View style={styles.test2}>
          <AnimationButton
            // animationIn="fadeIn"
            animation="bounceIn"
            text="test"
            // color="red"
            onPress={() => {
              this.props.navigation.navigate('Exercise', {
                _id: this.props.navigation.getParam('_id', 'test'),
                test: false,
              });
            }}
            styles={styles}>
            <TouchableOpacity style={styles.test3}>
              <Image
                source={require('../../images/3.png')}
                style={{width: 60, height: 60}}></Image>
              <Text style={styles.font}>แบบฝึกหัดหลังเรียน</Text>
            </TouchableOpacity>
          </AnimationButton>
        </View>

        {/* <Button
          raised
          primary
          text="Primary"
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('Exercise', {
              _id: this.props.navigation.getParam('_id', 'test'),
              test: false,
            });
          }}>
          <Text style={styles.font}>แบบฝึกหัดหลังเรียน</Text>
        </Button> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: '#e0e0e0'
  },
  Input: {
    justifyContent: 'center',
    width: 350,
    height: 50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    justifyContent: 'center',
    width: 350,
    height: 80,
    borderRadius: 20,
    flexDirection: 'column',
    marginTop: 10,
    backgroundColor: '#005b9f',
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
  font: {
    fontSize: 20,
    fontFamily: 'Kanit-Thin',
  },
  test: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '90%',
    backgroundColor: '#217983',
    borderRadius: 40,
    padding: 15,
  },
  test3: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '90%',
    backgroundColor: '#b23751',
    borderRadius: 40,
    padding: 15,
  },
  test2: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 8,
    // justifyContent: 'center',
  },
});
