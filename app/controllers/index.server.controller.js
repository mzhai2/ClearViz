exports.render = function(req, res) {
	// print the last time the user visited
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}
	// record the date of the last vist
	req.session.lastVisit = new Date();
	res.render('index', {
	title: 'ClearViz'
  })
};