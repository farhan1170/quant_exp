const exchange = require('exchange');
const config = require('config');
const external = require('external');
const globalVariables = require('globalVariables');


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
  let timeOutDuration = 24*60*60;
  allExchanges.forEach( (exchangeName)=>{
    exchange[exchangeName].helper.commonCurrencyExtension(exchangeName);
  })

  setInterval(function () {
    allExchanges.forEach( (exchangeName)=>{
    exchange[exchangeName].helper.commonCurrencyExtension(exchangeName);
  })  
  }, 24*3600*1000);

  // setInterval(function () {
  //   console.log('commonCurrencyExtension*******************',JSON.stringify(globalVariables.basicData.currencies.currencies))
  //   console.log('commonCurrencyPair*******************',JSON.stringify(globalVariables.basicData.pairs.pairs))    
  // },10000)
  
}



module.exports = {
  getAllExchangeCurrencies : trigger()
}