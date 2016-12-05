var bookDetailController = function (Book) {
    var get = function (req, res) {
        var returnBook = req.book.toJSON();

        var selfLink = 'http://' + req.headers.host + '/api/books/'+returnBook._id;
        var collectionLink = 'http://' + req.headers.host + '/api/books/';

        returnBook._links = {};
        returnBook._links.self = {};
        returnBook._links.self.href = selfLink;
        returnBook._links.collection = {};
        returnBook._links.collection.href = collectionLink;
        res.json(returnBook);
    };

    var put = function (req, res) {
        if(req.body.title && req.body.author && req.body.genre) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;

            req.book.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else{
                    res.json(req.book);
                }
            });
        }else{
            var err = "A field is empty";
            res.status(400).send(err);
        }



    } ;
    var patch = function(req,res){
        if(req.body._id)
            delete req.body._id;

        for(var p in req.body){
            req.book[p] = req.body[p];
        }

        req.book.save(function (err) {
            if (err)
                res.status(500).send(err);
            else{
                res.json(req.book);
            }
        });
    };
    var deletebook = function(req, res) {
        req.book.remove(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.status(204).send('Removed');
            }
        });
    };

    var options = function (req, res) {
        var options = {};
        options.Get = "Get one resource by given id";
        options.Put = "Update a part of the resourse";
        options.Delete = "Remove the resourse";
        options.Patch = "Update the full resourse";
        res.json(options)
    };

    return {
        get:get,
        put:put,
        patch:patch,
        delete:deletebook,
        options:options
    }

};

module.exports = bookDetailController;