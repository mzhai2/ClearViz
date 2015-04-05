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
            'api/trees/:treeId/annotate',
            { treeId: '@_id'},
            { annotate: {method: 'POST'}}
            );
    }
]);