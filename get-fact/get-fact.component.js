'use strict';

angular.
  module('getFact').
  component('getFact', {
    templateUrl: 'get-fact/get-fact.template.html',
    //controllerAs: '$listaCliCtrl',
    controller: ['Jwt', GetFactController]});



function GetFactController(Jwt) {

  //AUTH REQUEST
  if(!djangoAuth.authenticated){
    $location.path("/login/");
  }


  var self = this;



  //CONFIG MD-DATATABLE
  this.selected = [];
  this.promise = [];
  this.clienti = [];
  this.count = 0;
  this.next = "";
  this.previous = "";
  this.query = {
    filter: '',
    order: 'nominativo',
    limit: 50,
    page: 1,
    disabled: true
  };
  this.filter = {
    options: {
      debounce: 500
    }
  };







  /* EXCEL EXPORT */
  this.isDownloading = false;

  this.doExcel = function(){

    self.isDownloading = true;

    var excel = angular.copy(self.query);
    excel.limit = self.count;
    excel.page = 1;

    /* CALL REPORT SEARCH ON DB */
    Cliente.query(excel).$promise
        .then(function(report) {
              console.log("EXPORT RESULT", report);

              //REMOVE NULL FROM RESULTSET
              var rows = JSON.parse(JSON.stringify(report.results).replace(/null/g, "\"\""));

              var filename = moment().format('YYYY-MM-DD') + "_Clienti-anagrafica.xlsx";

              // var colStyle = {
              //   column: {11:{t:'n'}}
              // };


              alasql('SELECT pk as ID, codice as Cod_Cliente, nominativo as Cliente, indirizzo as Indirizzo, provincia as Prov, CAP as CAP, ' +
                      'citta as Citta, regione as Regione, nazione as Nazione, CASE WHEN disabilitato THEN "Si" ELSE "" END as Disabilitato ' +
                      'INTO XLSX("' +
                      filename +
                      '",{headers:true}) FROM ?', [rows]);

          }).catch(function(error) {
                console.log("EXPORT ERROR", error);
          }).finally(function(f){
            self.isDownloading = false;
          });
  }








  /* DUPLICATE OBJECT */
  this.duplicateThis = function(){

    //CHIEDE CONFERMA DUPLICAZIONE
    var confirm = $mdDialog.confirm()
          .title('Duplica cliente')
          .textContent('Sicuro di voler duplicare il cliente selezionato?')
          .ariaLabel('Duplica cliente')
          .targetEvent(event)
          .ok('DUPLICA')
          .cancel('ANNULLA');

    $mdDialog.show(confirm).then(function() {

      var clone = angular.copy(self.selected[0]);

      delete clone.pk;
      delete clone.codice;

      console.log("CLONED OBJECT", clone);

      Cliente.add(clone, function(response){

        $mdToast.show(
          $mdToast.simple()
            .textContent("Cliente duplicato correttamente")
            .position('bottom right')
            .hideDelay(3000)
        );

        //REFRESH TABELLA CLIENTI
        self.getClienti();
      },
      function(error){
        $mdToast.show(
          $mdToast.simple()
            .textContent("Impossibile clonare questo utente")
            .position('bottom right')
            .hideDelay(3000)
        );
      })

    }, function() {
      //$scope.status = 'You decided to keep your debt.';
    });

  }




  /* FORM-DIALOG INSERIMENTO MODIFICA */
  this.openFormDialog = function($event){

    var position = $mdPanel.newPanelPosition().absolute().center();

    // var panelAnimation = $mdPanel.newPanelAnimation()
    //     .targetEvent($event)
    //     .defaultAnimation('md-panel-animate-fly')
    //     .closeTo('.show-button');

    var config = {
      locals: {Cliente: Cliente, getClienti: this.getClienti, selectedCli: this.selected},
      controller: 'clientiFormDialogController',
      controllerAs: 'cliCtrl',
      templateUrl:'cliente-lista/clienti-form-dialog.template.html',
      panelClass: 'form-dialog',
      position: position,
      hasBackdrop: true,
      trapFocus: true,
      targetEvent: $event,
      onRemoving: DialogClosed,
      clickOutsideToClose: true,
      escapeToClose: true
      //attachTo: angular.element(document.body),
      //animation: panelAnimation,
      // locals: {
      //   'selected': this.selected,
      //   'desserts': this.desserts
      // },
      // openFrom: ev,

      //fullscreen: true
      //focusOnOpen: true
      // zIndex: 2
    };

    $mdPanel.open(config);

    function DialogClosed(action,a,b,c){

      //console.log(action,a,b,c);
    }
  }











  //RIMUOVE CRITERIO RICERCA
  this.removeFilter = function () {
    this.filter.show = false;
    this.query.filter = '';

    if(this.filter.form.$dirty) {
      this.filter.form.$setPristine();
    }

    this.getClienti();
  };




  //MODIFICA CLIENTE
  this.edit = function(event) {

    this.openFormDialog();
  }




  //CANCELLA CLIENTI
  this.delete = function(event) {

    //Elenco PK di tutti i clienti selezionati
    var pks_clienti = this.selected.map(function(cli){
      return cli.pk;
    });

    //Cliente.delete({clienti: this.selected}).then(this.getClienti);

    //CHIEDE CONFERMA CANCELLAZIONE
    var confirm = $mdDialog.confirm()
          .title('Disabilita clienti')
          .textContent('Sicuro di voler disabilitare i clienti selezionati?')
          .ariaLabel('Disabilita clienti')
          .targetEvent(event)
          .ok('DISABILITA')
          .cancel('ANNULLA');

    $mdDialog.show(confirm).then(function() {


      //ELIMINA CLIENTI SELEZIONATI
      BatchDelete.delete({tablename: 'clienti', pk: pks_clienti}, function(response){

        $mdToast.show(
          $mdToast.simple()
            .textContent('Dati disabilitati correttamete')
            .position('bottom right')
            .hideDelay(3000)
        );

        //REFRESH TABELLA CLIENTI
        self.getClienti();
      },
      function(error){

        $mdToast.show(
          $mdToast.simple()
            .textContent('ERRORE - Impossibile disabilitare i dati')
            .position('bottom right')
            .hideDelay(3000)
        );

      }).$promise
          .then(function(result) {
            console.log(result);
          }).catch(function(error) {
            console.log(error);
          });




    }, function() {
      //$scope.status = 'You decided to keep your debt.';
    });

    this.selected = [];
  };



  /* CARICA LISTA CLIENTI con filtro definito in query */
  this.getClienti = function () {

    self.promise = Cliente.query(self.query, success).$promise
        .then(function(result) {
          console.log(result);
        }).catch(function(error) {
          console.log(error);
        });
  };

  //CALLBACK: Clienti caricati con successo
  function success(clienti) {
    //console.log(clienti);
    self.clienti = clienti.results;
    self.count = clienti.count;
    self.next = clienti.next;
    self.previous = clienti.previous;
  }




  //FIRST TABLE LOADING
  this.getClienti();

}
