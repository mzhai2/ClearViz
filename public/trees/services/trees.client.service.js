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

// angular.module('trees').directive('Content', function() {
//     return {
//         restrict: 'A',
//         transclude: true,
//         scope: { content : tree.content }
//         template
//     }
// }