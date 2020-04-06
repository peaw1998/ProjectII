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

export default class LearnerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationName: '[]',
      content: '',
      isLoading: true,
    };
  }
  componentDidMount = async () => {
    this.getNoti();
  };

  getNoti = async () => {
    await axios
      .get(
        'https://fast-ridge-57035.herokuapp.com/api/notification/' +
          this.props.navigation.getParam('_id', 'test'),
        {
          headers: {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InBpbXdpcGEi.Fr9-EvO3sQMjy19gYCMOTS3KzhoxPovPyDavL2R9qbI',
          },
        },
      )
      .then(async (res) => {
        await this.setState({
          notificationName: res.data.notificationName,
          content: res.data.content,
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
              this.getNoti();
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
        <Card style={{flex: 0, height: 450}}>
          <CardItem>
            <Left>
              <Thumbnail source={require('../../images/6.png')} />
              <Body>
                <Text style={styles.font2}>123</Text>
                <Text note>123</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.font3}>123</Text>
            </Body>
          </CardItem>
        </Card>
        <View style={styles.test2}>
          <AnimationButton
            animation="bounceIn"
            text="test"
            onPress={() => {
              this.props.navigation.navigate('Reset');
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
            //   onPress={() => {
            //     this.props.navigation.navigate('Profile');
            //   }}
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
