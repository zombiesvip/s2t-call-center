// execute (callApi & store to database) all file exist on audio_source folder

const fs = require('fs-extra');
// const googleApi = require('../googleapi/index.js');
const fptApi = require('../fptapi/index.js');

let src = "../audio_source/";
let dest = "../done/";
let notSupported = "../not_supported/";

const runSrcFolder = function runFolder() {
  fs.readdir(src, (err, files) => {
    console.log("Reading files: ", files);
    files.forEach(fileName => {
      // check file name
      const extArr = fileName.split(".");

      const ext = extArr[extArr.length - 1]; // get extension
      if (ext === "wav" || ext === "mp3") {
        fs.move(src + fileName, dest + fileName, { overwrite: true })
          .then(() => {
            // console.log("File has been moved:", src + fileName);
            fptApi(dest + fileName, fileName);
          })
          .catch(() => {
            console.log("An error occured!");
          })
        // googleApi(dest + fileName);
      } else {
        fs.move(src + fileName, notSupported + fileName, { overwrite: true })
          .then(() => {
            console.log("This file type is not supported:", fileName);
          })
          .catch(() => {
            console.log("An error occured!");
          })
      }
    });
  });
}

runSrcFolder();

module.exports = runSrcFolder;