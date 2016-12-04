var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();

    var bookController = require("../controller/bookController")(Book);
    var bookDetailController = require("../controller/bookDetailController")(Book);

    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get)
        .options(function (req, res) {
            var option = new Object();
            option.Get = "Get all the books";
            option.Post = "Make a new book";
            res.setHeader('Allow-header','application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
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
                res.status(404).send("No book found!");
            }
        })
    });

    bookRouter.route('/:bookId')
        .get(bookDetailController.get)
        .put(bookDetailController.put)
        .patch(bookDetailController.patch)
        .delete(bookDetailController.delete)
        .options(bookDetailController.options);

    return bookRouter;

};

module.exports = routes;