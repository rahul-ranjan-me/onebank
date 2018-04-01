import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Header from './Header'
import { Icon, Button, Card } from 'react-native-elements'
import colors from '../config/clrs'
import pageTitle from '../config/pageTitle'
import { config } from '../config/appConfig'
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

export default class MyAccount extends Component {

  static navigationOptions = {
    drawerLabel: pageTitle.MyAccount,
    drawerIcon: ({ tintColor }) => (
      <Icon
        name='user'
        type='font-awesome'
        color={colors.navigationIcon}
      />
    ),
  };

  constructor(props){
    super(props)
    this.accounts = {}
    this.state = {
      accounts: this.accounts
    , entries: []
    , currentSlide: 0
    }
    this.totalAccounts = []
    this.curAccountCalled = 0
  }

  componentDidMount(){
    this.getAccounts()
  }

  getAccounts(){
    const token = config.token

    if(token){
      var header = {
        'Authorization': `DirectLogin token=${token}`
      }

      fetch(`${config.apiURL}/obp/v2.0.0/banks/rbs/accounts`, {
        method: 'GET',
        headers : header,
        body:null
      }).then((response) => response.json())
        .then((responseJson) => {
          this.totalAccounts = responseJson
          this.getAccountInfo()
        })
        .catch((error) => console.log(error))
      }
  }

  getAccountInfo(){
    const token = config.token
        , accountId = this.totalAccounts[this.curAccountCalled].id
    var header = {
      'Authorization': `DirectLogin token=${token}`
    }
    fetch(`${config.apiURL}/obp/v3.0.0/my/banks/rbs/accounts/${accountId}/account`, {
      method: 'GET',
      headers : header,
      body:null
    }).then((response) => response.json())
      .then((responseJson) => {
        if(this.curAccountCalled <= this.totalAccounts.length-1){
          const accountType = responseJson.type ? responseJson.type : 'Saving'
          if (!this.accounts[accountType]){
            this.accounts[accountType] = []
          }
          this.accounts[accountType].push(responseJson)
          this.getAccountInfo()
        }else{
          let entries = []
          for(let i in this.accounts){
            entries.push(this.accounts[i])
          }
          this.setState({ accounts: this.accounts, entries: entries })
        }
        this.curAccountCalled += 1
      })
      .catch((error) => console.log(error))
    
  }

  createHeader(item, index){
    return <Button onPress={() => {this.swiperIndexChanged(index)}} backgroundColor="rgba(0,0,0,0)" fontWeight={index === this.state.currentSlide ? 'bold': undefined} buttonStyle={styles.headerButtons} key={index} title={ item.toUpperCase() } />
  }

  swiperIndexChanged(index){
    this.setState({
      currentSlide : index
    })
  }

  render() {
    const { navigate } = this.props.navigation
        , { accounts, entries, currentSlide } = this.state

    return (
      <View style={styles.container}>
        <Header navigation={navigate} pageTitle={pageTitle.MyAccount} />
        { Object.keys(accounts).length < 1 ? <View style={{marginTop:30}}><ActivityIndicator /></View> :
          <View style={{flex: 1}}>
            <View style={styles.secondNav}>
              { Object.keys(accounts).map(this.createHeader.bind(this)) }
            </View>
            
              { entries.length > 0 ? <Swiper style={styles.carousel} 
                loop={false} 
                showsButtons={false} 
                ref={this.carousel}
                index={currentSlide} 
                showsPagination = {false}
                onIndexChanged={this.swiperIndexChanged.bind(this)}>
                {entries.map((item, i) => (
                  <SlideItem item={item} key={i} navigate={this.props.navigation.navigate} />
                ))}
              </Swiper> : undefined}
          </View>
        }
      </View>
    );
  }
}

export class SlideItem extends Component{
  constructor(props){
    super(props)
  }

  loadDetails(){
    this.props.navigate('AccountDetails');
  }

  createAccounts(item, index){
    const { number, id, balance } = item
        , { amount, currency } = balance

    return(
      <View style={{width: width}} key={Math.random()}>
        <Card>
          <View style={styles.carouselItemRow}>
            <Text style={styles.carouselItemLabel}>Account No.: </Text>
            <Text style={styles.carouselItem}>{number}</Text>
          </View>
          <View style={styles.carouselItemRow}>
            <Text style={styles.carouselItemLabel}>Account Id: </Text>
            <Text style={styles.carouselItem}>{id}</Text>
          </View>
          <View style={styles.carouselItemRow}>
            <Text style={styles.carouselItemLabel}>Balance: </Text>
            <Text style={{color:'#666'}}>{currency} </Text>
            <Text style={styles.carouselItem}>{amount}</Text>
          </View>
          <View style={{height:22}}></View>

          <View style={styles.callToAction}>
            <TouchableOpacity onPress={this.loadDetails.bind(this)}><Text style={styles.callToActionButton}>Details</Text></TouchableOpacity>
            <Text style={styles.callToActionSeperator}>|</Text>
            <TouchableOpacity><Text style={styles.callToActionButton}>View Statement</Text></TouchableOpacity>
          </View>

        </Card>
      </View>
    )
  }

  render(){
    const { item, index } = this.props
    return <View style={styles.slideItem} key={'slide'+index}>
              {item.map((account) => this.createAccounts(account, index))}
           </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.bodyBackground,
  },
  secondNav: {
    flexDirection: 'row',
    backgroundColor: colors.secondNav
  },
  headerButtons: {
    padding: 10,
    margin: 0
  },
  carouselItemRow:{
    flexDirection: 'row'
  },
  carouselItemLabel: {
    fontWeight:'bold'
  },
  carousel:{},
  slideItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  callToAction:{
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  callToActionButton: {
    color: colors.navigationIcon
  },
  callToActionSeperator:{
    marginLeft: 5,
    marginRight: 5
  },
});