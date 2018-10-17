// const fs = require("fs-extra");
// const googleApi = require('./googleapi/index.js');
// var chokidar = require("chokidar");
import fs from "fs-extra";
import googleApi from "./googleapi/index.js";
import runOnSrcFolder from './runOnSrcFolder';

const src = "../audio_source/";
const dest = "../done/";
const notSupported = "../not_supported/";
// var watcher = chokidar.watch(src, {persistent: true, interval: 0, usePolling: true});
// var srcFileArr = [];
// watcher.on('add', async (srcPath) => callApi(srcPath))

setInterval(() => {runOnSrcFolder()}, 5000);

// async function callApi(srcPath) {
//   const srcPathSplit = srcPath.split('\\');
//   const fileName = srcPathSplit[srcPathSplit.length - 1];

//   // check file extension
//   const extArr = fileName.split('.');
//   const ext = extArr[extArr.length - 1];   // get extension
//   if (ext === 'wav' || ext === 'mp3') {
//     // main function
//     // fs.moveSync(srcPath, dest + fileName, {overwrite: true});
//     // console.log("File has been moved:", srcPath);
//     // googleApi(dest + fileName);
    
//     // main function
//     fs.move(srcPath, dest + fileName, { overwrite: true }, err => {
//       if (err) return console.log("Move file failed: ", err);
//       console.log("File has been moved:", srcPath);
//       // googleApi(dest + fileName);
//     })
//   }
//   else {
//     fs.moveSync(srcPath, notSupported + fileName, { overwrite: true });
//     console.log("This file type is not supported!");
//   }
// }