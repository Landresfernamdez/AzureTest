/*
=================================================
=   Autor: Eliomar Antonio Rodríguez Arguedas   =
=                                               =
=   Web Service para el proyecto OthelloTEC     =
=   Ingeniería en Computación                   =
=   TEC San Carlos                              =
=================================================

===============================================================
>  Archivos donde estan los controladores en el servidor.     <
===============================================================
*/
var componenteCtrl = require('./Controladores/controladorComponentes'); // controlador de Componentes
/*
===============================================================================
>  Configuraciones principales del servidor, con esto escucha las peticiones  <
===============================================================================
*/
var bodyParser = require('body-parser');
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    port = 8080;
const azure = require('azure-storage');
const config = require('./config');    
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/',function(error,response) {
    response.sendFile(path.resolve(__dirname + '/index.html'));
  })

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
===========================================
>  Inicio de las direcciones (Endpoints)  <
===========================================

/** tipos de consulta, implementar!
 * post insert
 * get  select
 * put  edit
 * delete   delete
 */
/*
==================================
>  EndPoints de los Componentes  < // bien todos
==================================
*/
app.post('/insertMessage',componenteCtrl.insertMessages);
app.get('/selectMessages', componenteCtrl.selectMessages);
app.get('/',function(error,response) {
    response.sendFile(path.resolve(__dirname + '/index.html'));
  })
app.get('/start',function() {startRequests();})
app.get('/stop',function() {stopRequests();})  
app.get('/getAllmessages',function(){getAllMessages();})
  const queueService = azure.createQueueIfNotExists(config.azureStorageAccount, config.azureStorageAccessKey);
  let run;
  function startRequests(){
    console.log("Entro a prueba");
    run = setInterval(() => {
      const message = Math.floor((Math.random() * 10) + 1);
  
      queueService.peekMessages('myqueue', function(error, results, response){
        if(!error){
          // Message text is in results[0].messageText
          console.log("Mensaje recibido", results[0].messageText)
        }
      });
  
      queueService.createMessage(config.queueName, JSON.stringify(message), (err, result, res) => {
        if (err) {
          console.error(`[Queue - Sender] An error occurred: ${JSON.stringify(err)}`);
        }else{

        }
        //console.log(`[Queue - Sender] Sent: ${JSON.stringify(message)}`);
      });
      //getMessages();
    }, 500);
  }
  function stopRequests(){
    clearInterval(run);
  }
  function getAllMessages(){
    queueService.getMessages('myqueue', function(error, getResults, getResponse){
      if(!error){
        // Got the message
        var message = getResults[0];
       // console.log(message);
      }
    });
    queueService.getQueueMetadata('myqueue', function(error, results, response){
        if(!error){
          // Queue length is available in results.approximateMessageCount
        }
      });
  }
/*
======================================================================================
>  Pone el servidor en escucha de peticiones, lo levanta en el puerto especificado.  <
======================================================================================
*/
server.listen(port, function(){
    console.log('Servidor escuchando en el puerto: ' + port);
});