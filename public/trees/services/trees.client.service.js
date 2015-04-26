angular.module('trees').factory('Trees', ['$resource', function($resource) {
	return $resource (
		'api/trees/:treeId/',
		{ treeId: '@_id'},
		{ update: {method: 'PUT'}});
}]);

angular.module('trees').factory('Annotations', ['$resource', function($resource) {
	return $resource (
		'api/trees/:treeId/annotatener',
		{ treeId: '@_id'},
		{ annotate: {method: 'POST'}});
}]);

angular.module('trees').factory('saveAnnotations', ['$resource', function($resource) {
    return $resource (
        'api/trees/:treeId/saveAnnotation',
        { treeId: '@_id'},
        { saveAnnotation: {method: 'PUT'}});
}]);

angular.module('trees').directive('annotationDisplay', ['annotationFactory', '$timeout', function(annotationFactory, $timeout) {
	return {
		restrict: 'EA',
		scope: {
			isolatedTree: '@tree',
		},
		transclude: true,
		controller: function($scope, $element) {
			$scope.$watch('isolatedTree', function (newValue, oldValue) {
                if (newValue && newValue != oldValue) {
					var htmlText = annotationFactory.createAnnotationHtml(newValue);
                    var replacementElement = angular.element(htmlText);
                    $element.replaceWith(replacementElement);
                    $element = replacementElement;
                }
            });
		},
		link: function(scope, element) {
			if (scope.isolatedTree) {
				var htmlText = annotationFactory.createAnnotationHtml(isolatedTree);
				element.replaceWith(htmlText);
			}
		}
	};
}]);

angular.module('trees').factory('annotationFactory', function() {
	var factory = {};
    factory.parseAnnotations = function(tree) {
        function getNext(treeData) {
            getNext.count = ++getNext.count || 0;
            if (treeData[getNext.count][0] === "NEWSENTENCE")
                getNext.count++;
            return getNext.count;
        }
        var div = document.getElementById('annotation');
        var childNodes = div.childNodes[1].childNodes;
        var data = tree.data;
        var treeData = [];
        d3.tsv.parseRows(data, function(data) {
            if(data[0])
                treeData[treeData.length] = data;
            else {
                treeData[treeData.length] = ["NEWSENTENCE"];
            }
        });
        var i,k;
        var words, word;
        for (i=0; i < childNodes.length; i++) {
            var node = childNodes[i];
            if (node.nodeType == 3) {
                words = node.nodeValue.split(" ").clean("");
                for (k=0; k<words.length; k++) {
                    if (words[k]) {
                        treeData[getNext(treeData)][9] = "O";
                    }
                }
            }
            if (node.nodeType == 1) {
                var name = node.className;
                words = node.innerHTML.split(" ").clean("");
                if (words.length == 1)
                    treeData[getNext(treeData)][9] = "U-" + name;
                else {
                    treeData[getNext(treeData)][9] = "B-" + name;
                    for (k=1; k<words.length-1; k++) {
                        treeData[getNext(treeData)][9] = "I-" + name;
                    }
                    treeData[getNext(treeData)][9] = "L-" + name;
                }
            }
        }
        var tsv = "";
        for (i=0;i<treeData.length;i++) {
            if (treeData[i][0] === "NEWSENTENCE")
                tsv+="\n";
            else {
                tsv+=treeData[i][0]+"\t"+treeData[i][1]+"\t"+treeData[i][2]+"\t"+treeData[i][3]+"\t"+treeData[i][4]+"\t"+treeData[i][5]+"\t"+treeData[i][6]+"\t"+treeData[i][7]+"\t"+treeData[i][8]+"\t"+treeData[i][9]+"\n";
            }
        }
        getNext.count = 0;
        return tsv;
    };
	factory.createAnnotationHtml = function(tree) {
		var tree = JSON.parse(tree);
        console.log(tree)
		var out = "<p>";
        tsv = parseTSV(tree.data);
        console.log(tsv)
        for(var i in tsv) {
            data = tsv[i];
			if (data[9]) {
				var NERtag = data[9];
                
				if (NERtag === 'O' || NERtag.charAt(0) === 'I')
                {
					out+=' ' + data[1] + ' ';
                }

				else if (NERtag.charAt(0) === 'U')
                {
					out+=' <span class="' + NERtag.substring(2) + '">' + data[1] + '</span> ';
                }
                else if (NERtag.charAt(0) === 'B')
                {
					out+=' <span class="'+ NERtag.substring(2) +'">' + data[1] + ' ';
                }
                else if (NERtag.charAt(0) === 'L')
                {
					out+=data[1] + '</span> ';
                }
			}
		}
		out+='</p>';
		return out;
	};
	return factory;
});

angular.module('trees').directive('keypressEvents', function($document, $rootScope) {
    return {
        restrict: 'A',
        link: function () {
            $document.bind('keypress', function (e) {
                $rootScope.$broadcast('keypress', e, String.fromCharCode(e.which));
            });
        }
    };
});

Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {         
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};
function parseTSV(tree) {
    var line, lines = tree.split('\n').clean("");
    var element, elements;
    var data = [];
    for (line in lines)
    {
        if (typeof(lines[line]) === 'string')
        {
            elements = lines[line].split('\t').clean("");
            data.push(elements);
        }
    }
    return data;
}

function removeTag() {
    var range = window.getSelection().getRangeAt(0);
    var node = $(range.commonAncestorContainer);
    if (node.parent().is("span")) {
        node.unwrap();
    }
}