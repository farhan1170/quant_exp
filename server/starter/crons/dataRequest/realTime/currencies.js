const exchange = require('exchange');
const config = require('config');
const external = require('external');


var CronJob = require('cron').CronJob;


let getAllExchangeNames = function () {
  let exchangeNames = [];
  config.exchanges.forEach( (exchange)=>{
    Object.keys(exchange).forEach( (exchangeName)=>{
      exchangeNames.push(exchangeName)
    })
  })
  return exchangeNames;
}

let trigger = function () {
  let allExchanges = getAllExchangeNames();
  allExchanges.forEach( (exchangeName)=>{
    exchange[exchangeName].helper.commonCurrencyExtension(exchangeName);
  })
}



module.exports = {
  getAllExchangeCurrencies : trigger()
}