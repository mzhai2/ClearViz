angular.module('trees').controller('TreesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Trees', 
    function($scope, $routeParams, $location, Authentication, Trees) {
        $scope.authentication = Authentication;

$scope.create = function() {

    var $http = angular.injector(['ng']).get('$http');
    $http.post('http://127.0.0.1:4567/deptree', {msg:this.content})
    .success(function(data, status, headers, config) {
    var tree = new Trees({
        title: this.title,
        content: data
    });

    tree.$save(function(response) {
        $location.path('trees/' + response._id);
    },function(errorResponse) {
        $scope.error = errorResponse.data.message;
    });
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

    // var tree = new Trees({
    //     title: this.title,
    //     content: this.content
    // });

    // tree.$save(function(response) {
    //     $location.path('trees/' + response._id);
    // },function(errorResponse) {
    //     $scope.error = errorResponse.data.message;
    // });
};

$scope.find = function() {
    $scope.trees = Trees.query();
};

$scope.findOne = function() {
    $scope.tree = Trees.get({
        treeId: $routeParams.treeId
    });
};

$scope.update = function() {
    $scope.tree.$update(
        function() {
            $location.path('trees/' + $scope.tree._id);
        },
        function(errorResponse) {
            $scope.error = errorResponse.data.message;
        }
    );
};

$scope.delete = function(tree) {
    if (tree) {
        tree.$remove(function() {
            for (var i in $scope.trees) {
                if ($scope.trees[i] === tree) {
                    $scope.trees.splice(i, 1);
                }
            } 
        });
    } else {
        $scope.article.$remove(function() {
            $location.path('articles');
        });
    }
};

    }
]);
