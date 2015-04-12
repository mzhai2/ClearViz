var mainApplicationModule = angular.module('mean', ['ngResource', 'ngRoute', 'ngCookies', 'signin', 'trees']);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['mean']);
});

mainApplicationModule.factory('interceptor', ['$q', '$location',
    function($q, $location) {
    return {
        response: function(response) {
            return response;
        },
        responseError: function(response) {
            if (response.status === 401) {
                $location.url('/');
            }
            return $q.reject(response);
        }
    };
}]);

mainApplicationModule.config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');
    $httpProvider.interceptors.push('interceptor');
}]);