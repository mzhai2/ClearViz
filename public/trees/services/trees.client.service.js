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
		link: function(scope, element) {
			// var currentElement = element;
   //          scope.$watch('isolatedTree', function (newValue, oldValue) {
   //              if (newValue && newValue != oldValue) {
			// 		var html = annotationFactory.createAnnotationHtml(newValue);
   //                  var replacementElement = angular.element(html);
   //                  currentElement.replaceWith(replacementElement);
   //                  currentElement = replacementElement;
   //              }
   //          }, true);

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
		var previousNERTag = "";
		d3.tsv.parseRows(tree.data, function(data) {
			if (data[7]) {
				var NERtag = "O";
				if (data[7].length > 3)
					NERtag = data[7].substr(data[7].length-3);
				if (previousNERTag != NERtag) {
					previousNERTag = NERtag;
					if (NERtag === "O")
						out+="</span>";
					if (NERtag === "PER") 
						out+='<span class="Person">';
					if (NERtag === "ORG")
						out+='<span class="Organization">';
					if (NERtag === "LOC")
						out+='<span class="Location">';
				}
				out+=data[1] + " ";
				
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
    console.log(node.parent());
        if (node.parent().is("span")) {
        node.unwrap();
    }
}
// angular.module('trees').factory('createAnnotationTSV', function(data){
//     var out;
//     var html = $.parseHTML(data);
//     var nodeNames = [];
//     $.each(html, function(i, el) {
//         nodeNames[i] = el.nodeName;
//     });
//     for (node : nodeNames) {
//         if (nodeName[node] === "#text") {
//             // add  as o 
//             nodeName[node].innerHTML
//         }
//         if (nodeName[node] === "span class=\"Person\"") {
//             assignBILOU(nodeName[node].innerHTML, "PER")
//         }
//         if (nodeName[node] === "span class=\"Organization\"") {
//         }

//     }
// }]);

// function assignBILOU(html,type) {
//     var tags = [];
//     // html.split
//     var 
//     if size == 1
//         var prefix = "U-";
// 
// }