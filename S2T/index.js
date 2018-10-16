const fs = require("fs-extra");
var chokidar = require("chokidar");

const src = "../audio_source/";
const dest = "../done/";
const notSupported = "../notSupported/";
const googleApi = require('./googleapi/index.js');
var watcher = chokidar.watch(src, {persistent: true, interval: 0, usePolling: true});
var srcFileArr = [];
watcher.on('add', async (srcPath) => {
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
    googleApi(dest + fileName);
    
    // main function
    // fs.move(srcPath, dest + fileName, { overwrite: true }, err => {
    //   if (err) return console.log("Move file failed: ", err);
    //   console.log("File has been moved:", srcPath);
    //   // googleApi(dest + fileName);
    // })
  }
  else {
    fs.moveSync(srcPath, notSupported + fileName, { overwrite: true });
    console.log("This file type is not supported!");
  }
})

// async function callApi(path, fileName) {

// }