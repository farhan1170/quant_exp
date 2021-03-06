const globlVariables = require('globalVariables'),
      basicData = globlVariables.basicData;
module.exports = {
  getAllCurrencies : function () {
    return basicData.currencies.currencies;  
  },
  addNewCurrency : function (currencyName) {
    if(!basicData.currencies.currencies){
      basicData.currencies.currencies = [];
    }
    basicData.currencies.currencies.push(currencyName);
    basicData.currencies.currencies = basicData.currencies.currencies.sort();
    let splitter = currencyName.split('-') 
    if(splitter[0] === 'cex'){
      if(!basicData.currencies.cexBaseCurrencies){
        basicData.currencies.cexBaseCurrencies = [];
      }
      if(basicData.currencies.cexBaseCurrencies.indexOf(splitter[2]) < 0 ){
        basicData.currencies.cexBaseCurrencies.push(splitter[2]); 
      }
    }
    return basicData.currencies.currencies
  },
  addBinanceReversePair: function(pairObj){
    basicData.pairs.binanceReversePair[pairObj.baseSymbol+pairObj.quoteSymbol] = {
      baseSymbol: pairObj.baseSymbol,
      quoteSymbol: pairObj.quoteSymbol
    }
  },
  getAllPairs: function () {
    return basicData.pairs.pairs;
  },
  addNewPair : function (pairObj) {
    if(!basicData.pairs.pairs[pairObj.id]){
      basicData.pairs.pairs[pairObj.id] = pairObj;
    }
    return basicData.pairs.pairs;
  },
  addTicker: function (tickerObj) {
      basicData.ticker.ticker[tickerObj.key] = tickerObj;
  },
  getTicker: function (key) {
    if(key){
      return basicData.ticker.ticker[tickerObj[key]]
    }else{
      return basicData.ticker.ticker
    }
  }
}