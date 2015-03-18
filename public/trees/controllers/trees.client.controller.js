angular.module('trees').controller('TreesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Trees', 
    function($scope, $routeParams, $location, Authentication, Trees) {
        $scope.authentication = Authentication;

$scope.create = function() {

    var tree = new Trees({
        title: this.title,
        content: this.content,
        data: null
    });
        console.log('hello');

    tree.$save(function(response) {
        $location.path('trees/' + response._id);
    },function(errorResponse) {
        $scope.error = errorResponse.data.message;
    });
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
