angular.module('trees').factory('Trees', ['$resource',
    function($resource) {
        return $resource (
            'api/trees/:treeId',
            { treeId: '@_id'},
            { update: {method: 'PUT'}}
            );
    }
    ]);

angular.module('trees').factory('Annotations', ['$resource',
    function($resource) {
        return $resource (
            'api/trees/:treeId/annotatener',
            { treeId: '@_id'},
            { annotate: {method: 'POST'}}
            );
    }
]);


// directive to render annotation
angular.module('trees').directive('Annotation', function() {
    return {
        restrict: 'A',
        transclude: true,
        scope: { content : tree.content }
        template: 
    }
}

angular.module('trees').factory('createAnnotationHtml', ['', function(data){
    var out = "<p>";
    d3.tsv.parseRows(data, function(data) {
        var currentNER = "O";
        for (row : data) {
            var word = data[row];
            if (currentNER != word[5].substring(0,3)) {
                currentNER = word[5].substring(0,3);
                if (currentNER = "O") {
                    out+="</span>";
                }
                if (currentNER = "PER")
                    out+="<span class=\"Person\">";
                if (currentNER = "ORG")
                    out+="<span class=\"Organization\">";
                if (currentNER = "LOC")
                    out+="<span class=\"Location\">";
            }
        }
    });
    return out;
}]);

angular.module('trees').factory('createAnnotationTSV', ['', function(data){
    var out;
    var html = $.parseHTML(data);
    var nodeNames = [];
    $.each(html, function(i, el) {
        nodeNames[i] = el.nodeName;
    });
    for (node : nodeNames) {
        if (nodeName[node] === "#text") {
            // add  as o 
            nodeName[node].innerHTML
        }
        if (nodeName[node] === "span class=\"Person\"") {
            assignBILOU(nodeName[node].innerHTML, "PER")
        }
        if (nodeName[node] === "span class=\"Organization\"") {
        }

    }
}]);

function assignBILOU(html,type) {
    var tags = [];
    // html.split
    var 
    if size == 1
        tags[tags.length] = type.concat("-U")
    if size == 2

}