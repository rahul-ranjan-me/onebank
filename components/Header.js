import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    AsyncStorage,
} from 'react-native'
import { Icon, Header } from 'react-native-elements'
import colors from '../config/clrs'

export default class HeaderBar extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const {navigation, pageTitle} = this.props
    return(
      <View>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={<DrawerIcon navigation={navigation} />}
          centerComponent={{ text: pageTitle, style:  styles.headerStyle }}
          rightComponent={<HomeIcon navigation={navigation} />}
          outerContainerStyles={{ backgroundColor: colors.headerBackground }}
        />
      </View>
    )
  }
}

class DrawerIcon extends Component{
  toogleDrawer(){
    this.props.navigation('DrawerToggle');
  }
  
  render (){
    return(
      <Icon
          name='bars'
          type='font-awesome'
          color={colors.headerIcons}
          size={35}
          underlayColor={colors.headerBackground}
          onPress={this.toogleDrawer.bind(this)}
        />
    )
  }
}

class HomeIcon extends Component{
  gotoHome(){
    this.props.navigation('Home')
  }

  signout(){
    AsyncStorage.removeItem('onebanktoken').then(() => {
      this.props.navigation('Login')
    })
  }
  
  render (){
    return(
      <View style={{flexDirection:'row'}}>
        <Icon
            name='home'
            type='font-awesome'
            color={colors.headerIcons}
            size={30}
            onPress={this.gotoHome.bind(this)}
            underlayColor={colors.headerBackground}
            iconStyle={styles.iconStyle}
          />
        <Icon
            name='sign-out'
            type='font-awesome'
            color={colors.headerIcons}
            size={30}
            underlayColor={colors.headerBackground}
            onPress={this.signout.bind(this)}
            iconStyle={styles.iconStyle}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    color: colors.headerTextColor,
    fontSize:25,
  },
  iconStyle:{
    marginLeft:20
  }

})
