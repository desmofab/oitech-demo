'use strict';

angular.
    module('api.fact').
    factory('Fact', ['$resource',
        function($resource) {
        return $resource('https://api.chucknorris.io/jokes/random', {category: '@category'}, 
            {
                query: {
                    method: 'GET',
                    isArray: false
                }
            });
        }
    ]);
