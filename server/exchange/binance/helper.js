const commonFunctions = require('commonFunctions'),
  commonObjectCreators = commonFunctions.commonObjectCreators;

const observers = require('observers'),
      rawDataObservers = observers.rawDataObservers,
      currencyAndPairs = rawDataObservers.currencyAndPairs;


let currencyResponseParserAndObjectCreatorBinance = function (httpResponse, exchangeName) {
  let httpResponseObject = JSON.parse(httpResponse);
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
  }  
}
