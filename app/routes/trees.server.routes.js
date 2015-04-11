var users = require('../../app/controllers/users.server.controller'),
trees = require('../../app/controllers/trees.server.controller');
module.exports = function(app) {
    app.route('/api/trees')
    .get(users.requiresLogin, trees.list)
    .post(users.requiresLogin, trees.create);

    app.route('/api/trees/:treeId')
    .get(users.requiresLogin, trees.hasAuthorization, trees.read)
    .put(users.requiresLogin, trees.hasAuthorization, trees.update)
    .delete(users.requiresLogin, trees.hasAuthorization, trees.delete);

    app.route('/api/trees/:treeId/annotatener')
    .post(users.requiresLogin, trees.hasAuthorization, trees.annotateNer);

app.param('treeId', trees.treeByID);
};