angular.module('trees').controller('TreesController', ['$scope', '$rootScope', '$routeParams', '$location', '$cookieStore', '$window', '$q', '$timeout', 'Trees', 'Annotations', 'annotationFactory', 'saveAnnotations', function($scope, $rootScope, $routeParams, $location, $cookieStore, $window, $q, $timeout, Trees, Annotations, annotationFactory, saveAnnotations) {
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
        var tsv = annotationFactory.parseAnnotations($scope.tree);
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
        var tsv = annotationFactory.parseAnnotations($scope.tree);
        var tree = new saveAnnotations($scope.tree);
        console.log(tsv);
        tree.data = tsv;
        tree.$saveAnnotation(function(response) {
            $window.alert("saved");
        },
        function(errorResponse) {
            $scope.error = errorResponse;
            $window.alert(errorResponse);
        });
        $scope.tree.data = tsv;
    };

    $rootScope.$on('keypress', function (evt, obj, key) {
        if (key == 'c')
        highlight('PERSON');
        if (key == 'd')
            highlight('NORP');
        if (key == 's')
            highlight('FAC');
        if (key == 'z')
            highlight('ORG');
        if (key == 'a')
            highlight('GPE');
        if (key == 'x')
            highlight('LOC');
        if (key == 'f')
            highlight('PRODUCT');
        if (key == 'q')
            highlight('EVENT');
        if (key == 'w')
            highlight('WORK_OF_ART');
        if (key == 'e')
            highlight('LAW');
        if (key == 'r')
            highlight('LANGUAGE');

        if (key == 'v')
            removeTag();
    });
    $('#sidebar').affix({
        offset: {
            top: 245
        }
    });
    $('#create').modal({show:false});
    $('body').removeClass('modal-open');
    $('.modal-backdrop').removeClass("modal-backdrop");


}]);

