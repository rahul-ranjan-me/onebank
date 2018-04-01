import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormInput, Button, Divider } from 'react-native-elements';

import colors from '../config/clrs'
import pageTitle from '../config/pageTitle'
import {setToken} from '../config/appConfig'

export default class Login extends Component {

  constructor(props){
    super(props)
    this.consumerKey = 'xvyxe2c4oasqttlkt02x1tv0of53qzsnp3rdwc0e'
    this.username = 'ranjrul'
    this.password = 'Aa@12345678'
  }

  static navigationOptions = {
    drawerLabel: 'Login',
    drawerIcon: ({ tintColor }) => (
      <Icon
        raised
        name='sign-in'
        type='font-awesome'
        color='#f50' />
    ),
  };

  getMeLogin(){
    var header = {
      'Authorization': `DirectLogin username=${this.username},  password=${this.password}, consumer_key=${this.consumerKey}`
    }

    fetch('https://apisandbox.openbankproject.com/my/logins/direct', {
			method: 'POST',
			headers : header,
			body:null
		}).then((response) => response.json())
			.then((responseJson) => {
        AsyncStorage.setItem('onebanktoken', responseJson.token)
        setToken(responseJson.token)
        this.props.navigation.navigate('Home');
      })
      .catch((error) => console.log(error))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.head}>{pageTitle.login}</Text>
        <Divider style={{ backgroundColor: '#ccc' }} />
        <FormInput
          placeholder='Username'
          inputStyle={{color:colors.inputTextColor}}
          placeholderTextColor={colors.inputPlaceHolders}
          underlineColorAndroid={colors.inputPlaceHolders}
          onChangeText={val => this.username = val}
          shake={true}
        />
        <FormInput
          placeholder='Password'
          inputStyle={{color:colors.inputTextColor}}
          placeholderTextColor={colors.inputPlaceHolders}
          underlineColorAndroid={colors.inputPlaceHolders}
          onChangeText={val => this.password = val}
          shake={true}
        />
        <FormInput
          placeholder='Consumer Key'
          inputStyle={{color:colors.inputTextColor}}
          placeholderTextColor={colors.inputPlaceHolders}
          underlineColorAndroid={colors.inputPlaceHolders}
          onChangeText={val => this.consumerKey = val}
          shake={true}
        />
        <Button
          containerViewStyle={{marginTop:20,}}
          buttonStyle={{backgroundColor:colors.inputPlaceHolders}}
          raised
          icon={{name: 'cached'}}
          onPress={this.getMeLogin.bind(this)}
          title='Submit' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.loginBackground,
    alignItems:'center',
    alignSelf:'center',
    alignContent:'center'
  },
  head: {
    color:'#666',
    fontSize:22,
    marginLeft:20,
    marginTop: 100,
    marginBottom:5
  }
});
