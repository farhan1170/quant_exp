const external = require('external'),
      globalvariables = external.globalvariables,
      rawDataSaver = 

let currencyListCreator = function (currencyPairs) {
  let currencyList = [];
  Object.keys(currencyPairs).forEach( (currencyItem)=>{
    currencyList.push(currencyItem);
  })
}
let pairSaver = function (currencyList) {
  //if data not in list
  //save data
}

module.exports = {
  currencyAndPairObserver : function (currencyPairs) {
    let currencyList = currencyListCreator(currencyPairs);
    let pairListCreator = currencyPairs;
    //observed functions
    
  }
}