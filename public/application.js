var mainApplicationModule = angular.module('mean', ['mwAnnotator', 'ngResource', 'ngRoute', 'ngCookies', 'users', 'signin', 'trees']);

mainApplicationModule.config(function($locationProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');
    $httpProvider.interceptors.push(interceptor);
});

angular.element(document).ready(function() {
    angular.bootstrap(document, ['mean']);
});

mainApplicationModule.factory('interceptor', ['$rootScope', '$q', '$location', function($rootScope, $q, $location) {
    return {
        response: function(response) {
            return response;
        },
        responseError: function(response) {
            if (response.status === 401) {
                $location.url('/');
                $rootScope.signout();
            }
            return $q.reject(response);
        }
    }
}];