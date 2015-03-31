describe('Trees E2E Tests:', function() {
 describe('New Tree Page', function() {
 it('Should not be able to create a new tree', function() {
 browser.get('http://localhost:3000/#!/trees/create');
 element(by.css('input[type=submit]')).click();
 element(by.binding('error')).getText().then(function(errorText)
{
 expect(errorText).toBe('User is not logged in');
 });
 });
 });
});
