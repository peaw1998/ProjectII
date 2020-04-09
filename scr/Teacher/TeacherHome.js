import React, {Component} from 'react';
import {
  Navigator,
  NativeModules,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  COLOR,
  ThemeContext,
  getTheme,
  Toolbar,
  Card,
  ListItem,
} from 'react-native-material-ui';
import Container from '../Container';
import {Button, Spinner, Left, Right, Body} from 'native-base';
import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
import AnimationButton from '../../Animation';
import token from '../token';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: [],
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    this.getCourse();
  };

  getCourse = async () => {
    await axios
      .get('https://fast-ridge-57035.herokuapp.com/api/subjects', {
        headers: {
          Authorization: 'Bearer ' + token.getToken(),
        },
      })
      .then(async res => {
        await this.setState({
          subject: res.data.users,
        });
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
  renderSubject = () => {
    return (
      <View>
        <Text style={styles.font2}>ประกาศ</Text>
        <View style={styles.rowContainer}>
          <View style={styles.button}>
            <Button
              raised
              primary
              text="Primary"
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('ประกาศทั้งหมด');
              }}>
              <Text style={styles.font}>Announcement</Text>
            </Button>
          </View>
        </View>

        <Text style={styles.font2}>วิชาทั้งหมด</Text>
        {this.state.subject.map(item => (
          <View style={styles.rowContainer}>
            <View style={styles.button}>
              <Button
                raised
                primary
                text="Primary"
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate('เลือกแก้ไข', {
                    _id: item._id,
                  });
                }}>
                <Text style={styles.font}>{item.subjectName}</Text>
              </Button>
            </View>
          </View>
        ))}
        <View style={styles.rowContainer}>
          <View>
            <Button
              raised
              primary
              text="Primary"
              style={styles.button2}
              onPress={() => {
                this.props.navigation.navigate('เพิ่มวิชา');
              }}>
              <Text style={{fontSize: 50}}>+</Text>
            </Button>
          </View>
        </View>
        <View>
          <View style={styles.test2}>
            <AnimationButton
              animation="bounceIn"
              text="test"
              onPress={() => {
                this.props.navigation.navigate('ข้อมูล');
              }}
              styles={styles}>
              <TouchableOpacity style={styles.profile}>
                <Body>
                  <Text style={styles.font}>My Profile</Text>
                </Body>
              </TouchableOpacity>
            </AnimationButton>
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  rowContainer: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  list: {
    marginHorizontal: 50,
    justifyContent: 'center',
  },
  buttonDiv: {
    marginHorizontal: 8,
  },
  button: {
    justifyContent: 'center',
    width: 350,
    height: 100,
    borderRadius: 20,
    flexDirection: 'column',
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
    fontSize: 30,
    fontFamily: 'Kanit-Bold',
    color: 'white',
  },
  font2: {
    padding: 20,
    fontSize: 30,
    fontFamily: 'Kanit-Bold',
    color: '#435056',
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1abc9c',
    // borderRadius: 40,
    padding: 15,
    margin: 5,
  },
  test2: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 8,
    // justifyContent: 'center',
  },
});
