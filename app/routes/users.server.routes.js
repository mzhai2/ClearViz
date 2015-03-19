var users = require('../../app/controllers/users.server.controller'),
passport = require('passport');

module.exports = function(app) {
  app.route('/signup')
  .post(users.signup);
  
 app.post('/signin', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log out
app.post('/signout', function(req, res){
  req.logOut();
  res.send(200);
});

};