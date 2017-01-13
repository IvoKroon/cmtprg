var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();

    var bookController = require("../controller/bookController")(Book);
    var bookDetailController = require("../controller/bookDetailController")(Book);

    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get)
        .options(function (req, res) {
            var option = {};
            option.Get = "Get all the books";
            option.Post = "Make a new book";
            res.header('Access-Control-Allow-Methods','POST, GET, OPTIONS');
            // res.header('Allow-header','application/json');
            res.json(option);
        });

    bookRouter.use('/:bookId', function (req,res,next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.status(500).send(err);
            else if(book) {
                req.book = book;
                next();
            }else{
                console.log("NO BOOK");

                res.json({error:"No Book Found"});
                res.status(204);
                //
                // res.send();
            }
        })
    });

    bookRouter.route('/:bookId')
        .get(bookDetailController.get)
        .put(bookDetailController.put)
        .patch(bookDetailController.patch)
        .delete(bookDetailController.remove)
        .options(bookDetailController.options);

    return bookRouter;

};

module.exports = routes;

// Access-Control-Allow-Origin → *
// Connection →
// Connection
// Options that are desired for the connection
// keep-alive
// Date → Fri, 13 Jan 2017 12:13:45 GMT
// ETag → W/"7-k/B7cg6/fRJGUSVpdhpYBA"
// X-Powered-By → Express