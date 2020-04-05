import React, {Component} from 'react';
import {
  Navigator,
  NativeModules,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
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

export default class LearnerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: [],
      isLoading: true,
      text: 'a',
    };
  }

  componentDidMount = async () => {
    this.getCourse();
  };

  getCourse = async () => {
    await axios
      .get('https://fast-ridge-57035.herokuapp.com/api/subjects', {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InBpbXdpcGEi.Fr9-EvO3sQMjy19gYCMOTS3KzhoxPovPyDavL2R9qbI',
        },
      })
      .then(async (res) => {
        await this.setState({
          subject: res.data.users,
        });
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
  renderSubject = () => {
    return (
      <>
        <View
          style={{
            height: 300,
            backgroundColor: '#fff',
          }}>
          <ImageBackground
            source={require('../../images/bg-noti2.png')}
            style={styles.image}>
            <Text style={styles.font3}>ประกาศ</Text>
            <Button
              rounded
              info
              onPress={() => {
                this.props.navigation.navigate('Announcements');
              }}>
              <Text style={styles.font2}>ดูประกาศทั้งหมด</Text>
            </Button>
          </ImageBackground>
        </View>

        <Text style={styles.font2}>คอร์สเรียนทั้งหมด</Text>
        {/* <View style={{marginLeft: 50}}> */}
        {this.state.subject.map((item) => (
          <View style={styles.test2}>
            <AnimationButton
              // animationIn="fadeIn"
              animation="bounceIn"
              text="test"
              // color="red"
              onPress={() => {
                this.props.navigation.navigate('Courses', {
                  _id: item._id,
                });
              }}
              styles={styles}>
              <TouchableOpacity style={styles.test}>
                {/* <Left> */}
                <Image
                  source={require('../../images/2.png')}
                  style={{width: 60, height: 60}}></Image>
                {/* </Left> */}
                {/* <Body>
                  <Text style={styles.font}>{item.subjectName}</Text>
                </Body> */}
                {/* <Right> */}
                <Text style={styles.font}>{item.subjectName}</Text>
                {/* </Right> */}
              </TouchableOpacity>
            </AnimationButton>

            {/* <AnimationButton
                // animationIn="fadeIn"
                animation="rubberBand"
                text="test"
                color="red"
                onPress={() => {
                  this.props.navigation.navigate('Courses', {
                    _id: item._id,
                  });
                }}
                styles={styles}>
                <Button text="Primary" style={styles.button}>
                                <Text style={styles.font}>{item.subjectName}</Text>
                </Button>
              </AnimationButton> */}
          </View>
        ))}
        {/* </View> */}
      </>
    );
  };
}

const styles = StyleSheet.create({
  // rowContainer: {
  //   marginTop: 8,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  // },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 250,
    padding: 5,
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
  test2: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 8,
    // justifyContent: 'center',
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
    borderRadius: 50,
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
    fontSize: 25,
    fontFamily: 'Kanit-Bold',
    color: 'white',
    marginLeft: 15,
  },
  font2: {
    fontSize: 25,
    fontFamily: 'Kanit-Bold',
    color: '#435056',
    padding: 10,
  },
  font3: {
    fontSize: 45,
    fontFamily: 'Kanit-Bold',
    color: '#435056',
    marginLeft: 15,
    marginTop: 10,
  },
  cell: {
    padding: 16,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  name: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
