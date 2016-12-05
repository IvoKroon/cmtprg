var bookController = function (Book) {
    var post = function (req, res) {
        var book = new Book(req.body);
        if (!req.body.title) {
            res.status(400);
            res.send("Title is required");
        } else {
            book.save();
            console.log(book);
            res.status(201);
            res.send(book);
        }

    };

    var get = function (req, res) {
        var query = {};
        if (req.accepts('json')) {
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
                    newBook._links.self = {};
                    newBook._links.self.href = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                    // newBook.pagination = {};
                    returnBooks.push(newBook);
                });
                var items = new Object();
                items.items = returnBooks;
                items._links = {};
                items._links.self = {};
                items._links.self.href = 'http://' + req.headers.host + '/api/books/';
                items.pagination = {};

                items.pagination.currentPage = 1;
                items.pagination.currentItems = returnBooks.length;
                items.pagination.totalPages = 1;
                items.pagination.totalItems = returnBooks.length;

                res.json(items);
            });
        } else {
            var err = "Filetype not accepted";
            res.status(400).send(err);
        }
    };

    return {
        post: post,
        get: get
    }
};


module.exports = bookController;
// module.exports = bookDetailController;