const fs = require("fs-extra");
const request = require("request");
// const encoding = require('encoding');
const db = require("../database/index.js");
// const FptS2TRRepo = require("../database/FptS2TRepo");

module.exports = function(url, fileName, errStream) {
  var body;
  fs.readFile(url)
    .then(audioBinary => {
      const makeFptSpeechRequest = audioBinary => {
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
            status = jsonBody.status;

            if (status === 0) {
              if (jsonBody && jsonBody.status === 0 && jsonBody.hypotheses && jsonBody.hypotheses[0].utterance) {
                try {
                  const text = jsonBody.hypotheses[0].utterance;
                  console.log('fileName: ', fileName);
                  console.log("TEXT: ", text);
                  console.log("");
                  db(fileName, text);
                } catch (error) {
                  console.log(error);
                  errStream.write(fileName + '\n');
                }

                // const datetime = new Date();
                // const resObj = { fileName, textTransform: text, datetime};
                // console.log("resObj: ", resObj);
                // insert(resObj);
              }
              else {
                console.log("This encoding is not supported: ", fileName);
                errStream.write(fileName + '\n');
              }
            }
            else if (status === 1) {
              console.log("Không có âm thanh!");
              errStream.write(fileName + '\n');
            }
            else if (status === 2) {
              console.log("Bị hủy!");
              errStream.write(fileName + '\n');
            }
            else if (status === 9) {
              console.log("Hệ thống bận!");
              errStream.write(fileName + '\n');
            }
          }
        });
      };
      makeFptSpeechRequest(audioBinary);
    })
    .catch(err => console.log("Can't read the file!"));
};

// async function insert(obj) {
//   const insertion = await FptS2TRRepo.insertOne(obj);
// }
