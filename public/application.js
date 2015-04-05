var mainApplicationModule = angular.module('mean', ['mwAnnotator', 'ngResource', 'ngRoute', 'ngCookies', 'users', 'signin', 'trees']);

mainApplicationModule.config(function($locationProvider, $httpProvider) {
        $locationProvider.hashPrefix('!');

        $httpProvider.interceptors.push(function($q, $location) {
            return {
                response: function(response) {
                    return response;
                },
                responseError: function(response) {
                    if (response.status === 401) {
                        $location.url('/signin');
                    }
                    return $q.reject(response);
                }
            }
        });
    }
);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['mean']);
});