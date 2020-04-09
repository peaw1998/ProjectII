import React, {Component} from 'react';
import {
  Navigator,
  NativeModules,
  Text,
  StyleSheet,
  View,
  ScrollView,
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
import {Button} from 'native-base';
import axios from 'axios';
import token from '../token';
import Modal from 'react-native-modal';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPress: false,
      isModalVisible: false,
    };
  }
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  Delete = async () => {
    if (this.state.isPress == false) {
      this.setState({isPress: true});
      await axios
        .delete(
          'https://fast-ridge-57035.herokuapp.com/api/subject/' +
            this.props.navigation.getParam('_id', ''),
          {
            headers: {
              Authorization: 'Bearer ' + token.getToken(),
            },
          },
        )
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
      this.props.navigation.navigate('วิชาทั้งหมด');
    }
  };

  render() {
    return (
      <>
        <View style={styles.Main}>
          <View style={styles.rowContainer}>
            <View style={styles.button}>
              <Button
                raised
                primary
                text="Primary"
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate('บทเรียน', {
                    _id: this.props.navigation.getParam('_id', 'test'),
                  });
                }}>
                <Text style={styles.font}>เนื้อหาบทเรียน</Text>
              </Button>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.button}>
              <Button
                raised
                primary
                text="Primary"
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate('แบบฝึกหัด', {
                    _id: this.props.navigation.getParam('_id', 'test'),
                  });
                }}>
                <Text style={styles.font}>แบบฝึกหัด</Text>
              </Button>
            </View>
          </View>
          <Button raised primary text="Primary" style={styles.button2}>
            <Text style={styles.font} onPress={this.toggleModal}>
              ลบวิชา
            </Text>
          </Button>
        </View>

        <View style={styles.center}>
          <Modal
            isVisible={this.state.isModalVisible}
            onBackdropPress={() => {
              this.setState({isModalVisible: !this.state.isModalVisible});
            }}
            style={styles.center}>
            <View style={styles.Modal}>
              <Text
                style={{
                  marginTop: 100,
                  fontSize: 20,
                  fontFamily: 'Kanit-Thin',
                }}>
                ต้องการลบวิชานี้หรือไม่
              </Text>
              <View style={styles.buttonModal}>
                <Button
                  danger
                  style={{
                    width: 100,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  title="Show modal"
                  onPress={this.Delete}>
                  <Text style={styles.font2}>ตกลง</Text>
                </Button>
                <Button
                  warning
                  style={{
                    width: 100,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 5,
                  }}
                  title="Show modal"
                  onPress={this.toggleModal}>
                  <Text style={styles.font2}>ยกเลิก</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  button: {
    justifyContent: 'center',
    width: 300,
    height: 200,
    borderRadius: 20,
    flexDirection: 'column',
    fontFamily: 'Kanit-Bold',
    backgroundColor: '#005b9f',
  },
  button2: {
    justifyContent: 'center',
    width: 300,
    height: 50,
    borderRadius: 20,
    flexDirection: 'column',
    fontFamily: 'Kanit-Bold',
    backgroundColor: '#b23751',
  },
  font: {
    fontSize: 30,
    fontFamily: 'Kanit-Bold',
    color: 'white',
  },
  font2: {
    fontSize: 20,
    fontFamily: 'Kanit-Regular',
    color: 'white',
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
