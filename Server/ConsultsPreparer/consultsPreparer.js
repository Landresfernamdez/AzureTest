var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection.js');
/*
===========================
>  CRUD's de Componentes  <
>   - insert              <
>   - select              <
>   - edit                <
>   - delete              <
===========================
*/
/**
 *    Función de insertar libro en la base de datos
 * @param {Recibe un json con atributos de las tablas} datos 
 * @param {*Recibe una funcion por parametro para devolver el resultado del request a la base de datos} callback 
 */
exports.insertMessages = function insertMessages(datos,callback) {
    var request = new Request('AgregarMessage', function (err) { // nombre de procedimiento en la base de datos
        if (err) {
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la inserción de los datos",
                type: "error"
            })
        }
    });
    request.addParameter('message', TYPES.VarChar, datos.message);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConection.callProcedure(request, function (res) {
        callback(res);
    });
}
/**
 * Retorna todos los libros 
 * @param {Retorna el resultado de la peticion} callback 
 */
exports.selectMessages = function (callback) {
    var query = "SELECT * FROM MessagesAzure";
    var request = new Request(query, function (err) {
        if (err) {
            callback({
                success: false,
                data: err,
                error: request.error,
                title: "Error",
                message: "Error obteniendo los datos. Revise su conexión",
                type: "error"
            });
        }

    });
    sqlConection.executeRequest(request, callback);
}
