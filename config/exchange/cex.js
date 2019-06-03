let exchangeConfig = {
  exchangeName: 'cex',
  active: true,
  rest: {
    baseUrl: 'https://cex.io/api',
    currencyExtension: '/currency_limits'
  }
}

if(!process.env.NODE_ENV === 'production'){
  exchangeConfig.rest.baseUrl = 'https://cex.io/api';
}

module.exports = exchangeConfig;