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

    $scope.annotateNer = function() {
        var anno = new Annotations({
            annotation: document.getElementById('content'),
            _id : this.tree._id
        });
        console.log(anno.annotation);
        // send it get a response of the entire tree and save
        anno.$save(function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

}]);