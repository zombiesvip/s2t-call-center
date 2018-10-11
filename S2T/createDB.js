// create db
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/S2T";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

// create collection
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("S2T");
  dbo.createCollection("SpeechToTextResult", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});