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
                var selfLink = 'http://' + req.headers.host + '/api/books/';
                items.items = returnBooks;
                items._links = {};
                items._links.self = {};
                items._links.self.href = selfLink;
                items.pagination = {};

                items.pagination.currentPage = 1;
                items.pagination.currentItems = returnBooks.length;
                items.pagination.totalPages = 1;
                items.pagination.totalItems = returnBooks.length;
                items.pagination._links = {};
                items.pagination._links.first = {};
                items.pagination._links.first.page = 1;
                items.pagination._links.first.href = {};
                items.pagination._links.first.href = selfLink;

                items.pagination._links.last = {};
                items.pagination._links.last.page = 1;
                items.pagination._links.last.href = {};
                items.pagination._links.last.href = selfLink;

                items.pagination._links.previous = {};
                items.pagination._links.previous.page = 1;
                items.pagination._links.previous.href = {};
                items.pagination._links.previous.href = selfLink;

                items.pagination._links.next = {};
                items.pagination._links.next.page = 1;
                items.pagination._links.next.href = {};
                items.pagination._links.next.href = selfLink;

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