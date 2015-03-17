var mongoose = require('mongoose'),
    Tree = mongoose.model('Tree');

var getErrorMessage = function(err) {
if (err.errors) {
    for (var errName in err.errors) {
        if (err.errors[errName].message)
            return err.errors[errName].message;
    }
} else {
    return 'Unknown server error';
    }
};

exports.create = function(req, res) {
    var tree = new Tree(req.body);
    Tree.creator = req.user;
    tree.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            var request = require('request');
            request.post(
                'http://127.0.0.1:4567/deptree',
                { form: { key: tree.content } },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        tree.data = body;
                    }
                }
            );
            res.json(tree);
        }
    });
};

exports.list = function(req, res) {
Tree.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(
    function(err, tree) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
        });
        } else {
            res.json(tree);
        }
    }); 
};

exports.treeByID = function(req, res, next, id) {
Tree.findById(id).populate('creator', 'firstName lastName fullName').exec(
    function(err, tree) {
        if (err) return next(err);
        if (!tree) return next(new Error('Failed to load tree ' + id));
        req.tree = tree;
        next();
    });
};

exports.read = function(req, res) {
    res.json(req.tree);
};

exports.update = function(req, res) {
    var tree = req.tree;
    tree.title = req.body.title;
    tree.content = req.body.content;
    tree.save(function(err) {
        if (err) {
            return res.status(400).send({
            message: getErrorMessage(err)
        });
        } else {
            res.json(tree);
        }
    });
};

exports.delete = function(req, res) {
var tree = req.tree;
tree.remove(
    function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(tree);
        }
    });
};

exports.hasAuthorization = function(req, res, next) {
    if (req.tree.creator.id !== req.user.id) {
            return res.status(403).send({
                message: 'User is not authorized'
        });
    }
    next();
};


