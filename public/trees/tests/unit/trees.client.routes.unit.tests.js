describe('Testing Trees Routing', function() {

    beforeEach(module('trees'));


    it('Should map a "list" route', function() {
        inject(function($route) {
            expect($route.routes['/trees'].templateUrl).toEqual('trees/views/list-tree.client.view.html');
        });
    });

    it('Should map a "create" route', function() {
        inject(function($route) {
            expect($route.routes['/trees/create'].templateUrl).toEqual('trees/views/create-tree.client.view.html');
        });
    });

    it('Should map a "view" route', function() {
        inject(function($route) {
            expect($route.routes['/trees/:treeId'].templateUrl).toEqual('trees/views/view-tree.client.view.html');
        });
    });

    it('Should map a "edit" route', function() {
        inject(function($route) {
            expect($route.routes['/trees/:treeId/edit'].templateUrl).toEqual('trees/views/edit-tree.client.view.html');
        });
    });


});