import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import Header from './Header'
import { Icon } from 'react-native-elements'
import colors from '../config/clrs'
import pageTitle from '../config/pageTitle'
import {config} from '../config/appConfig'

export default class Recharge extends Component {

  static navigationOptions = {
    drawerLabel: pageTitle.Recharge,
    drawerIcon: ({ tintColor }) => (
      <Icon
        name='mobile'
        type='font-awesome'
        color={colors.navigationIcon}
      />
    ),
  };

  constructor(props){
    super(props)
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Header navigation={navigate} pageTitle={pageTitle.Recharge} />
        <Text style={{color:'#666'}}>This page is under construction</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.bodyBackground,
  }
});
