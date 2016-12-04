

var bookController = function(Book){
    var post = function (req, res) {
            var book = new Book(req.body);
            if(!req.body.title){
                res.status(400);
                res.send("Title is required");
            }else {
                book.save();
                console.log(book);
                res.status(201);
                res.send(book);
            }

        };

    var get = function (req, res) {
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if (err)
                res.status(500).send(err);
            else
                var returnBooks = [];
                books.forEach(function (element, index, array) {
                    var newBook = element.toJSON();
                    newBook.items = {};
                    newBook._links = {};
                    newBook._links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                    newBook.pagination = {};
                    returnBooks.push(newBook);
                });
                var items = new Object();
                items.items = returnBooks;
                items._links = {};
                items._links.self.href = 'http://' + req.headers.host + '/api/books/';
                items.pagination = {"currentPage":"1"};
                // <currentPage>1</currentPage>
                // <currentItems>13</currentItems>
                // <totalPages>1</totalPages>
                // <totalItems>13</totalItems>
                // var items = [returnBooks];
                // res.items = returnBooks;
                res.json(items);
                // res.bla("bla");
        });
    };

    return {
        post: post,
        get:get
    }
};



module.exports = bookController;
// module.exports = bookDetailController;