
//Karma's configuration file to control Karma's test execution
module.exports = function(config)
{
  config.set({
    frameworks: ['jasmine'],
    files: [
        'public/components/angular/angular.js',
        'public/components/angular-resource/angular-resource.js',
        'public/components/angular-route/angular-route.js',
        'public/components/angular-mocks/angular-mocks.js',
        'public/application.js',
        'public/*[!lib]*/*.js',
        'public/*[!lib]*/*[!tests]*/*.js',
        'public/*[!lib]*/tests/unit/*.js'
    ],

  reporters: ['progress'],
  browsers: ['PhantomJS','Chrome','Safari'],
  captureTimeout: 60000,
  singleRun: true
});
};