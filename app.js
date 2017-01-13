/**
 * Created by ivokroon on 17/11/2016.
 */
var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

//makes connection if there is no connection it makes the connection.
var db;
    if(process.env.ENV == 'Test'){
        db = mongoose.connect('mongodb://localhost/bookApi_test');
    }else{
        db = mongoose.connect('mongodb://localhost/bookApi');
    }

var Book = require('./models/bookModel');


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

bookRouter = require('./routes/bookRoutes')(Book);


// var error = {error: "error"};
// bookRouter.route('/Books/add')
//     .get(function (req, res) {
//         res.json(error);
//         // db.bookModel.insert( { title: "card", author: "test" } )
//     });


app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
    res.json({testing:"api"});
});

app.listen(port, function () {
    console.log("Running on PORT " + port);
});

module.exports = app;