'use strict';

angular.
  module('api.jwt').
  factory('Jwt', ['$resource', 'API_SERVER',
    function($resource, API_SERVER) {
      return $resource(API_SERVER+'/api/clienti/:pk/', {format: 'json'}, {
        query: {
          method: 'GET',
          isArray: false
        },
        add: {method: 'POST'},
        mod: {method: 'PUT',
              params: {pk: '@pk'}
             }
      });
    }
  ]);
