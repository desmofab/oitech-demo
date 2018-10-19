'use strict';

angular.
    module('api.jwt').
    factory('Jwt', ['$resource',
        function($resource) {
        return $resource('https://srv01.escgroup.it/appui/v1/token', {}, {
            query: {
            method: 'GET',
            isArray: false
            }
        });
        }
    ]);
