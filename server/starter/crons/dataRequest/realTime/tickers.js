const exchange = require('exchange');

var CronJob = require('cron').CronJob;

Object.keys(exchange).forEach(  (exchangeName)=> {
  console.log(exchangeName,'***errrrrrr*************',exchange[exchangeName].dataRequestor.rest.ticker)
  exchange[exchangeName].dataRequestor.rest.ticker.makeRequest;
}) 

let triggerTickers = function () {
  
}


module.exports = {
  getAllTickers : new CronJob('* * * * * *', function() {
    console.log('You will see this message every second');
  }, null, true, 'America/Los_Angeles');

}