angular.module('trees').controller('TreesController', ['$scope', '$rootScope', '$routeParams', '$location', '$cookieStore', '$window', '$q', '$timeout', 'Trees', 'Annotations', 'annotationFactory', function($scope, $rootScope, $routeParams, $location, $cookieStore, $window, $q, $timeout, Trees, Annotations, annotationFactory) {
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
        console.log($scope)
    };

    $scope.update = function() {
        $scope.tree.$update(
            function() {
                $location.path('trees/' + $scope.tree._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        $('#edit').modal('hide');
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
        var tsv = annotationFactory.parseTree($scope.tree);
        var req = new Annotations($scope.tree);
        req.data=tsv;

        req.$annotate(function(response) {
            $window.alert("saved");
        },
        function(errorResponse) {
            $scope.error = errorResponse;
            $window.alert(errorResponse);
        });
        $scope.tree.data = tsv;
    };

    $scope.saveAnnotation = function() {
        var tsv = annotationFactory.parseTree($scope.tree);
        var req = new Tree($scope.tree);
        req.data = tsv;

        req.$saveAnnotation(function(response) {
            $window.alert("saved");
        },
        function(errorResponse) {
            $scope.error = errorResponse;
            $window.alert(errorResponse);
        });
        $scope.tree.data = tsv;
    };

    $rootScope.$on('keypress', function (evt, obj, key) {
        if (key == 'z')
            highlightOrganization();
        if (key == 'x')
            highlightLocation();
        if (key == 'c')
            highlightPerson();
        if (key == 'v')
            removeTag();
    });

    $('#create').modal({show:false});
    $('body').removeClass('modal-open');
    $('.modal-backdrop').removeClass("modal-backdrop");
}]);

Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {         
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};
