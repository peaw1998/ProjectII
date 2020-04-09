import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Input,
  Item,
  Spinner,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Left,
  Body,
  Right,
  Footer,
} from 'native-base';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
import AnimationButton from '../../Animation';
import token from '../token';

export default class TeacherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '[]',
      email: '',
      isLoading: true,
    };
  }
  componentDidMount = async () => {
    this.getProfile();
  };

  getProfile = async () => {
    await axios
      .get('https://fast-ridge-57035.herokuapp.com/auth/teacher/profile', {
        headers: {
          Authorization: 'Bearer ' + token.getToken(),
        },
      })
      .then(async res => {
        await this.setState({
          username: res.data.username,
          email: res.data.email,
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
        <View>
          {this.renderSubject()}
          <NavigationEvents
            onDidFocus={() => {
              this.getProfile();
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
      <View>
        <Card style={{flex: 0, height: 200}}>
          <CardItem>
            <Left>
              <Thumbnail source={require('../../images/6.png')} />
              <Body>
                <Text style={styles.font2}>{this.state.username}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Text style={styles.font3}>Username</Text>
            </Left>
            <Body
              style={{borderColor: '#a0a0a0', borderWidth: 1, borderRadius: 5}}>
              <Text style={styles.font3}>{this.state.username}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Text style={styles.font3}>E-mail</Text>
            </Left>
            <Body
              style={{borderColor: '#a0a0a0', borderWidth: 1, borderRadius: 5}}>
              <Text style={styles.font3}>{this.state.email}</Text>
            </Body>
          </CardItem>
        </Card>
        <View style={styles.test2}>
          <AnimationButton
            animation="bounceIn"
            text="test"
            onPress={() => {
              this.props.navigation.navigate('ตั้งค่า', {
                username: this.state.username,
              });
            }}
            styles={styles}>
            <TouchableOpacity style={styles.reset}>
              <Body>
                <Text style={styles.font4}>Reset Password</Text>
              </Body>
            </TouchableOpacity>
          </AnimationButton>
        </View>
        <View style={styles.test2}>
          <AnimationButton
            animation="bounceIn"
            text="test"
            onPress={() => {
              token.removeToken();
              this.props.navigation.navigate('Login');
            }}
            styles={styles}>
            <TouchableOpacity style={styles.profile}>
              <Body>
                <Text style={styles.font4}>Log out</Text>
              </Body>
            </TouchableOpacity>
          </AnimationButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: '#e0e0e0'
  },
  font4: {
    fontSize: 25,
    fontFamily: 'Kanit-Bold',
    color: 'white',
    marginLeft: 15,
  },
  font: {
    fontSize: 15,
    fontFamily: 'Kanit-Regular',
    color: '#000',
  },
  font2: {
    fontSize: 22,
    fontFamily: 'Kanit-Regular',
    color: '#000',
  },
  font3: {
    fontSize: 18,
    fontFamily: 'Kanit-Regular',
    color: '#000',
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#b23751',
    padding: 10,
    margin: 5,
  },
  reset: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffc508',
    padding: 10,
    margin: 5,
  },
  test2: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 8,
  },
});
