let exchangeConfig = {
  exchangeName: 'cex',
  active: true,
  rest: {
    baseUrl: 'https://cex.io',
    currencyExtension: '/api/currency_limits',
    tickerExtension: '/api/tickers/ETH/BTC/USD/EUR/GBP/RUB'
  }
}

if(!process.env.NODE_ENV === 'production'){
  exchangeConfig.rest.baseUrl = 'https://cex.io/api';
}

module.exports = exchangeConfig;