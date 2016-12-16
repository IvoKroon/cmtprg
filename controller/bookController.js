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
        // console.log(count);
        if (req.accepts('json')) {
            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            // console.log(req.query);
            if(req.query.start && req.query.limit){
                // query.limit(2);
                // console.log(req.query.start);
                var limit = parseInt(req.query.limit);
                // console.log(limit);

                Book.find(query).limit(parseInt(limit)).skip(1).exec(function (err, books){console.log(books)});
            }
            var startQuery = Book.find(query);
            if(req.query.start && req.query.limit){
                startQuery.limit(parseInt(req.query.limit));
                startQuery.skip(parseInt(req.query.start) - 1);
            }

           startQuery.exec(function (err, books) {
               // console.log(books);
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
                    returnBooks.push(newBook);
                });

                Book.find().count(function (err, count) {

                var items = {};
                var selfLink = 'http://' + req.headers.host + '/api/books/';
                var totalPages = (req.query.limit ? Math.ceil(count / parseInt(req.query.limit)) : 1);

                items.items = returnBooks;
                items._links = {};
                items._links.self = {};
                items._links.self.href = selfLink;

                items.pagination = {
                    currentPage:(req.query.start? Number(req.query.start): 1),
                    currentItems:(req.query.limit? Number(req.query.limit): 1),
                    totalPages:(req.query.limit ? totalPages : 1),
                    totalItems:count
                };

                items.pagination._links = {};
                items.pagination._links.first = {
                    page: 1,
                    href: (req.query.limit? selfLink + "start=" + req.query.start + "limit=" + req.query.limit : selfLink)
                };

                items.pagination._links.last = {
                    page: (req.query.limit ? totalPages : 1),
                    href:(req.query.limit ? selfLink + "?start=" + totalPages + "&limit=" + req.query.limit : selfLink)
                };

                items.pagination._links.previous = {
                    page: (req.query.start != 1 ? req.query.start - 1 : 1),
                    href:  (req.query.limit ? selfLink + "?start=" + (req.query.start != 1 ? req.query.start - 1: 1) + "&limit=" +req.query.limit: selfLink)
                };

                items.pagination._links.next = {
                    page:(req.query.start != totalPages? Number(req.query.start) + 1: totalPages),
                    href:(req.query.limit ?
                    selfLink + "?start=" + (req.query.start != totalPages? Number(req.query.start) + 1: totalPages) + "&limit=" + req.query.limit : selfLink)
                };

                res.json(items);
            });
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