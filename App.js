import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Container from './scr/Container';
import LoginS from './scr/Login';
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
import LearnerSubject from './scr/Learner/LearnerSubject';
import LearnerChapter from './scr/Learner/LearnerChapter';
import LearnerExercise from './scr/Learner/LearnerExercise';

import LoginScreen from './scr/Login/LoginScreen';
import TeacherNoti from './scr/Teacher/TeacherNoti';
import TeacherNotiEdit from './scr/Teacher/TeacherNotiEdit';
import TeacherAddNoti from './scr/Teacher/TeacherAddNoti';
import LearnerNoti from './scr/Learner/LearnerNoti';
import LearnerNotiShow from './scr/Learner/LearnerNotiShow';
import RegisTeacher from './scr/Login/RegisTeacher';
import RegisLearner from './scr/Login/RegisLearner';
import ForgetTeacher from './scr/Login/FogetTeacher';
import ForgetLearner from './scr/Login/ForgetLearner';

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
      navigationOptions: {
        headerShown: false,
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
    ประกาศทั้งหมด: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherNoti {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    แก้ไขประกาศ: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherNotiEdit {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    เพิ่มประกาศ: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <TeacherAddNoti {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    Home: {
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
      navigationOptions: {
        headerShown: false,
      },
    },
    Courses: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <LearnerSubject {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    Chapter: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <LearnerChapter {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    Exercise: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <LearnerExercise {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    Announcements: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <LearnerNoti {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    Announcement: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <Container>
              <ScrollView>
                <LearnerNotiShow {...props} />
              </ScrollView>
            </Container>
          </ThemeContext.Provider>
        );
      },
    },
    สมัครสมาชิก: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <LoginS>
              <ScrollView>
                <RegisTeacher {...props} />
              </ScrollView>
            </LoginS>
          </ThemeContext.Provider>
        );
      },
    },
    Register: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <LoginS>
              <ScrollView>
                <RegisLearner {...props} />
              </ScrollView>
            </LoginS>
          </ThemeContext.Provider>
        );
      },
    },
    ลืมรหัสผ่าน: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <LoginS>
              <ScrollView>
                <ForgetTeacher {...props} />
              </ScrollView>
            </LoginS>
          </ThemeContext.Provider>
        );
      },
    },
    Password: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <LoginS>
              <ScrollView>
                <ForgetLearner {...props} />
              </ScrollView>
            </LoginS>
          </ThemeContext.Provider>
        );
      },
    },
    Login: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <LoginS>
              <ScrollView>
                <LoginScreen {...props} />
              </ScrollView>
            </LoginS>
          </ThemeContext.Provider>
        );
      },
      navigationOptions: {
        headerShown: false,
      },
    },
    Test123: {
      screen: props => {
        return (
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            <LoginS>
              <ScrollView>
                <Test {...props} />
              </ScrollView>
            </LoginS>
          </ThemeContext.Provider>
        );
      },
    },
  },
  {
    initialRouteName: 'Login',

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
