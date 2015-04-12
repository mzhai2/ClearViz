angular.module('mean', ['ngResource', 'ngRoute', 'ngCookies', 'signin', 'trees']);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['mean']);
});

angular.module('mean').factory('interceptor', ['$q', '$location',
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

angular.module('mean').config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');
    $httpProvider.interceptors.push('interceptor');
}]);