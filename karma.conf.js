
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


        'public/users/authentication.client.service.js',
        'public/users/users.client.module.js',

        'public/users/tests/unit/authentication.client.service.unit.tests.js',
        'public/users/tests/unit/users.client.module.unit.tests.js',

        'public/trees/trees.client.module.js',
        
        'public/trees/tests/unit/trees.client.controller.unit.tests.js',
        'public/trees/tests/unit/trees.client.module.unit.tests.js',
        'public/trees/tests/unit/trees.client.routes.unit.tests.js',
        'public/trees/tests/unit/trees.client.service.unit.tests.js'

    ],
    // preprocessors: {
    //     'public/application.js': ['ng-html2js'],
    //     'public/*[!lib]*/tests/unit/*.js': ['ng-html2js'],
    //     'public/components/angular-resource/angular-resource.js': ['ng-html2js'],
    //     'public/components/angular-route/angular-route.js': ['ng-html2js'],
    //     'public/components/angular-mocks/angular-mocks.js': ['ng-html2js'],
    // },

    reporters: ['progress'],
    browsers: ['PhantomJS','Chrome','Safari'],
    captureTimeout: 60000,
    singleRun: true
    });
};