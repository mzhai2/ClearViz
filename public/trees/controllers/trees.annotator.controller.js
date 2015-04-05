angular.module('trees').controller('AnnotatorController', ['$scope', function($scope) {
    $scope.filterOptions = {
        filters: [
        {
            label: 'Quote',
            property: 'quote'
        },
        ]
    }
}]);
