import React, {Component} from 'react'
import {
  DrawerNavigator,
  SwitchNavigator,
} from 'react-navigation';
import {config} from '../config/appConfig';
import AuthScreen from './AuthScreen';
import HomeScreen from './Home';
import LoginScreen from './Login';
import MyAccountScreen from './MyAccount';
import FundTransferScreen from './FundTransfer';
import RechargeScreen from './Recharge';
import RequestServiceScreen from './RequestService';
import MySetupScreen from './MySetup';
import TransactionHistoryScreen from './TransactionHistory';
import MyFavoritesScreen from './MyFavorites';
import OffersScreen from './Offers';
import PremiumServicesScreen from './PremiumServices';

const RootStack = DrawerNavigator({
    Auth : { screen: AuthScreen } ,
    Login : { screen: LoginScreen },
    Home: { screen: HomeScreen },
    MyAccount: { screen: MyAccountScreen },
    FundTransfer: { screen: FundTransferScreen },
    Recharge: { screen: RechargeScreen},
    RequestService: { screen: RequestServiceScreen},
    MySetup: { screen: MySetupScreen},
    TransactionHistory: { screen: TransactionHistoryScreen},
    MyFavorites: { screen: MyFavoritesScreen},
    Offers: { screen: OffersScreen},
    PremiumServices: { screen: PremiumServicesScreen},
  },
  {
    initialRouteName: 'Auth',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}