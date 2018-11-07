// DB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports = function (fileName, text) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("S2T");
    var datetime = new Date();
    var myobj = { namefile: fileName, text: text, datetime};
    console.log(myobj);
    dbo.collection("FptS2T").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}
