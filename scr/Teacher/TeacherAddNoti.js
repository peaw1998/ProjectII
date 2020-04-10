import React, {Component} from 'react';
import {View, Text, Button, Input, Item, Spinner} from 'native-base';
import {
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import token from '../token';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNDraftView from 'react-native-draftjs-editor';

export default class TeacherAddNoti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationName: '',
      content: '',
      isPress: false,
      activeStyles: [],
      blockType: 'unstyled',
    };
    this._draftRef = React.createRef();
  }

  Post = async () => {
    if (this.state.isPress == false) {
      this.setState({isPress: true});
      await axios
        .post(
          'https://fast-ridge-57035.herokuapp.com/api/notification',
          {
            notificationName: this.state.notificationName,
            content: this._draftRef.current
              ? this._draftRef.current.getEditorState()
              : this.state.content,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token.getToken(),
            },
          },
        )
        .then(res => {
          console.log(res.data);
        })
        .catch(res => {
          console.log(res);
        });

      this.props.navigation.navigate('ประกาศทั้งหมด');
    }
  };
  render() {
    return (
      <>
        <View style={styles.main}>
          <Text style={styles.font}>ชื่อประกาศ</Text>
          <Item style={styles.Input}>
            <TextInput
              onChangeText={e => {
                this.setState({notificationName: e});
              }}
              value={this.state.notificationName}
            />
          </Item>
          <Text style={styles.font}>เนื้อหาประกาศ</Text>
        </View>
        {this.renderWysiwyg()}

        <View style={styles.main}>
          <Item style={styles.button}>
            <Button
              style={{backgroundColor: '#00701a', borderRadius: 20}}
              onPress={() => {
                this.Post();
              }}>
              <Text style={styles.font}>บันทึก</Text>
            </Button>
          </Item>
        </View>
      </>
    );
  }

  styleMap = {
    STRIKETHROUGH: {
      textDecoration: 'line-through',
    },
  };

  setActiveStyles = e => {
    this.setState({activeStyles: e});
  };

  setActiveBlockType = e => {
    this.setState({blockType: e});
  };

  renderWysiwyg = () => {
    const defaultValue = '';

    const editorLoaded = () => {
      this._draftRef.current && this._draftRef.current.focus();
    };

    const toggleStyle = style => {
      this._draftRef.current && this._draftRef.current.setStyle(style);
    };

    const toggleBlockType = blockType => {
      this._draftRef.current && this._draftRef.current.setBlockType(blockType);
    };
    return (
      <>
        <SafeAreaView style={styles.containerStyle}>
          <RNDraftView
            defaultValue={this.state.content}
            onEditorReady={editorLoaded}
            style={{flex: 1}}
            placeholder={'Add text here...'}
            ref={this._draftRef}
            onStyleChanged={this.setActiveStyles}
            onBlockTypeChanged={this.setActiveBlockType}
            styleMap={this.styleMap}
          />
          <EditorToolBar
            activeStyles={this.state.activeStyles}
            blockType={this.state.blockType}
            toggleStyle={toggleStyle}
            toggleBlockType={toggleBlockType}
          />
          {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
        </SafeAreaView>
      </>
    );
  };
}

const styles = StyleSheet.create({
  main: {
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
  containerStyle: {
    flex: 1,
    // marginTop: 36,
  },
  toolbarContainer: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  controlButtonContainer: {
    padding: 8,
    borderRadius: 2,
  },
});

export const ControlButton = ({text, action, isActive}) => {
  return (
    <TouchableOpacity
      style={[
        styles.controlButtonContainer,
        isActive ? {backgroundColor: 'gold'} : {},
      ]}
      onPress={action}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export const EditorToolBar = ({
  activeStyles,
  blockType,
  toggleStyle,
  toggleBlockType,
}) => {
  return (
    <View style={styles.toolbarContainer}>
      <ControlButton
        text={'B'}
        isActive={activeStyles.includes('BOLD')}
        action={() => toggleStyle('BOLD')}
      />
      <ControlButton
        text={'I'}
        isActive={activeStyles.includes('ITALIC')}
        action={() => toggleStyle('ITALIC')}
      />
      <ControlButton
        text={'H'}
        isActive={blockType === 'header-one'}
        action={() => toggleBlockType('header-one')}
      />
      <ControlButton
        text={'ul'}
        isActive={blockType === 'unordered-list-item'}
        action={() => toggleBlockType('unordered-list-item')}
      />
      <ControlButton
        text={'ol'}
        isActive={blockType === 'ordered-list-item'}
        action={() => toggleBlockType('ordered-list-item')}
      />
      <ControlButton
        text={'--'}
        isActive={activeStyles.includes('STRIKETHROUGH')}
        action={() => toggleStyle('STRIKETHROUGH')}
      />
    </View>
  );
};
