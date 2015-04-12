var app = require('../../server'),
should = require('should'),
mongoose = require('mongoose'),
User = mongoose.model('User'),
Tree = mongoose.model('Tree');
var user, tree;
describe('Tree Model Unit Tests:', function() {
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
            done();
        });
    });
    describe('Testing the save method', function() {
        it('Should be able to save without problems', function() {
            tree.save(function(err) {
                should.not.exist(err);
            });
        });
        it('Should not be able to save an tree without a title', function() {
            tree.title = '';
            tree.save(function(err) {
                should.exist(err);
            });
        });
    });
    afterEach(function(done) {
        Tree.remove(function() {
            User.remove(function() {
                done();
            });
        });
    });
});
