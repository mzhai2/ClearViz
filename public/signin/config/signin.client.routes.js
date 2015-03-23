angular.module('signin').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'signin/views/signin.client.view.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    }
]);