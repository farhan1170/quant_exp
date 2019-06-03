const commonFunctions = require('commonFunctions'),
  commonObjectCreators = commonFunctions.commonObjectCreators;

let currencyResponseParserAndObjectCreatorCEX = function (httpResponse, exchangeName) {
  let httpResponseObject = JSON.parse(httpResponse);
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


module.exports = {
  commonCurrencyExtension: async function (exchangeName) {
    let requestObj = {};
    requestObj = commonObjectCreators.currencyObjectCreator (exchangeName);
    if(requestObj.url){
      let httpResponse = await commonObjectCreators.requestor(requestObj);
      let currencyPairs = currencyResponseParserAndObjectCreatorCEX(httpResponse, exchangeName);
      console.log('cex currencyPairs*****',currencyPairs)
    }
  }  
}