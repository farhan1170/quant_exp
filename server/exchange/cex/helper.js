const commonFunctions = require('commonFunctions'),
  commonObjectCreators = commonFunctions.commonObjectCreators;


const observers = require('observers'),
      rawDataObservers = observers.rawDataObservers,
      currencyAndPairs = rawDataObservers.currencyAndPairs,
      tickerObserver = rawDataObservers.tickerObserver;



let currencyResponseParserAndObjectCreatorCEX = function (httpResponse, exchangeName) {
  let httpResponseObject = null;
  try{
    httpResponseObject = JSON.parse(httpResponse.body)  
  }
  catch(error){
    console.log('error in cex currencyPairs',error);
    return;
  }
  //check timezone
  if(!httpResponseObject.e || !httpResponseObject.ok || !httpResponseObject.data || !httpResponseObject.e === "currency_limits" ||!httpResponseObject.ok === "ok" ){
    return;
  }
  if(!httpResponseObject.data.pairs || !httpResponseObject.data.pairs.length){
    return
  }
  let currencyPairs = {};
  httpResponseObject.data.pairs.forEach( (eachSymbolPair)=>{
    let currencyPairSkeleton = commonObjectCreators.currencyCommonObjectFunction();
    currencyPairSkeleton.exchangeName = exchangeName;
    currencyPairSkeleton.baseSymbol = eachSymbolPair.symbol1;
    currencyPairSkeleton.quoteSymbol = eachSymbolPair.symbol2;
    currencyPairSkeleton.id = exchangeName+'-'+currencyPairSkeleton.baseSymbol+'-'+currencyPairSkeleton.quoteSymbol
    currencyPairSkeleton.lot = {
      active: true,
      minLotSize: eachSymbolPair.minLotSize,
      maxLotSize: eachSymbolPair.maxLotSize
    }
    currencyPairSkeleton.priceRange = {
      active: true,
      minPrice: eachSymbolPair.minPrice,
      maxPrice: eachSymbolPair.maxPrice
    }
    currencyPairs[currencyPairSkeleton.id] = currencyPairSkeleton;
  })
  return currencyPairs; 
}

var tickerResponseParserAndObjectCreatorCex = function (exchangeName, httpResponse) {
  
 let httpResponseObject = null;
  try{
    httpResponseObject = JSON.parse(httpResponse.body)  
  }
  catch(error){
    console.log('error in cex currencyPairs',error);
    return;
  }
  //check timezone
  if(!httpResponseObject.e || !httpResponseObject.ok || !httpResponseObject.data || !httpResponseObject.e === "currency_limits" ||!httpResponseObject.ok === "ok" ){
    return;
  }
  if(!httpResponseObject.data || !httpResponseObject.data.length){
    return
  }
  //console.log('cex helper',httpResponseObject.data[0])
  httpResponseObject.data.forEach((item)=>{
    let currencyPairSkeleton = commonObjectCreators.tickerCommonObjectFunction();
    let baseQuote = item.pair.split(':');
    currencyPairSkeleton.baseSymbol= baseQuote[0];
    currencyPairSkeleton.quoteSymbol= baseQuote[1];
    currencyPairSkeleton.timeStamp= item.timestamp;
    currencyPairSkeleton.bidPrice= item.bid;
    currencyPairSkeleton.askPrice= item.ask;
    currencyPairSkeleton.bidVolume= null;
    currencyPairSkeleton.askVolume = null;
    currencyPairSkeleton.exchange  = exchangeName;
    currencyPairSkeleton.key =  exchangeName+'-'+baseQuote[0]+'-'+baseQuote[1];
    tickerObserver.tickerObserver(currencyPairSkeleton);
  })
  
}

module.exports = {
  commonCurrencyExtension: async function (exchangeName) {
    let requestObj = {};
    requestObj = commonObjectCreators.currencyObjectCreator (exchangeName);
    if(requestObj.url){
      let httpResponse = await commonObjectCreators.requestor(requestObj);
      let currencyPairs = currencyResponseParserAndObjectCreatorCEX(httpResponse, exchangeName);
      currencyAndPairs.currencyAndPairObserver(currencyPairs);
    }
  },
  commonTriggerExtension: function(exchangeName){
    let interval = setInterval(async function () {
      let requestObj = {};
      requestObj = commonObjectCreators.tickerObjectCreator(exchangeName);
      if(requestObj.url){
        let httpResponse = await commonObjectCreators.requestor(requestObj);
        let ticker = tickerResponseParserAndObjectCreatorCex(exchangeName, httpResponse);
      }
    },5000)
  }  
}