import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {setToken} from '../config/appConfig'

export default class AuthScreen extends Component {

  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('onebanktoken');
    setToken(userToken)
    this.props.navigation.navigate(userToken ? 'Home' : 'Login');
  };

  render() {
    return (
      <ActivityIndicator />
    );
  }
}

