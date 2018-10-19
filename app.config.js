'use strict';

angular.
    module('oitechDemo').
    config(['$locationProvider' ,'$routeProvider', '$httpProvider', 'cfpLoadingBarProvider', '$resourceProvider',
        function config($locationProvider, $routeProvider, $httpProvider, cfpLoadingBarProvider, $resourceProvider) {

            //No spinner when $http is called
            cfpLoadingBarProvider.includeSpinner = false;            

            $locationProvider.hashPrefix('!');

            // Don't strip trailing slashes from calculated URLs
            $resourceProvider.defaults.stripTrailingSlashes = false;        

            // Routing plan
            $routeProvider
                .when('/get-fact/', {
                    template: '<get-fact></get-fact>'
                })
                .otherwise('/get-fact/');

        }
    ])
