import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from './Header'
import { Icon, Card, Avatar } from 'react-native-elements'
import colors from '../config/clrs'
import pageTitle from '../config/pageTitle'
import {config} from '../config/appConfig'

const { width } = Dimensions.get('window');

export default class Home extends Component {

  static navigationOptions = {
    drawerLabel: pageTitle.home,
    drawerIcon: ({ tintColor }) => (
      <Icon
        name='home'
        type='font-awesome'
        color={colors.navigationIcon}
      />
    ),
  };

  constructor(props){
    super(props)
    this.cardNavigate = this.cardNavigate.bind(this)
    this.state = {
      userDetails : {}
    }
  }

  componentDidMount(){
    const token = config.token

    if(token){
      var header = {
        'Authorization': `DirectLogin token=${token}`
      }

      fetch(`${config.apiURL}/obp/v3.0.0/users/current`, {
        method: 'GET',
        headers : header,
        body:null
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({userDetails: responseJson})
        })
        .catch((error) => console.log(error))
      }
  }

  cardNavigate(id){
    console.log(id)
    this.props.navigation.navigate(id)
  }

  createCard(item, i){
    return (
      <TouchableOpacity key={'card'+i} onPress={() => this.cardNavigate(item.id)} style={{flexWrap: 'wrap'}}>
        <Card containerStyle={styles.categoryCard} >
          <Icon
            raised
            name={item.icon}
            containerStyle={{marginLeft:10}}
            type='font-awesome'
            size= {30}
            color={colors.navigationIcon} />

          <View style={styles.categoryText}>
            <Text style={{textAlign:'center'}}>{item.label}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }

  render() {
    const { navigate } = this.props.navigation
        , { username } = this.state.userDetails
    return (
      <View style={styles.container}>
        <Header navigation={navigate} pageTitle={pageTitle.home} />
        <Card flexDirection='row' containerStyle={{margin:5, marginTop:15}}>
          <Avatar
            large
            rounded
            source={{uri: "https://media.licdn.com/dms/image/C5103AQH7k3htwTBEmQ/profile-displayphoto-shrink_200_200/0?e=1527609600&v=alpha&t=W29wakLrOBGxI3i_ho15znhUfyPc0lZLX6CPsGTOI5U"}}
            activeOpacity={0.7}
          />
          <View style={styles.welcomeText}>
            <Text>Good {new Date().getHours() > 12 ? 'Evening': 'Morning'}</Text>
            <Text style={{fontWeight:'bold', marginTop:5}}>{username ? username.toUpperCase(): ''}</Text>
          </View>
        </Card>
        <ScrollView>
          <Card containerStyle={{padding:0, margin:5, marginTop:15}}>
            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
              {config.homeIcons.map(this.createCard.bind(this))}
            </View>
          </Card>
        </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.bodyBackground,
  },
  welcomeText: {
    marginLeft: 20,
    marginTop: 15
  },
  categoryText: {
    marginTop: 0,
    width: (width-108)/3,
    alignItems:'center'
  },
  categoryCard: {
    margin: 0,
    paddingTop:0,
    height: 125
  },
  firstCategoryCard: {
    margin: 0
  }
});
