var express = require('express');
var app = express();
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var userCollectionURL = 'mongodb://localhost:27017/test'
var path = require('path');
var bodyParser = require('body-parser');

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4   
   }
}

app.use('/static', express.static('public'))

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
})
 
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/json/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   })
})

app.get('/addUser', function (req, res) {
    console.log("add user");
   // First read existing users.
   fs.readFile( __dirname + "/json/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

/* Mongo test rest services */

app.get('/listTestUsers',function(req,res){
 MongoClient.connect(userCollectionURL, function(err, db) {
     result = ""
      if (err) return
       var collection = db.collection('user');
        collection.find().toArray(function (err, result) {
        if (err) throw err
        console.log(result)
        res.end(JSON.stringify(result));
       })
       
    })
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})