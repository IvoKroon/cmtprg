/**
 * Created by ivokroon on 17/11/2016.
 */
var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

//makes connection if there is no connection it makes the connection.
var db = mongoose.connect("mongodb://localhost/bookApi");

var Book = require('./models/bookModel');


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

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