
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
        'public/js/jquery-1.11.2.min.js',
        'public/*[!lib]*/*.js',
        'public/*[!lib]*/*[!tests]*/*.js',
        'public/*[!lib]*/tests/unit/*.js'
    ],
    // preprocessors: {
    //     'public/application.js': ['ng-html2js'],
    //     'public/*[!lib]*/tests/unit/*.js': ['ng-html2js'],
    //     'public/components/angular-resource/angular-resource.js': ['ng-html2js'],
    //     'public/components/angular-route/angular-route.js': ['ng-html2js'],
    //     'public/components/angular-mocks/angular-mocks.js': ['ng-html2js'],
    // },

    reporters: ['progress'],
    browsers: ['PhantomJS'],//,'Chrome','Safari'],
    captureTimeout: 60000,
    singleRun: true
    });
};