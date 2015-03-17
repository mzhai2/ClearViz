angular.module('trees').factory('Trees', ['$resource',
    function($resource) {
        return $resource (
            'api/trees/:treeId',
            { treeId: '@_id'},
            { update: {method: 'PUT'}}
        );
    }
]);