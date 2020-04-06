import React, {Component} from 'react';
import {View, Button, Text, Spinner, Row} from 'native-base';
import {StyleSheet, Image} from 'react-native';
import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
import QuestionComponent from './QuestionComponent';
import token from '../token';
import _ from 'lodash';
import {eq} from 'react-native-reanimated';
export const initial = {
  question: [],
  isLoading: true,
  test: '',
};

export default class LearnerExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
      AllQuestion: [],
      AllQuestionDraft: [],
      isLoading: true,
      test: this.props.navigation.getParam('test', 'test1'),
      index: 0,
      temp: {},
      point: 0,
    };
  }

  test = async () => {
    await this.Get();
    console.log(this.state.question);
    let arr = this.state.question.filter((item) => {
      if (item.preTest === this.state.test) return true;
      else return false;
    });
    this.setState({
      AllQuestion: arr,
    });

    let arr2 = this.state.question.filter((item) => {
      if (item.postTest !== this.state.test) return true;
      else return false;
    });
    this.setState(
      {
        AllQuestion: arr2,
      },
      () => {
        this.setState({
          AllQuestionDraft: [
            ...this.state.AllQuestion[0]?.Question.map((item) => {
              return {
                ...item,
                correctAnswer:
                  item.type === 'draganddrop'
                    ? _.shuffle(Object.values(item.correctAnswer))
                    : '',
              };
            }),
          ],
        });
      },
    );
  };

  componentDidMount = async () => {
    this.test();
  };

  Get = async () => {
    await axios
      .get(
        'https://fast-ridge-57035.herokuapp.com/api/exercises/subject/' +
          this.props.navigation.getParam('_id', 'test'),
        {
          headers: {
            Authorization: 'Bearer ' + token.getToken(),
          },
        },
      )
      .then(async (res) => {
        await this.setState({
          question: res.data,
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

  score = () => {
    return this.state.AllQuestion[0]?.Question.filter((item, index) => {
      if (this.state.AllQuestionDraft[index] && item.type === 'draganddrop') {
        if (
          JSON.stringify(this.state.AllQuestionDraft[index].correctAnswer) ===
          JSON.stringify(Object.values(item.correctAnswer))
        ) {
          console.log('text', this.state.AllQuestionDraft[index]);
          console.log('text22', item);
          return true;
        }
      } else if (this.state.AllQuestionDraft[index]) {
        if (
          this.state.AllQuestionDraft[index].correctAnswer ===
          item.correctAnswer
        ) {
          return true;
        }
      }

      return false;
    }).length;
  };
  render() {
    if (this.state.isLoading === false) {
      return (
        <>
          {this.render2()}
          <NavigationEvents
            onDidFocus={() => {
              this.setState({...initial}, () => {
                this.test();
              });
            }}
          />
        </>
      );
    } else {
      return (
        <View style={styles.container}>
          <Spinner color="blue" />
        </View>
      );
    }
  }
  render2 = () => {
    return (
      <View style={styles.main}>
        {this.state.index <= this.state.AllQuestionDraft.length - 1 ? (
          <QuestionComponent
            data={this.state.AllQuestionDraft[this.state.index]}
            setNewData={(t) => {
              this.setState({
                AllQuestionDraft: this.state.AllQuestionDraft.map(
                  (item, index) => {
                    if (index === this.state.index) {
                      return t;
                    }
                    return item;
                  },
                ),
              });
            }}
            toNextPage={() => this.setState({index: this.state.index + 1})}
          />
        ) : (
          <View style={styles.center}>
            <Image
              source={require('../../images/4.png')}
              style={{width: 200, height: 200}}
            />
            <Text style={styles.font3}>คุณได้คะแนน </Text>
            <Text style={styles.font3}>{this.score()}</Text>
          </View>
        )}
        <View style={styles.next}>
          {this.state.index !== 0 &&
          this.state.index <= this.state.AllQuestionDraft.length - 1 ? (
            <Button
              rounded
              warning
              onPress={() => this.setState({index: this.state.index - 1})}>
              <Text style={styles.font2}>ก่อนหน้า</Text>
            </Button>
          ) : null}
          {this.state.index <= this.state.AllQuestionDraft.length - 1 ? (
            <Button
              rounded
              success
              style={{marginLeft: 10}}
              onPress={() => this.setState({index: this.state.index + 1})}>
              <Text style={styles.font2}>ถัดไป</Text>
            </Button>
          ) : null}
        </View>
      </View>
    );
  };
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    height: 650,
  },
  button: {
    justifyContent: 'center',
    width: 350,
    height: 100,
    borderRadius: 20,
    flexDirection: 'column',
    backgroundColor: '#01579b',
  },
  font: {
    fontSize: 30,
    fontFamily: 'Kanit-Bold',
  },
  font3: {
    fontSize: 30,
    fontFamily: 'Kanit-Bold',
    color: '#217983',
  },
  font2: {
    fontSize: 20,
    fontFamily: 'Kanit-Regular',
  },
  next: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
  },
});
