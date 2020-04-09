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
import {StyleSheet, Image, TextInput, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
// import HTML from 'react-native-render-html';
import token from '../token';
import {WebView} from 'react-native-webview';

export default class LearnerChapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter_name: '',
      content: '',
      isLoading: true,
      isModalVisible: false,
      isPress: false,
      isPress2: false,
    };
  }
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  componentDidMount = async () => {
    this.GetChapter();
  };

  GetChapter = async () => {
    await axios
      .get(
        'https://fast-ridge-57035.herokuapp.com/api/chapter/' +
          this.props.navigation.getParam('_id', 'test'),
        {
          headers: {
            Authorization: 'Bearer ' + token.getToken(),
          },
        },
      )
      .then(async res => {
        await this.setState({
          chapter_name: res.data.chapterName,
          content: res.data.content,
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
        <WebView
          originWhitelist={['*']}
          source={{
            html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>
            <h1 style="text-align:center;">${this.state.chapter_name}</h1>
            <hr/>
            ${this.state.content}</body></html>`,
          }}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Spinner color="blue" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
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

  font: {
    fontSize: 15,
    fontFamily: 'Kanit-Regular',
    color: '#000',
  },
  font2: {
    fontSize: 25,
    fontFamily: 'Kanit-Regular',
    color: '#000',
  },
  font3: {
    fontSize: 18,
    fontFamily: 'Kanit-Regular',
    color: '#000',
  },
});
