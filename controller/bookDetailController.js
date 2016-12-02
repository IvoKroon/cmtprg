var bookDetailController = function (Book) {
    var get = function (req, res) {
        var returnBook = req.book.toJSON();

        returnBook.links = {};
        var newLink = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
        returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20');
        res.json(returnBook);
    };

    var put = function (req, res) {

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

    return {
        get:get,
        put:put,
        patch:patch,
        delete:deletebook
    }

}

module.exports = bookDetailController;