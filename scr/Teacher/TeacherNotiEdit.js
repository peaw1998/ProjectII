import React, {Component} from 'react';
import {View, Text, Button, Input, Item, Spinner} from 'native-base';
import {StyleSheet, Image, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import token from '../token';

export default class TeacherSubjectEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationName: '',
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
    this.getCourse();
  };

  getCourse = async () => {
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
      .then(async (res) => {
        await this.setState({
          notificationName: res.data.notificationName,
          content: res.data.content,
        });
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

  Put = async () => {
    if (this.state.isPress == false) {
      this.setState({isPress: true});
      await axios
        .put(
          'https://fast-ridge-57035.herokuapp.com/api/notification/' +
            this.props.navigation.getParam('_id', 'test'),
          {
            notificationName: this.state.notificationName,
            content: this.state.content,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token.getToken(),
            },
          },
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res);
        });

      this.props.navigation.navigate('ประกาศทั้งหมด');
    }
  };

  Delete = async () => {
    if (this.state.isPress2 == false) {
      this.setState({isPress2: true});
      await axios
        .delete(
          'https://fast-ridge-57035.herokuapp.com/api/notification/' +
            this.props.navigation.getParam('_id', 'test'),
          {
            headers: {
              Authorization: 'Bearer ' + token.getToken(),
            },
          },
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res);
        });

      this.props.navigation.navigate('ประกาศทั้งหมด');
    }
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
          <Text style={styles.font}>ชื่อประกาศ</Text>
          <Item style={styles.Input}>
            <TextInput
              onChangeText={(e) => {
                this.setState({notificationName: e});
              }}
              value={this.state.notificationName}
            />
          </Item>
          <Text style={styles.font}>เนื้อหาประกาศ</Text>
          <Item style={styles.Input2}>
            <TextInput
              multiline
              onChangeText={(e) => {
                this.setState({content: e});
              }}
              value={this.state.content}
            />
          </Item>
          <Item style={styles.button}>
            <Button
              style={{backgroundColor: '#00701a', borderRadius: 20}}
              onPress={() => {
                this.Put();
              }}>
              <Text style={styles.font}>บันทึก</Text>
            </Button>
            <Button
              style={{
                marginLeft: 20,
                backgroundColor: '#ab000d',
                borderRadius: 20,
              }}
              onPress={this.toggleModal}>
              <Text style={styles.font}>ลบ</Text>
            </Button>
          </Item>
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
                ต้องการลบประกาศนี้จริงหรือไม่?
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
                  <Text style={styles.font}>ยืนยัน</Text>
                </Button>
                <Button
                  style={{
                    marginLeft: 20,
                    width: 100,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#9e9e9e',
                  }}
                  title="Show modal"
                  onPress={this.toggleModal}>
                  <Text style={styles.font}>ยกเลิก</Text>
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
