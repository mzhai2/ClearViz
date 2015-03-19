describe('Testing Trees Service', function() {

    var _Trees;

    beforeEach(function() {
        module('trees');

    inject(function(Trees) {
        _Trees = Trees;
        });
    });

    it('Should be registered', function() {
        expect(_Trees).toBeDefined();
    });

    it('Should include $resource methods', function() {
       //expect(_Trees.get).toBeDefined();
        //expect(_Trees.query).toBeDefined();
       //expect(_Trees.remove).toBeDefined();
        expect(_Trees.update).toBeDefined();
    });

});