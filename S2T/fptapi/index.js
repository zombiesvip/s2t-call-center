const fs = require('fs-extra');
const request = require('request');
const encoding = require('encoding');
const db = require('../database/index.js');

module.exports = function(url, fileName) {
  var body;
  fs.readFile(url)
    .then((audioBinary) => {
      const makeFptSpeechRequest = (audioBinary) => {
        request({
          url: 'https://api.openfpt.vn/fsr',
          method: 'POST',
          headers: {
            api_key: '63f8bd3dfc644bccbdab885e240fc376'
          },
          body: audioBinary
        }, (error, response, body) => {
          if (error) {
             console.log('Error sending message: ', error);
          } else {
            const jsonBody = JSON.parse(body);
            if (jsonBody && jsonBody.status === 0 && jsonBody.hypotheses && jsonBody.hypotheses[0].utterance) {
              const text = jsonBody.hypotheses[0].utterance;
              // console.log("TEXT: ", text);
              db(fileName, text);
            } 
            else {
              console.log("This encoding is not supported: ", fileName);
            }
          }
        });
      };
      makeFptSpeechRequest(audioBinary);
    })
    .catch(err => console.log("Can't read the file!"));
};