describe('Testing Trees Controller', function() {

    var _scope, TreesController;

    beforeEach(function() {
        module('trees');

    inject(function($rootScope, $controller) {
        _scope = $rootScope.$new();

    TreesController = $controller('TreesController', {
            $scope: _scope
            });
        });

     });

    it('Should be registered', function() { expect(TreesController).toBeDefined();
    });

    it('Should include CRUD methods', function() {
        expect(_scope.find).toBeDefined();
        expect(_scope.findOne).toBeDefined();
        expect(_scope.create).toBeDefined();
        expect(_scope.delete).toBeDefined();
        expect(_scope.update).toBeDefined();
    });

});