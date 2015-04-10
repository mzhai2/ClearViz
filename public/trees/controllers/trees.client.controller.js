angular.module('trees').controller('TreesController', ['$scope', '$rootScope', '$routeParams', '$location', '$cookieStore', 'Trees', 'Annotations',
    function($scope, $rootScope, $routeParams, $location, $cookieStore, Trees, Annotations) {
    $rootScope.loggedIn = $cookieStore.get('loggedin');
    $scope.create = function() {
        var tree = new Trees({
            title: this.title,
            content: this.content,
            data: null
        });
        tree.$save(function(response) {
            $location.path('trees/' + response._id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    $scope.find = function() {
        $scope.trees = Trees.query();
    };

    $scope.findOne = function() {
        Trees.get({
            treeId: $routeParams.treeId
        })
        .$promise.then(function(tree) {
            initDEPTrees(tree.data);
            $scope.tree = tree;
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
            $scope.tree.$remove(function() {
                $location.path('trees/');
            });
        }
    };

    $scope.annotate = function() {
        var anno = new Annotations({
            content: document.getElementById('content')
            // a: $scope.annotation
        });
        console.log(anno.content);
        anno.$save(function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

}]);