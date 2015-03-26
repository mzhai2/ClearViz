var app = require('../../server'),
 request = require('supertest'),
 should = require('should'),
 mongoose = require('mongoose'),
 User = mongoose.model('User'),
 Tree = mongoose.model('Tree');
var user, tree;
describe('Trees Controller Unit Tests:', function() {
 beforeEach(function(done) {
 user = new User({
 firstName: 'Full',
 lastName: 'Name',
 displayName: 'Full Name',
 email: 'test@test.com',
 username: 'username',
 password: 'password'
 });
 user.save(function() {
 tree = new Tree({
 title: 'Tree Title',
 content: 'Tree Content',
 user: user
 });
 tree.save(function(err) {
 done();
 });
 });
 });
 describe('Testing the GET methods', function() {
 it('Should be able to get the list of trees', function(done){
 request(app).get('/api/trees/')
 .set('Accept', 'application/json')
 .expect('Content-Type', /json/)
 .expect(200)
 .end(function(err, res) {
 res.body.should.be.an.Array.and.have.lengthOf(1);
 res.body[0].should.have.property('title',tree.title);
 res.body[0].should.have.property('content',
tree.content);
 done();
 });
 });
 it('Should be able to get the specific tree', function(done) {
 request(app).get('/api/trees/' + tree.id)
 .set('Accept', 'application/json')
 .expect('Content-Type', /json/)
 .expect(200)
 .end(function(err, res) {
 res.body.should.be.an.Object.and.have.property('title',
tree.title);
 res.body.should.have.property('content', tree.content);
 done();
 });
 });
 });
 afterEach(function(done) {
 Tree.remove().exec();
 User.remove().exec();
 done();
 });
});
