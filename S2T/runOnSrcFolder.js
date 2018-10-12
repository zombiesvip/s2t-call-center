// execute (callApi & store to database) all file exist on audio_source folder

const fs = require('fs-extra');
const src = "../audio_source/";
const dest = "../done/";
const notSupported = "../notSupported/";
const googleApi = require('./googleapi/index.js');

fs.readdir(src, (err, files) => {
  console.log('All of files: ', files);
  files.forEach(fileName => {
    // check file name 
    const extArr = fileName.split('.');
    const ext = extArr[extArr.length - 1];   // get extension
    if (ext === 'wav' || ext === 'mp3') {
      fs.moveSync(src + fileName, dest + fileName, {overwrite: true});
      console.log("File has been moved:", src + fileName);
      googleApi(dest + fileName);
    }
    else {
      fs.moveSync(src + fileName, notSupported + fileName, { overwrite: true });
      console.log("This file type is not supported:", src + fileName);
    }
  });
})