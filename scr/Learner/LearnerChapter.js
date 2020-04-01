import React, {Component} from 'react';
import {View, Text, Button, Input, Item, Spinner} from 'native-base';
import {StyleSheet, Image, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
// import HTML from 'react-native-render-html';

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
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InBpbXdpcGEi.Fr9-EvO3sQMjy19gYCMOTS3KzhoxPovPyDavL2R9qbI',
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
        <View style={styles.main}>
          <Text style={styles.font}>ชื่อบทเรียน</Text>
          <Item style={styles.Input}>
            <TextInput
              sonChangeText={e => {
                this.setState({chapter_name: e});
              }}
              value={this.state.chapter_name}
            />
          </Item>
          <Text style={styles.font}>เนื้อหา</Text>
          {/* <View style={{backgroundColor: '#'}}>
            <HTML
              html={this.state.content}
              imagesMaxWidth={Dimensions.get('window').width}
            />
          </View> */}
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
  Input2: {
    justifyContent: 'center',
    width: 350,
    height: 450,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    justifyContent: 'center',
    width: 100,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    marginTop: 10,
  },
  font: {
    fontSize: 20,
    fontFamily: 'Kanit-Thin',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Modal: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  buttonModal: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
});
