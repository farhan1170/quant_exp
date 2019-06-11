const config = require('config');
const exchange = require('exchange');
var CronJob = require('cron').CronJob;
const commonFunctions = require('commonFunctions'),
      commonObjectCeators = commonFunctions.commonObjectCeators;



let getAllExchangeNames = function () {
  let exchangeNames = [];
  config.exchanges.forEach( (exchange)=>{
    Object.keys(exchange).forEach( (exchangeName)=>{
      exchangeNames.push(exchangeName)
    })
  })
  return exchangeNames;
}


let triggerTickers = function () {
  getAllExchangeNames().forEach((exchangeName)=>{
    exchange[exchangeName].helper.commonTriggerExtension(exchangeName);
  })
}


module.exports = {
  trigger: triggerTickers()
}