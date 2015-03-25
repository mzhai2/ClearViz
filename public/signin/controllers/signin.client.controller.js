angular.module('signin').controller('SigninController', function($scope, $rootScope, $http, $location, $cookieStore) {
    $scope.user = {};
    $rootScope.message = '';
    $rootScope.loggedIn = $cookieStore.get('loggedin');
    $scope.signin = function() {
        $http.post('/signin', {
            username: $scope.user.username,
            password: $scope.user.password
        })
        .success(function(user) {
            $scope.user = user;
            $cookieStore.put('loggedin', true);
            $location.path('/trees');
            // $("#signinModal").modal({show:false});

        })
        .error(function() {
            // Error: authentication failed
            $rootScope.message = 'Authentication failed.';
            $location.url('/');
        });

        $("#signinModal").modal({show:false});
        $('.modal-backdrop').removeClass("modal-backdrop");
    };
    $scope.signup = function(){
        $http.post('/signup', {
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName,
            organization: $scope.user.organization,
            email: $scope.user.email,
            username: $scope.user.username,
            password: $scope.user.password
        })
        .success(function(user) {
            $scope.user = user;
            $cookieStore.put('loggedin', true);
            // No error: signup OK
            $location.path('/trees');

        })
        .error(function(data, status, headers, config) {
            // Error: authentication failed
            $rootScope.message = data;
            $location.path('/');
            $rootScope.user.$setPristine;
        });
        $("#signupModal").modal({show:false});
        $('.modal-backdrop').removeClass("modal-backdrop")
    };
    $rootScope.signout = function() {
        $rootScope.message = 'Logged out.';
        $http.post('/signout');
        $cookieStore.put('loggedin', false);
        $rootScope.loggedIn = false;
        $location.path('/');
    };
});