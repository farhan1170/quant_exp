const request = require('request');
const Promise = require('bluebird');

module.exports = {
  getWithNoHeader:  function (options) {
    return new Promise( (resolve, reject) =>{
      request(options, ( error, resp, body ) => {
        console.log('options:',JSON.stringify(options));
        if(error){
          console.log('err:',error);
          reject(error)
        }
        resolve(body);
      })
    })
  }
}