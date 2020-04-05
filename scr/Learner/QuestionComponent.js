import React, {Component} from 'react';
import {
  Navigator,
  NativeModules,
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Button, Spinner, Input} from 'native-base';
import {NavigationEvents} from 'react-navigation';
import {TextInput} from 'react-native-gesture-handler';
import OneRowsPage from './OneRowsPage';
import _ from 'lodash';
import AnimationButton from '../../Animation';
export default class QuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // correctAnswer: 'options4',
      // options: {
      //     options1: '1',
      //     options2: '2',
      //     options3: '3',
      //     options4: '4',
      // },
      // question: 'test123',
      // type: 'choice'

      // correctAnswer: '1',
      // question: 'test123',
      // type: 'fill'

      // correctAnswer: {
      //     answer1: '1',
      //     answer2: '2',
      //     answer3: '3',
      //     answer4: '4',
      // },
      // question: 'test123',
      // type: 'draganddrop'
      ...this.props.data,
    };
  }

  // componentDidUpdate = (prevProps) => {
  //     if (this.props.data && this.state.question !== this.props.data.question) {
  //         // if (this.props.data.question !== prevProps.data.question) {
  //         this.setState({ ...this.props.data })
  //         // }
  //     }
  // }

  componentDidMount = async () => {
    this.getCourse();
  };

  render() {
    if (this.props.data?.type === 'choice') {
      return (
        <View style={styles.colContainer}>
          <View style={styles.Question}>
            <Text style={styles.font}>{this.props.data?.question}</Text>
          </View>
          <View style={styles.test2}>
            <AnimationButton
              animation="jello"
              text="test"
              onPress={() => {
                this.props.setNewData({
                  ...this.props.data,
                  correctAnswer: 'options1',
                });
                this.props.toNextPage();
              }}
              styles={styles}>
              <TouchableOpacity
                style={
                  this.props.data.correctAnswer === 'options1'
                    ? styles.buttonRed
                    : styles.button
                }>
                <Text style={styles.font}>
                  {this.props.data?.options.options1}
                </Text>
              </TouchableOpacity>
            </AnimationButton>
          </View>

          <View style={styles.test2}>
            <AnimationButton
              animation="jello"
              text="test"
              onPress={() => {
                this.props.setNewData({
                  ...this.props.data,
                  correctAnswer: 'options2',
                });
                this.props.toNextPage();
              }}
              styles={styles}>
              <TouchableOpacity
                style={
                  this.props.data.correctAnswer === 'options2'
                    ? styles.buttonRed
                    : styles.button
                }>
                <Text style={styles.font}>
                  {this.props.data?.options.options2}
                </Text>
              </TouchableOpacity>
            </AnimationButton>
          </View>

          <View style={styles.test2}>
            <AnimationButton
              animation="jello"
              text="test"
              onPress={() => {
                this.props.setNewData({
                  ...this.props.data,
                  correctAnswer: 'options3',
                });
                this.props.toNextPage();
              }}
              styles={styles}>
              <TouchableOpacity
                style={
                  this.props.data.correctAnswer === 'options3'
                    ? styles.buttonRed
                    : styles.button
                }>
                <Text style={styles.font}>
                  {this.props.data?.options.options3}
                </Text>
              </TouchableOpacity>
            </AnimationButton>
          </View>

          <View style={styles.test2}>
            <AnimationButton
              animation="jello"
              text="test"
              onPress={() => {
                this.props.setNewData({
                  ...this.props.data,
                  correctAnswer: 'options4',
                });
                this.props.toNextPage();
              }}
              styles={styles}>
              <TouchableOpacity
                style={
                  this.props.data.correctAnswer === 'options4'
                    ? styles.buttonRed
                    : styles.button
                }>
                <Text style={styles.font}>
                  {this.props.data?.options.options4}
                </Text>
              </TouchableOpacity>
            </AnimationButton>
          </View>

          {/* <Button
            style={
              this.props.data.correctAnswer === 'options2'
                ? styles.buttonRed
                : styles.button
            }
            onPress={() => {
              this.props.setNewData({
                ...this.props.data,
                correctAnswer: 'options2',
              });
              this.props.toNextPage();
            }}>
            <Text>{this.props.data?.options.options2}</Text>
          </Button>*/}
        </View>
      );
    } else if (this.props.data?.type === 'fill') {
      return (
        <View style={styles.colContainer}>
          <View style={styles.Question}>
            <Text style={styles.font}>{this.props.data?.question}</Text>
          </View>

          <TextInput
            style={styles.Input}
            onChangeText={text => {
              this.props.setNewData({...this.props.data, correctAnswer: text});
            }}
            value={this.props.data?.correctAnswer}
          />
        </View>
      );
    } else if (this.props.data?.type === 'draganddrop') {
      return (
        <SafeAreaView style={styles.colContainer}>
          <Text style={styles.font}>{this.props.data?.question}</Text>
          <OneRowsPage
            data={this.props.data?.correctAnswer}
            onChange={data => {
              //   console.log('what', data);
              this.props.setNewData({
                ...this.props.data,
                correctAnswer: data,
              });
            }}
          />
        </SafeAreaView>
      );
    }
    return <Text>{JSON.stringify(this.props.data)}</Text>;
  }
  renderItem(item, index) {
    return (
      <View style={styles.item}>
        <View style={styles.item_children}>
          <Text style={styles.item_text}>{item}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    margin: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colContainer: {
    // margin: 8,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  list: {
    marginHorizontal: 50,
    justifyContent: 'center',
  },
  buttonDiv: {
    marginHorizontal: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 50,
    borderRadius: 20,
    flexDirection: 'column',
    backgroundColor: '#346ca5',
    marginTop: 10,
  },
  buttonRed: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 50,
    borderRadius: 20,
    flexDirection: 'column',
    backgroundColor: '#b23751',
    marginTop: 10,
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
    fontFamily: 'Kanit-Regular',
    color: '#333333',
  },
  Question: {
    padding: 10,
  },
  Input: {
    justifyContent: 'center',
    width: 350,
    height: 50,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderRadius: 10,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_children: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  item_text: {
    marginLeft: 15,
    color: '#2ecc71',
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
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'center',
  },
});
