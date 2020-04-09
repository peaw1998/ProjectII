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
import HTML from 'react-native-render-html';
import token from '../token';

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
      return <View>{this.renderSubject()}</View>;
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
      <>
        <View>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../../images/2.png')} />
                <Body>
                  <Text style={styles.font2}>{this.state.chapter_name}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                {/* <Text style={styles.font3}>{this.state.content}</Text>
                 */}
                <View style={{backgroundColor: '#'}}>
                  <HTML
                    html={this.state.content}
                    imagesMaxWidth={Dimensions.get('window').width}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
        </View>
      </>
    );
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
