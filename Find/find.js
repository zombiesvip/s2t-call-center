//Config
const DB_NAME = "S2T";
const COLLECTION = "FptS2T";

// DB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

async function find(keyword, res) {
  var findResult = null;
  await MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db(DB_NAME);
    var datetime = new Date();
    // var searchObj = { namefile: { $regex: keyword } };
    var searchObj = { $or: [ { namefile: { $regex: keyword } }, { text: { $regex: keyword } } ] };
    // console.log(searchObj);
    findResult = await dbo.collection(COLLECTION).find(searchObj).toArray(function(err, res) {
      if (err) throw err;
      console.log(res);
      db.close();
    });
    // console.log("RESULT: ", findResult);
    // res(findResult);
  });
  // return findResult;
}

module.exports = find;