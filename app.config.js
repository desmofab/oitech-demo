'use strict';

angular.
    module('oitechDemo').
    config(['$locationProvider' ,'$routeProvider', 'cfpLoadingBarProvider', '$resourceProvider',
        function config($locationProvider, $routeProvider, cfpLoadingBarProvider, $resourceProvider) {

        //NO SPINNER WHEN $http IS CALLED
        cfpLoadingBarProvider.includeSpinner = false;            

        $locationProvider.hashPrefix('!');

        // Don't strip trailing slashes from calculated URLs
        $resourceProvider.defaults.stripTrailingSlashes = false;        

        $routeProvider
            .when('/get-fact/', {
                title: 'Get Fact',
                template: '<get-fact></get-fact>',
                controller: ['djangoAuth', '$location', function(djangoAuth, $location){
                    if(!djangoAuth.authenticated){
                    $location.path("/login/");
                    }
                }],
                resolve: {
                    authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                    }],
                }
            })
            .otherwise('/get-fact/');
        }
    ])
