describe('Testing Users Module', function() {

    var mainModule;

    beforeEach(function() {
    mainModule = angular.module('users');
    });

    it('Should be registered', function() {
        expect(mainModule).toBeDefined();
    });

});