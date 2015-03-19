angular.module('signin').controller('SigninController', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the signin() function
  $scope.signin = function(){
    $http.post('/signin', {
      username: $scope.user.username,
      password: $scope.user.password
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Authentication successful!';
      $location.path('/trees');
      $scope.user = user;
            //       tree.$promise.then(function(realtree) {
            //     initDEPTrees(realtree.data);
            // });
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Authentication failed.';
      $location.url('/');
    });
  };

    // Register the signup() function
  $scope.signup = function(){
    $scope.user = {};
    $http.post('/signup', {
      firstName: $scope.user.firstName,
      lastName: $scope.user.lastName,
      organization: $scope.user.organization,
      email: $scope.user.email,
      username: $scope.user.username,
      password: $scope.user.password
    })
    .success(function(user){
      // No error: signup OK
      $rootScope.message = 'Signup successful!';
      $location.url('/');
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Signup failed.';
      $location.url('/signin');
    });
  };
});