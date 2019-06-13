const external = require('external'),
      globalVariableSaver = external.globalVariableSaver,
      rawDataSaver = globalVariableSaver.rawDataSaver;


module.exports = {
  tickerObserver : function (tickerObj) {
   
    //observed functions
    rawDataSaver.addTicker(tickerObj);

  }
}