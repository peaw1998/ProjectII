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
import moment from 'moment';

export default class LearnerNoti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Noti: [],
      isLoading: true,
    };
  }
  componentDidMount = async () => {
    this.getNoti();
  };

  getNoti = async () => {
    await axios
      .get('https://fast-ridge-57035.herokuapp.com/api/notifications', {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InBpbXdpcGEi.Fr9-EvO3sQMjy19gYCMOTS3KzhoxPovPyDavL2R9qbI',
        },
      })
      .then(async (res) => {
        await this.setState({
          Noti: res.data,
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
        {this.state.Noti.map((item) => (
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../../images/5.png')} />
                <Body>
                  <Text style={styles.font2}>{item.notificationName}</Text>
                  <Text note>
                    update {moment(item.updatedAt).format('DD/MM/YYYY')}
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.font3}>
                  {item.content.length <= 100
                    ? item.content
                    : item.content.slice(0, 120) + '...'}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left />
              <Right>
                <Button
                  rounded
                  info
                  textStyle={{color: '#87838B'}}
                  onPress={() => {
                    this.props.navigation.navigate('Announcement', {
                      _id: item._id,
                    });
                  }}>
                  <Text style={styles.font}>ดูเพิ่มเติม</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        ))}
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
