'use strict';

angular.
    module('getFact').
    component('getFact', {
        templateUrl: 'get-fact/get-fact.template.html',
        controller: ['Jwt', 'Fact', '$mdToast', GetFactController]});

function GetFactController(Jwt, Fact, $mdToast) {

    var self = this;

    //Config md-datatable
    this.selected = [];
    this.promise = [];
    this.properties = [];
    this.count = 0;
    this.next = '';
    this.previous = '';
    this.query = {
        category: ''
    };


    this.getCategoryFromToken = function(token){

        var jwtPayload = token.jwt.split('.')[1];
        var jwtCategory = JSON.parse( atob(jwtPayload) ).category;
        
        return jwtCategory == 'random' ? undefined : jwtCategory;
    }

    
    this.getToken = function(){
        Jwt.query().$promise.then(function(result){

            self.query.category = self.getCategoryFromToken(result);

            // Populate table with new data
            self.showFactInTable();

        })
        .catch(function(error) {
            
            // Reset table
            self.properties = [];

            $mdToast.show(
                $mdToast.simple()
                    .textContent('Errore del server. Ritenta sarai più fortunato')
                    .position('bottom right')
                    .hideDelay(3000)
            );
        });
    }


    this.showFactInTable = function(){

        self.promise = Fact.query(self.query, gotTheFact);
    };

    function gotTheFact(theFact) {
        //console.log(theFact);
        
        var rows = [];
        var category = theFact.category ? theFact.category[0] : 'null';
        
        rows.push({pk: 0, key: 'Category', value: category});
        rows.push({pk: 1, key: 'ID', value: theFact.id});
        rows.push({pk: 2, key: 'Url', value: theFact.url});
        rows.push({pk: 3, key: 'Value', value: theFact.value});

        self.properties = rows;
    }


}
