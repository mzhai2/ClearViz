var mainApplicationModule = angular.module('mean', ['ngResource', 'ngRoute', 'ngCookies', 'users', 'signin', 'trees']);

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


// if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
    angular.bootstrap(document, ['mean']);
});