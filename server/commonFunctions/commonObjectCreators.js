const config = require('config');
const external = require('external'),
      _httpGetPost = external._http._httpGetPost;
module.exports = {
  currencyCommonObjectFunction : function () {
    return {
      exchangeName: '',
      baseSymbol: '',
      quoteSymbol: '',
      lot: {
        active: false,
        minLotSize: 0,
        maxLotSize: 0
      },
      priceRange: {
        active: false,
        minPrice: 0,
        maxPrice: 0
      },
      baseSymbolPrecision: {
        active: false,
        precisionValue: 0
      },
      quoteSymbolPrecision: {
        active: false,
        precisionValue: 0
      },
      orderTypes: {
        active: false,
        orederTypeArray: []
      }
    }
  },
  tickerCommonObjectFunction: function () {
    return {

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
  }

}