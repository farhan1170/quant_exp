let exchangeConfig = {
  exchangeName: 'binance',
  active: true,
  rest: {
    baseUrl: 'https://api.binance.com',
    currencyExtension: '/api/v1/exchangeInfo'
  }
}

if(!process.env.NODE_ENV === 'production'){
  exchangeConfig.rest.baseUrl = 'https://api.binance.com';
}

module.exports = exchangeConfig;