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
} from 'native-base';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
import AnimationButton from '../../Animation';

export default class LearnerNotiShow extends Component {
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
        <Card style={{flex: 0}}>
          <CardItem>
            <Left>
              <Thumbnail source={require('../../images/5.png')} />
              <Body>
                <Text style={styles.font2}>{this.state.notificationName}</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.font3}>{this.state.content}</Text>
            </Body>
          </CardItem>
        </Card>
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
});
