exports.render = function(req, res) {
  res.render('index', {
    title: 'ClearViz',
    user: JSON.stringify(req.user),
});
};