var users = require('../../app/controllers/users.server.controller'),
trees = require('../../app/controllers/trees.server.controller');

module.exports = function(app) {
    app.route('/api/trees')
    .get(trees.list)
    .post(users.requiresLogin, trees.create);

    app.route('/api/trees/:treeId')
    .get(trees.read)
    .put(users.requiresLogin, trees.hasAuthorization, trees.update)
    .delete(users.requiresLogin, trees.hasAuthorization, trees.delete);

app.param('treeId', trees.treeByID);
};