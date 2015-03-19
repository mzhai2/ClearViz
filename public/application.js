var mainApplicationModule = angular.module('mean', ['ngResource', 'ngRoute', 'users', 'signin', 'trees']);

mainApplicationModule.config(function($locationProvider, $httpProvider) {
        $locationProvider.hashPrefix('!');
        // check if user is connected
        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
          // Initialize a new promise
          var deferred = $q.defer();

          // Make an AJAX call to check if the user is logged in
          $http.get('/loggedin').success(function(user){
            // Authenticated
            if (user !== '0')
              /*$timeout(deferred.resolve, 0);*/
              deferred.resolve();
              
            // Not Authenticated
            else {
              $rootScope.message = 'You need to log in.';
              //$timeout(function(){deferred.reject();}, 0);
              deferred.reject();
              $location.url('/signin');
            }
          });

          return deferred.promise;
        };

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
).run(function($rootScope, $http, $location){
    $rootScope.message = '';

    // Logout function is available in any pages
    $rootScope.signout = function(){
      $rootScope.message = 'Logged out.';
      $http.post('/signout');
      $location.path('/#!');
    };
  });


if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
    angular.bootstrap(document, ['mean']);
});