describe('Testing Authentication Service', function() {

    var _Authentication;

    beforeEach(function() {
        module('users');

    inject(function(Authentication) {
        _Authentication = Authentication;
        });
    });

    it('Should be registered', function() {
        expect(_Authentication).toBeDefined();
    });


});