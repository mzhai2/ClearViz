describe('Testing Trees Controller', function() {
 var _scope, TreesController;
 beforeEach(function() {
 module('mean');
 jasmine.addMatchers({
 toEqualData: function(util, customEqualityTesters) {
 return {
 compare: function(actual, expected) {
 return {
 pass: angular.equals(actual, expected)
 };
 }
 };
 }
 });
 inject(function($rootScope, $controller) {
 _scope = $rootScope.$new();
 TreesController = $controller('TreesController', {
 $scope: _scope
 });
 });
 });
 it('Should have a find method that uses $resource to retrieve a
list of trees', inject(function(Trees) {
 inject(function($httpBackend) {
 var sampleArticle = new Trees({
 title: 'An Article about MEAN',
 content: 'MEAN rocks!'
 });
 var sampleTrees = [sampleArticle];
 $httpBackend.expectGET('api/trees').respond(sampleTrees);
 _scope.find();
 $httpBackend.flush();
 expect(_scope.trees).toEqualData(sampleTrees);
 });
 }));
 it('Should have a findOne method that uses $resource to retreive a
single of article', inject(function(Trees) {
 inject(function($httpBackend, $routeParams) {
 var sampleArticle = new Trees({
 title: 'An Article about MEAN',
 content: 'MEAN rocks!'
 });
 $routeParams.articleId = 'abcdef123456789012345678';
 $httpBackend.expectGET(/api\/trees\/([0-9a-fAF]{24})$/).respond(sampleArticle);
 _scope.findOne();
 $httpBackend.flush();
 expect(_scope.article).toEqualData(sampleArticle);
 });
 }));
});