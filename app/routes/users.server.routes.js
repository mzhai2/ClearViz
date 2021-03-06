var users = require('../../app/controllers/users.server.controller'),
passport = require('passport');

module.exports = function(app) {
    app.route('/signup')
    .post(users.signup, function(req, res) {
        res.send(req.user);
        res.redirect('/trees');
    });

    app.post('/signin', passport.authenticate('local'), function(req, res) {
      res.send(req.user);
  });

    app.get('/loggedin', function(req, res) {
      res.send(req.isAuthenticated() ? req.user : '0');
  });

app.post('/signout', function(req, res){
    users.signout(req, res);
    res.status(200).end();
});

};