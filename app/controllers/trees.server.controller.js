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
    var request = require('request');
    request(
    {
        method: 'POST',
        uri: 'http://52.6.179.224:4567/deptree',
        headers: {
            'content-type': 'application/json'
        },
        body: req.body.content
    },
    function(error, response, body) {
        // console.log(body);
        if (!error && response.statusCode == 200) {
            var tree = new Tree(req.body);
            tree.creator = req.user;
            tree.data = body;
            tree.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message: getErrorMessage(err)
                    });
                } else {
                    res.json(tree);
                }
            });
        }
        else {
            console.log('Fail to retrieve deptree');
        }
    });
};

exports.list = function(req, res) {
    Tree.find({ creator: req.user._id }).sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, tree) {
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
    Tree.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, tree) {
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
    var request = require('request');
    request(
    {
        method: 'POST',
        uri: 'http://52.6.179.224:4567/deptree',
        headers: {
            'content-type': 'application/json'
        },
        body: req.body.content
    },
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var tree = req.tree;
            tree.title = req.body.title;
            tree.content = req.body.content;
            tree.data = body;
            tree.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message: getErrorMessage(err)
                    });
                } else {
                    res.json(tree);
                }
            });
        }
        else {
            console.log('Fail to retrieve deptree');
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

exports.annotateNer = function(req, res) {
    console.log(req.body.data);
    var request = require('request');
    request(
    {
        method: 'POST',
        uri: 'http://52.6.179.224:4567/annotatener',
        headers: {
            'content-type': 'application/json'
        },
        body: req.body.data
    },
    function(error, response, body) {
        console.log("body"+body);
        console.log("res"+res.body);
        console.log(error);
        if (!error && response.statusCode == 200) {
            var tree = req.tree;
            tree.save(function(err) {
                if (err) {
                    console.log(getErrorMessage(err));
                    return res.status(400).send({
                        message: getErrorMessage(err)
                    });
                } else {
                    res.json(tree);
                }
            });
        }
        else {
            console.log('Fail to retrieve deptree');
        }
    });
};

exports.saveAnnotation = function(req, res) {
    console.log(req.body);
    var tree = new Tree();
    tree.creator = req.user;
    tree.data = req.body.data;
    tree.content = req.body.content;
    tree.title = req.body.title;
    tree.created = req.body.created;
    tree.save(function(err) {
    if (err) {
        console.log(err);
        return res.status(400).send({
            message: getErrorMessage(err)
            });
    } else {
            res.json(tree);
        }
    });
};
