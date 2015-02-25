var express = require('express'),
	app = express();

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/client/views/index.html');
});

app.listen(3000, function() {
	console.log('I\'m Listening...');
})