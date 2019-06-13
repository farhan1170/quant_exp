const commonFunctions = require('commonFunctions'),
  commonObjectCreators = commonFunctions.commonObjectCreators;

const observers = require('observers'),
      rawDataObservers = observers.rawDataObservers,
      currencyAndPairs = rawDataObservers.currencyAndPairs,
      tickerObserver = rawDataObservers.tickerObserver;

const globalVariables = require('globalVariables'),
      basicData = globalVariables.basicData,
      pairs = basicData.pairs;




let currencyResponseParserAndObjectCreatorBinance = function (httpResponse, exchangeName) {
  let httpResponseObject = JSON.parse(httpResponse.body);
  //check timezone
  if(!httpResponseObject.timezone || !httpResponseObject.serverTime || !httpResponseObject.timezone === 'UTC'){
    return;
  }
  if(!httpResponseObject.symbols){
    return
  }
  let currencyPairs = {};
  httpResponseObject.symbols.forEach( (eachSymbolPair)=>{
    let currencyPairSkeleton = commonObjectCreators.currencyCommonObjectFunction();
    currencyPairSkeleton.exchangeName = exchangeName;
    currencyPairSkeleton.baseSymbol = eachSymbolPair.baseAsset;
    currencyPairSkeleton.quoteSymbol = eachSymbolPair.quoteAsset;
    currencyPairSkeleton.id = exchangeName+'-'+currencyPairSkeleton.baseSymbol+'-'+currencyPairSkeleton.quoteSymbol
    eachSymbolPair.filters.forEach( (filterItem)=>{
      if(filterItem.filterType === 'LOT_SIZE'){
        currencyPairSkeleton.lot = {
          active: true,
          minLotSize: filterItem.minQty,
          maxLotSize: filterItem.maxQty
        }
      }
      if(filterItem.filterType === 'PRICE_FILTER'){
        currencyPairSkeleton.priceRange = {
          active: true,
          minPrice: filterItem.minPrice,
          maxPrice: filterItem.maxPrice
        }
      }
    })
    currencyPairSkeleton.baseSymbolPrecision= {
      active: true,
      precisionValue: eachSymbolPair.baseAssetPrecision
    };
    currencyPairSkeleton.quoteSymbolPrecision= {
      active: true,
      precisionValue: eachSymbolPair.quotePrecision
    };
    currencyPairSkeleton.orderTypes = eachSymbolPair.orderTypes;
    currencyPairs[currencyPairSkeleton.id] = currencyPairSkeleton;
  })
  return currencyPairs; 
}


var tickerResponseParserAndObjectCreatorBinance = function (exchangeName, httpResponse) {
  let httpResponseObject = null;
  let timeStampOfReq = Number(httpResponse.timeStampOfReq);

  try{
    httpResponseObject = JSON.parse(httpResponse.body)

  }
  catch(error){
    console.log('error in binance  ticker',error);
    return;
  }

  httpResponseObject.forEach((item)=>{
    let currencyPairSkeleton = commonObjectCreators.tickerCommonObjectFunction();
    let baseQuote = item.symbol.split(':')
    currencyPairSkeleton.baseSymbol= pairs.binanceReversePair[item.symbol].baseSymbol;
    currencyPairSkeleton.quoteSymbol= pairs.binanceReversePair[item.symbol].quoteSymbol;
    currencyPairSkeleton.timeStamp= timeStampOfReq;
    currencyPairSkeleton.bidPrice= item.bidPrice;
    currencyPairSkeleton.askPrice= item.askPrice;
    currencyPairSkeleton.bidVolume= item.bidVolume;
    currencyPairSkeleton.askVolume= item.askVolume;
    currencyPairSkeleton.exchange  = exchangeName;
    currencyPairSkeleton.key =  exchangeName+'-'+currencyPairSkeleton.baseSymbol+'-'+currencyPairSkeleton.quoteSymbol;
    tickerObserver.tickerObserver(currencyPairSkeleton);
  })
  
  
}


module.exports = {
  commonCurrencyExtension: async  function (exchangeName) {
    let requestObj = {};
    requestObj = commonObjectCreators.currencyObjectCreator (exchangeName);
    if(requestObj.url){
      let httpResponse = await commonObjectCreators.requestor(requestObj);
      let currencyPairs = currencyResponseParserAndObjectCreatorBinance(httpResponse, exchangeName);
      //console.log('currencyPairs binance***************',currencyPairs)
      currencyAndPairs.currencyAndPairObserver(currencyPairs);
    }
  },
  commonTriggerExtension:  function(exchangeName){
    let interval = setInterval(async function () {
      let requestObj = {};
      requestObj = commonObjectCreators.tickerObjectCreator(exchangeName);
      if(requestObj.url){
        let httpResponse = await commonObjectCreators.requestor(requestObj);
        let ticker = tickerResponseParserAndObjectCreatorBinance(exchangeName, httpResponse);
      }
    },5000)
  }  
}
