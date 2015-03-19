process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
express = require('./config/express'),
passport = require('./config/passport');

var auth = function(req, res, next){
  if (!req.isAuthenticated()) 
    res.send(401);
  else
    next();
};

var db = mongoose();
var app = express();
var passport = passport();
app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000/');