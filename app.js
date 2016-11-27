/**
 * Created by ivokroon on 17/11/2016.
 */
var express = require("express");
    // mongoose = require("mongoose");

// var db = mongoose.connect("mongodb://localhost/bookApi");

// var Book = require('./models/bookModel');


var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

// bookRouter.route('/Books')
//     .get(function (req,res) {
//        Book.find(function (err, books) {
//            if(err)
//                console.log(err);
//            else
//                res.json(books);
//        });
//        // res.json(res);
// });

// bookRouter.route('/Books/add')
//     .get(function(req,res){
//
//     });


// app.use('/api', bookRouter);

app.get('/', function(req, res){
   res.send('Welcome to my app bla!');
});

app.listen(port, function () {
   console.log("Running on PORT " + port);
});