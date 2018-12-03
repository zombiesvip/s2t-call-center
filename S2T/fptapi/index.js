const fs = require("fs-extra");
const request = require("request");
const encoding = require("encoding");
const db = require("../database/index.js");

var notSupported = "../not_supported/";

function moveNotSupported(srcUrl, fileName) {
  fs.move(srcUrl, notSupported + fileName, { overwrite: true })
    .then(() => {
      console.log("This file type is not supported:", fileName);
      errStream.write(fileName + "\r\n");
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = function(srcUrl, fileName, errStream) {
  var body;
  fs.readFile(srcUrl)
    .then(audioBinary => {
      const makeFptSpeechRequest = audioBinary => {
        request(
          {
            url: "https://api.openfpt.vn/fsr",
            method: "POST",
            headers: {
              api_key: "63f8bd3dfc644bccbdab885e240fc376"
            },
            body: audioBinary
          },
          (error, response, body) => {
            try {
              if (error) {
                console.log("Error sending message: ", error);
              } else {
                const jsonBody = JSON.parse(body);
                const status = jsonBody ? jsonBody.status : null;

                if (status === 0) {
                  if (jsonBody.hypotheses && jsonBody.hypotheses[0].utterance) {
                    // const text = jsonBody.hypotheses[0].utterance;
                    // console.log("TEXT: ", text);
                    // db(fileName, text);
                    try {
                      const text = jsonBody.hypotheses[0].utterance;
                      console.log("fileName: ", fileName);
                      console.log("TEXT: ", text);
                      console.log("");
                      db(fileName, text);
                    } catch (error) {
                      console.log(error);
                      // errStream.write(fileName + '\n');
                    }
                  } else {
                    console.log("This encoding is not supported: ", fileName);
                    errStream.write(
                      "This encoding is not supported: " + fileName + "\r\n"
                    );
                    errStream.write(fileName + "\r\n");
                    moveNotSupported(srcUrl, fileName);
                  }
                } else if (status === 1) {
                  console.log("Không có âm thanh!");
                  errStream.write("Không có âm thanh!\r\n");
                  errStream.write(fileName + "\r\n");
                  moveNotSupported(srcUrl, fileName);
                } else if (status === 2) {
                  console.log("Bị hủy!");
                  errStream.write("Bị hủy!\r\n");
                  errStream.write(fileName + "\r\n");
                  moveNotSupported(srcUrl, fileName);
                } else if (status === 9) {
                  console.log("Hệ thống bận!");
                  errStream.write("Hệ thống bận!\r\n");
                  errStream.write(fileName + "\r\n");
                  moveNotSupported(srcUrl, fileName);
                } else {
                  console.log("Lỗi không xác định!");
                  errStream.write("Lỗi không xác định!\r\n");
                  errStream.write(fileName + "\r\n");
                  moveNotSupported(srcUrl, fileName);
                }

                // if (jsonBody && jsonBody.status === 0 && jsonBody.hypotheses && jsonBody.hypotheses[0].utterance) {
                //   const text = jsonBody.hypotheses[0].utterance;
                //   // console.log("TEXT: ", text);
                //   db(fileName, text);
                // }
                // else {
                //   console.log("This encoding is not supported: ", fileName);
                // }
              }
            } catch (error) {
              console.log("ERROR in request api: ", error);
              errStream.write("ERROR in request api: " + error + "\r\n");
              moveNotSupported(srcUrl, fileName);
            }
          }
        );
      };
      try {
        makeFptSpeechRequest(audioBinary);
      } catch (error) {
        console.log("ERROR in make request: ", error);
        moveNotSupported(srcUrl, fileName);
      }
    })
    .catch(err => {
      console.log("Can't read the file!", srcUrl);
      errStream.write("Can't read the file!" + srcUrl + "\r\n");
    });
};
