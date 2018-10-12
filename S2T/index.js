const fs = require("fs-extra");
var chokidar = require("chokidar");

const src = "../audio_source/";
const dest = "../done/";
const notSupported = "../notSupported/";
const googleApi = require('./googleapi/index.js');
var watcher = chokidar.watch(src, {persistent: true});
var srcFileArr = [];
watcher.on('add', (srcPath) => {
  const srcPathSplit = srcPath.split('\\');
  const fileName = srcPathSplit[srcPathSplit.length - 1];

  // srcFileArr.push({ path: srcPath, fileName });

  // check file name 
  const extArr = fileName.split('.');
  const ext = extArr[extArr.length - 1];   // get extension
  if (ext === 'wav' || ext === 'mp3') {
    // main function
    fs.moveSync(srcPath, dest + fileName, {overwrite: true});
    console.log("File has been moved:", srcPath);
    // googleApi(dest + fileName);
  }
  else {
    fs.moveSync(srcPath, notSupported + fileName, { overwrite: true });
    console.log("This file type is not supported!");
  }
})

// async function callApi(path, fileName) {

// }