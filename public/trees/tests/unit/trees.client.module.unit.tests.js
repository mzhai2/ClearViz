describe('Testing Trees Module', function() {

    var mainModule;

    beforeEach(function() {
    mainModule = angular.module('trees');
    });

    it('Should be registered', function() {
        expect(mainModule).toBeDefined();
    });

});