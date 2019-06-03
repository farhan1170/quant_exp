const env = process.env.NODE_ENV
let config = require('./'+env);

let exchange = require('./exchange');
config.exchanges = [];
Object.keys(exchange).forEach( (exchangeItem)=> {
  let exchangeConfig = {};
  exchangeConfig[exchangeItem] = exchange[exchangeItem]
  config.exchanges.push(exchangeConfig);
})



module.exports = config;

