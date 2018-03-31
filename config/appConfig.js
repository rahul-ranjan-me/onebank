let config = {
  token : null
, apiURL: 'https://apisandbox.openbankproject.com/'
, homeIcons: [
    {
      id: 'MyAccount'
    , label: 'My Account'
    , icon: 'user' 
    }
  , {
      id: 'FundTransfer'
    , label: 'Fund Transfer' 
    , icon: 'check-circle'
    }
  , {
      id: 'Recharge'
    , label: 'Recharge & Bill Pay' 
    , icon: 'mobile'
    }
  , {
      id: 'RequestService'
    , label: 'Request Service'
    , icon: 'sticky-note'
    }
  , {
      id: 'MySetup'
    , label: 'My Setup'
    , icon: 'cogs'
    }
  , {
      id: 'TransactionHistory'
    , label: 'Transaction History' 
    , icon: 'bars'
    }
  , {
      id: 'MyFavorites'
    , label: 'My Favorites'
    , icon: 'star'
    }
  , {
      id: 'Offers'
    , label: 'Offers' 
    , icon: 'gift'
    }
  , {
      id: 'PremiumServices'
    , label: 'Premium Services' 
    , icon: 'shopping-cart'
    }
  ]
}

const setToken = (token) => {
  config.token = token
}

export {setToken, config}