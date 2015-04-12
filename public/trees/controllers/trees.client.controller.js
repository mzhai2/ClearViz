angular.module('trees').controller('TreesController', ['$scope', '$rootScope', '$routeParams', '$location', '$cookieStore', 'Trees', 'Annotations', 'annotationFactory',
    function($scope, $rootScope, $routeParams, $location, $cookieStore, Trees, Annotations, annotationFactory) {
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
        var div = document.getElementById('annotation');
        console.log(div.childNodes[1].childNodes);
        var childNodes = div.childNodes[1].childNodes;
        // var tree = JSON.parse($scope.tree.data);
        console.log($scope.tree);
        console.log(tree);

        // var treeData = new Array();


        d3.tsv.parseRows(tree.data, function(data) {
            treeData[treeData.length] = data;
        });
        console.log(treeData[0]);
            for (var i=0; i < childNodes.length; i++)
            {
                console.log(data[7]);
                var node = childNodes[i];
                if (node.nodeType == 3) {
                    for (word in node) {
                        // assign _ 
                    }
                }
                if (node.nodeType == 1) {
                    for (word in node) { 
                    // assign node.className
                    }
                }

            }
        
        var anno = new Annotations({
            annotation: document.getElementById('annotation'),
            _id : this.tree._id
        });

        // send it get a response of the entire tree and save
        // anno.$save(function(errorResponse) {
        //     $scope.error = errorResponse.data.message;
        // });
    };
    $('#create').modal({show:false});
    $('body').removeClass('modal-open');
    $('.modal-backdrop').removeClass("modal-backdrop");
}]);