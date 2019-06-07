const globlVariables = require('globalVariables'),
      basicData = globlVariables.basicData;
      console.log('basicData======================',basicData)
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
    return basicData.currencies.currencies
  },
  getAllPairs: function () {
    return basicData.pairs.pairs;
  },
  addNewPair : function (pairObj) {
    if(!basicData.pairs.pairs[pairObj.id]){
      basicData.pairs.pairs[pairObj.id] = pairObj;
    }
    return basicData.pairs.pairs;
  }
}