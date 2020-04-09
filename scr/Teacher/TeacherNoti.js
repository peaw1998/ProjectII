import React, {Component} from 'react';
import {View, Text, Button, Input, Item, Spinner} from 'native-base';
import {StyleSheet, Image} from 'react-native';
import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
import token from '../token';

export default class TeacherNoti extends Component {
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
          Authorization: 'Bearer ' + token.getToken(),
        },
      })
      .then(async res => {
        await this.setState({
          Noti: res.data,
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
      <View
      // style={styles.main}
      >
        {/* <View style={styles.rowContainer}>
          <View>
            <Button raised primary text="Primary" style={styles.button}>
              <Text style={styles.font}>123</Text>
            </Button>
          </View>
        </View> */}
        {this.state.Noti.map(item => (
          <View style={styles.rowContainer}>
            <View>
              <Button
                raised
                primary
                text="Primary"
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate('แก้ไขประกาศ', {
                    _id: item._id,
                  });
                }}>
                <Text style={styles.font}>{item.notificationName}</Text>
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
                this.props.navigation.navigate('เพิ่มประกาศ', {
                  _id: this.props.navigation.getParam('_id', 'test'),
                });
              }}>
              {/* <Text style={styles.font}>เพิ่มบทเรียน</Text> */}
              <Text style={{fontSize: 50}}>+</Text>
            </Button>
          </View>
        </View>
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
    backgroundColor: '#e0e0e0',
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
});
