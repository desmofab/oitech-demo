# oitech-demo
AngularJS demo

Il candidato dovrà realizzare un'applicazione front-end AngularJS il cui scopo è quello di visualizzare le
informazioni ottenute dalle API chucknorris.io, un set di endpoint JSON pubblicati online e relativi ai noti
"Chuck Norris facts".
Nello specifico si richiede:
1. la realizzazione di una pagina contenente un pulsante "GET FACT!";
2. al click del pulsante si dovrà effettuare in primis una chiamata al servizio:
[GET] https://srv01.escgroup.it/appui/v1/token
il quale restituirà un token di tipo JWT all'interno del quale (sezione payload) sarà presente un claim
custom "category" contenente un valore in formato String;
3. in base al contenuto del claim "category" è richiesta l’implementazione di comportamenti differenti:
• 'random': visualizzare sotto il pulsante "GET FACT!" una griglia (2x4) nella quale si
mostreranno gli attributi "category", id", "url", "value" (utilizzando il nome dell’attributo
JSON come key, prima colonna, ed il suo valore come value, seconda colonna) del JSON
ottenuto dalla chiamata al servizio:
[GET] https://api.chucknorris.io/jokes/random
• 'category' (una delle categorie possibili): IDEM come sopra ma basandosi sulla response
ottenuta invocando il servizio:
[GET] https://api.chucknorris.io/jokes/random?category=category
• nel caso in cui invece la chiamata al servizio:
[GET] https://srv01.escgroup.it/appui/v1/token
restituisca uno Status di errore, si proceda alla sua notifica, con modalità a scelta del
candidato.
4. ad ogni pressione del pulsante "GET FACT!", si dovrà eseguire una nuova chiamata ed aggiornare la
pagina a seconda del nuovo set di dati ottenuti;
5. una volta terminato il progetto, eseguire il push dei sorgenti su di un repository Git, aggiungendovi
le istruzioni necessarie per testare l'applicazione in locale.
NOTE:
Non si richiedono vincoli particolari per quanto riguarda il framework UI da utilizzare. Il candidato sarà libero
di implementare quello che ritiene più opportuno, a sua discrezione. Si richiede preferibilmente di utilizzare
un qualsiasi package manager per quanto riguarda la struttura e la gestione delle librerie esterne del
progetto.
Al completamento, fornire le credenziali di accesso al repository contenente i sorgenti in modo da poter
effettuare le verifiche.
APPENDICE:
a) esempio di response JSON del servizio [GET] Https://srv01.escgroup.it/appui/v1/token:
{
"jwt": "xxxx.yyyy.zzzz"
}
b) esempio di response JSON dei servizi presi in esame dal test [GET] https://api.chucknorris.io/jokes/xxxx:
{
"category": null|Object,
"icon_url": "https://xxxx",
"id": "yyyy",
"url": "https://yyyy",
"value": "sssss"
}
c) il servizio [GET] https://srv01.escgroup.it/appui/v1/token genera un JWT il cui claim “category” è
popolato in maniera random ad ogni chiamata (a netto di incidenze casuali). Oltre a questo è stato
sviluppato per rispondere sistematicamente con un error 500 circa il 20% delle volte che viene invocato.