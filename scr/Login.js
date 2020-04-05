import {View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7f6',
  },
});

class Login extends Component {
  render() {
    return <View style={styles.container}>{this.props.children}</View>;
  }
}

Login.propTypes = propTypes;

export default Login;
