angular.module('trees').factory('Trees', ['$resource', function($resource) {
	return $resource (
		'api/trees/:treeId',
		{ treeId: '@_id'},
		{ update: {method: 'PUT'}});
}]);

angular.module('trees').factory('Annotations', ['$resource', function($resource) {
	return $resource (
		'api/trees/:treeId/annotatener',
		{ treeId: '@_id'},
		{ annotate: {method: 'POST'}});
}]);

// directive to render annotation
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
			scope.$watch('isolatedTree', function(isolatedTree) {
				if (isolatedTree) {
					var htmlText = annotationFactory.createAnnotationHtml(isolatedTree);
					element.replaceWith(htmlText);
				}
			}, true);
		}
	};
}]);

angular.module('trees').factory('annotationFactory', function() {
	var factory = {};
	factory.createAnnotationHtml = function(tree) {
		var tree = JSON.parse(tree);
		var out = "<p>";
		d3.tsv.parseRows(tree.data, function(data) {
			if (data[7]) {
				var NERtag = "O";
				if (data[7].length > 3)
					NERtag = data[7];
				// if (previousNERTag != NERtag) {
					// previousNERTag = NERtag;
				if (NERtag === "O" || NERtag.charAt(0) === "I") 
					out+=data[1] + " ";
				else if (NERtag === "U-PER")
					out+='<span class="Person">' + data[1] + "</span>";
				else if (NERtag === "U-ORG") 
					out+='<span class="Organization">' + data[1] + "</span>";
				else if (NERtag === "U-LOC")
					out+='<span class="Location">' + data[1] + "</span>";
				else if (NERtag === "B-PER") 
					out+='<span class="Person">' + data[1] + " ";
				else if (NERtag === "B-ORG")
					out+='<span class="Organization">' + data[1] + " ";
				else if (NERtag === "B-LOC")
					out+='<span class="Location">' + data[1] + " ";
				else if (NERtag.charAt(0) === "L")
					out+=data[1] + "</span> ";
			}
		});
		out+='</p>';
		return out;
	};
	return factory;
});

function removeTag() {
    var range = window.getSelection().getRangeAt(0);
    var node = $(range.commonAncestorContainer);
    if (node.parent().is("span")) {
        node.unwrap();
    }
}