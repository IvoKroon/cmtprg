var bookDetailController = function (Book) {
    var get = function (req, res) {
        var returnBook = req.book.toJSON();

        returnBook.links = {};
        var newLink = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
        returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20');
        res.json(returnBook);
    };

    var put = function (req, res) {
        // for(var p in req.body){
        //     // req.book[p] = req.body[p];
        //     if(req.book[p]){
        //
        //     }
        // }
        if(req.book.title && req.book.author && req.book.genre && req.book.read) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else{
                    res.json(req.book);
                }
            });
        }else{
            var err = "A field is empty";
            res.status(304).send(err);
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
        var options = new Object();
        options.Get = "Get one resource by given id";
        options.Put = "Update a part of the resourse";
        options.Delete = "Remove the resourse";
        options.Patch = "Update the full resourse";
        res.json(req)
    };

    return {
        get:get,
        put:put,
        patch:patch,
        delete:deletebook,
        options:options
    }

}

module.exports = bookDetailController;