
angular.module('trees').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/trees', {
            templateUrl: 'trees/views/list-tree.client.view.html'
        })
        .when('/trees/create', {
            templateUrl: 'trees/views/create-tree.client.view.html'
            }
        )
        .when('/trees/:treeId', {
            templateUrl: 'trees/views/view-tree.client.view.html'
            }
        )
        .when('/trees/:treeId/edit', {
            templateUrl: 'trees/views/edit-tree.client.view.html'
            }
        );
    }
]);