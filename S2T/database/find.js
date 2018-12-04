// DB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports = function (fileName, text) {
  var findResult = null;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("S2T");
    var datetime = new Date();
    var myobj = {  };
    console.log(myobj);
    findResult = dbo.collection("FptS2T").find(myobj);
  });
  return findResult;
}
