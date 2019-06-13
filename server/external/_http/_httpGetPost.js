const request = require('request');
const Promise = require('bluebird');
const moment = require('moment');
module.exports = {
  getWithNoHeader:  function (options) {
    let timeStampOfReq = moment.utc().valueOf();
    return new Promise( (resolve, reject) =>{
      request(options, ( error, resp, body ) => {
        console.log('options:',JSON.stringify(options));
        if(error){
          console.log('err:',error);
          reject(error)
        }
        resolve({body: body, timeStampOfReq: timeStampOfReq});
      })
    })
  }
}