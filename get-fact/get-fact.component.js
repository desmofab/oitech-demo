'use strict';

angular.
    module('getFact').
    component('getFact', {
        templateUrl: 'get-fact/get-fact.template.html',
        controller: ['Jwt', GetFactController]});

function GetFactController(Jwt) {

    var self = this;

    //Config md-datatable
    this.selected = [];
    this.promise = [];
    this.clienti = [];
    this.count = 0;
    this.next = "";
    this.previous = "";
    this.query = {
    };







    //Cliente.delete({clienti: this.selected}).then(this.getClienti);




 

//   /* CARICA LISTA CLIENTI con filtro definito in query */
//   this.getClienti = function () {

//     self.promise = Cliente.query(self.query, success).$promise
//         .then(function(result) {
//           console.log(result);
//         }).catch(function(error) {
//           console.log(error);
//         });
//   };

//   //CALLBACK: Clienti caricati con successo
//   function success(clienti) {
//     //console.log(clienti);
//     self.clienti = clienti.results;
//     self.count = clienti.count;
//     self.next = clienti.next;
//     self.previous = clienti.previous;
//   }




//   //FIRST TABLE LOADING
//   this.getClienti();

}
