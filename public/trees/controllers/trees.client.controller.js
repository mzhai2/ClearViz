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
        function getNext(treeData) {
            getNext.count = ++getNext.count || 0;
            if (treeData[getNext.count][0] === "NEWSENTENCE")
                getNext.count++;
            return getNext.count;
        }
        var div = document.getElementById('annotation');
        var childNodes = div.childNodes[1].childNodes;
        var treeData = [];
        var data = $scope.tree.data;

        d3.tsv.parseRows(data, function(data) {
            if(data[1])
                treeData[treeData.length] = data;
            else {
                treeData[treeData.length] = ["NEWSENTENCE"]; // adds spacer
            }
        });
        var i,k;
        var words, word;
        for (i=0; i < childNodes.length; i++) {
            var node = childNodes[i];
            if (node.nodeType == 3) {
                words = node.nodeValue.split(" ").clean("");
                for (k=0; k<words.length; k++) {
                    if (words[k]){
                        treeData[getNext(treeData)][7] = "O";
                    }

                }
            }
            if (node.nodeType == 1) {
                var name = node.className.substring(0,3).toUpperCase();
                words = node.innerHTML.split(" ").clean("");
                if (words.length == 1)
                    treeData[getNext(treeData)][7] = "U-" + name;
                else {
                    treeData[getNext(treeData)][7] = "B-" + name;
                    for (k=1; k<words.length-1; k++) {
                        treeData[getNext(treeData)][7] = "I-" + name;
                    }
                    treeData[getNext(treeData)][7] = "L-" + name;
                }
            }
        }
        var tsv = "";
        for (i=0;i<treeData.length;i++) {
            if (treeData[i][0] === "NEWSENTENCE")
                tsv+="\n";
            else {
                tsv+=treeData[i][0]+"\t"+treeData[i][1]+"\t"+treeData[i][2]+"\t"+treeData[i][3]+"\t"+treeData[i][4]+"\t"+treeData[i][5]+"\t"+treeData[i][6]+"\t"+treeData[i][7]+"\n";
            }
        }
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
        $timeout(function () {
            $scope.update();
        }, 1000);
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
        if (key == 'b') {
            $scope.annotateNer();
        }
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
