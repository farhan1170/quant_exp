const config = require('config');
const external = require('external'),
      _httpGetPost = external._http._httpGetPost;
module.exports = {
  currencyCommonObjectFunction : function () {
    return {
      id: null,
      exchangeName: null,
      baseSymbol: null,
      quoteSymbol: null,
      lot: {
        active: false,
        minLotSize: null,
        maxLotSize: null
      },
      priceRange: {
        active: false,
        minPrice: null,
        maxPrice: null
      },
      baseSymbolPrecision: {
        active: false,
        precisionValue: null
      },
      quoteSymbolPrecision: {
        active: false,
        precisionValue: null
      },
      orderTypes: {
        active: false,
        orederTypeArray: []
      }
    }
  },
  tickerCommonObjectFunction: function () {
    return {
      baseSymbol: null,
      quoteSymbol: null,
      timeStamp: null,
      bidPrice: null,
      askPrice: null,
      bidVolume: null,
      askVolume: null,
      exchange: null,
      key: null
    }
  },
  depthCommonObjectFunction: function () {
    return {
      
    }
  },
  orderbookCommonObjectFunction: function () {
    return {
      
    }
  },
  currencyObjectCreator : function (exchangeName) {
    let requestOption = {};
    for (let i =0;i<config.exchanges.length; i++){
      let exchangeObj = config.exchanges[i];
      
      if(exchangeObj[exchangeName]){
        if(exchangeObj[exchangeName].exchangeName === exchangeName){
          if(exchangeObj[exchangeName].active){
            requestOption = {
              url: exchangeObj[exchangeName].rest.baseUrl+exchangeObj[exchangeName].rest.currencyExtension
            } 
            break;     
          }
        }  
        
      }
      
    }
    requestOption.method = 'GET';
    return requestOption;
  },
  requestor : function (options) {
    return _httpGetPost.getWithNoHeader(options);
  },
  tickerObjectCreator: function (exchangeName) {
    let requestOption = {};
    for (let i =0;i<config.exchanges.length; i++){
      let exchangeObj = config.exchanges[i];
      
      if(exchangeObj[exchangeName]){
        if(exchangeObj[exchangeName].exchangeName === exchangeName){
          if(exchangeObj[exchangeName].active && exchangeObj[exchangeName].rest.tickerExtension){
            requestOption = {
              url: exchangeObj[exchangeName].rest.baseUrl+exchangeObj[exchangeName].rest.tickerExtension
            } 
            break;     
          }
        }  
        
      }
      
    }
    requestOption.method = 'GET';
    return requestOption;
  }

}