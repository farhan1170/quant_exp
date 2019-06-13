const external = require('external'),
      globalVariableSaver = external.globalVariableSaver,
      rawDataSaver = globalVariableSaver.rawDataSaver;

let currencyListCreator = function (currencyPairs) {
  let currencyList = [];
  Object.keys(currencyPairs).forEach( (currencyItem)=>{
    currencyList.push(currencyItem);
  })
  return currencyList;
}
let currencySaver = function (currencyList) {
  //if data not in list
  //save data
  currencyList.forEach((item)=>{
    rawDataSaver.addNewCurrency(item);
  })
}

let pairSaver = function (currencyPairs) {
  Object.keys(currencyPairs).forEach((item)=>{
    rawDataSaver.addNewPair(currencyPairs[item]);
    if(currencyPairs[item].exchangeName === 'binance'){
      rawDataSaver.addBinanceReversePair(currencyPairs[item]);
    }
  })
}

module.exports = {
  currencyAndPairObserver : function (currencyPairs) {
    let currencyList = currencyListCreator(currencyPairs);
    //observed functions
    currencySaver(currencyList);
    pairSaver(currencyPairs);

  }
}