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
import token from '../token';
import moment from 'moment';
import {WebView} from 'react-native-webview';

export default class LearnerNotiShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationName: '[]',
      content: '',
      updatedAt: '',
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
            Authorization: 'Bearer ' + token.getToken(),
          },
        },
      )
      .then(async res => {
        await this.setState({
          notificationName: res.data.notificationName,
          content: res.data.content,
          updatedAt: res.data.updatedAt,
        });
        console.log(res.data);
      })
      .catch(error => {
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
        <>{this.renderSubject()}</>
        // <View>
        //   {this.renderSubject()}
        //   <NavigationEvents
        //     onDidFocus={() => {
        //       this.getNoti();
        //     }}
        //   />
        // </View>
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
      <WebView
        originWhitelist={['*']}
        source={{
          html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>
        <h1 style="text-align:center;">${this.state.notificationName}</h1>
        <hr/>
        ${this.state.content}</body></html>`,
        }}
      />
      // <View>
      //   <Card style={{flex: 0}}>
      //     <CardItem>
      //       <Left>
      //         <Thumbnail source={require('../../images/5.png')} />
      //         <Body>
      //           <Text style={styles.font2}>{this.state.notificationName}</Text>
      //           <Text note>
      //             update {moment(this.state.updatedAt).format('DD/MM/YYYY')}
      //           </Text>
      //         </Body>
      //       </Left>
      //     </CardItem>
      //     <CardItem>
      //       <Body>
      //         <Text style={styles.font3}>{this.state.content}</Text>
      //       </Body>
      //     </CardItem>
      //   </Card>
      // </View>
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
