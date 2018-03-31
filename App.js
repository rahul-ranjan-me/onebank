import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import colors from './config/clrs'
import {setToken} from './config/appConfig'
import RootStack from './components/Navigator'
import Login from './components/Login'

export default class App extends Component {
  render() {
    return (
      <RootStack style={styles.container} /> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bodyBackground,
  },
});
