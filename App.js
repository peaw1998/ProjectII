import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Container from './scr/Container';
import {COLOR, ThemeContext, getTheme} from 'react-native-material-ui';

import TeacherHome from './scr/Teacher/TeacherHome';
import TeacherSubOrEx from './scr/Teacher/TeacherSubOrEx';
import TeacherSubject from './scr/Teacher/TeacherSubject';
import TeacherSubjectEdit from './scr/Teacher/TeacherSubjectEdit';
import TeacherAddChapter from './scr/Teacher/TeacherAddChapter';
import TeacherAddSubject from './scr/Teacher/TeacherAddSubject';
import TeacherExercise from './scr/Teacher/TeacherExercise';
import TeacherExerciseEdit from './scr/Teacher/TeacherExerciseEdit';
import TeacherFill from './scr/Teacher/TeacherFill';
import TeacherChoice from './scr/Teacher/TeacherChoice';
import TeacherDragAndDrop from './scr/Teacher/TeacherDragAndDrop';
import TeacherFillEdit from './scr/Teacher/TeacherFillEdit';
import TeacherChoiceEdit from './scr/Teacher/TeacherChoiceEdit';
import TeacherDragAndDropEdit from './scr/Teacher/TeacherDragAndDropEdit';
import Test from './scr/Teacher/Test';

import LearnerHome from './scr/Learner/LearnerHome';

const uiTheme = {
  palette: {
    primaryColor: COLOR.blue500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

const MainNavigator = createStackNavigator(
  {
    วิชาทั้งหมด: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherHome {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    เพิ่มวิชา: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherAddSubject {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    เลือกแก้ไข: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherSubOrEx {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    บทเรียน: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherSubject {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    แก้ไขบทเรียน: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherSubjectEdit {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    เพิ่มบทเรียน: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherAddChapter {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    แบบฝึกหัด: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <TeacherExercise {...props} />
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    แก้ไขแบบฝึกหัด: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherExerciseEdit {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    เพิ่มแบบฝึกหัดเติมคำตอบ: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherFill {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    เพิ่มแบบฝึกหัดแบบหลายตัวเลือก: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherChoice {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    เพิ่มแบบฝึกหัดแบบลากและวาง: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherDragAndDrop {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    แก้ไขคำถาม: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherFillEdit {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    แก้ไขคำถาม2: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherChoiceEdit {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    แก้ไขคำถาม3: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherDragAndDropEdit {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    Courses: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <LearnerHome {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    Test123: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <Test {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
  },
  {
    initialRouteName: 'วิชาทั้งหมด',

    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0288d1',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        // fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
