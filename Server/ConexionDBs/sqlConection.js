var Connection = require('tedious').Connection; // libreria necesaria para conectar con SQL Server
/*
=====================================================================
>   Configuraciones de conección a la base de datos sql server.     <
>   Cambiar esto por la configuraciones del servidor en producción  <
=====================================================================
*/
var config = 
   {
     userName: 'ServerAdmin', // update me
     password: 'Server123', // update me
     server: 'soserver2018.database.windows.net', // update me
     options: 
        {
           database: 'SistemasOperativosDB2018' //update me
           , encrypt: true
        }
   }
//Código de error
var SIN_CONEXION = 1;

//Crea la conección, si todo sale bien no tira el mensaje de error en la consola.
var connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.log(err);
    }
});

/**
 * Ejecuta un query en la base de datos SQL Server.
 *
 * @param {fuest} request
 * @param {function} callback
 */
exports.executeRequest = function executeRequest(request, callback) {
    'use strict';
    var res = [],
        connection = new Connection(config);

    connection.on('connect', function(err) {
        if (err) {
            callback({
                success: false,
                data: err.message,
                error: SIN_CONEXION,
            });
            return;
        }
        
        request.on('row', function(columns) { // si devuelve datos llena res[]
            var row = {};
            columns.forEach(function(column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    row[column.metadata.colName] = column.value;
                }
            });
            res.push(row);
        });

        request.on('returnValue', function(parameterName, value, metadata) {
            connection.close();
            console.log(res);
            if (parameterName === 'success' && (value === 1 || value === true)) {
                console.log(res);
                callback({
                    success: true,
                    data: res,
                    error: 200
                });
            } else {
                callback({
                    success: false,
                    data: [],
                    error: 400
                });
            };
        });

        /**
         * estos dos tipos de evento done se usan ya que hay ocaciones en la que se captura el evento doneProc o el done luego de ejecutar una consulta
         */        
        request.on('done', function (rowCount, more, rows) { // si el tipo de exito es done llena callback
            console.log(res);
            callback({
                success: true,
                data: res,
                error: 200
            }); 
        });

        request.on('doneProc', function (rowCount, more, rows) { // si el tipo de exito es doneProc llena callback
            console.log(res);
            callback({
                success: true,
                data: res,
                error: 200
            }); 
        });
        connection.execSql(request);
    });
};

/**
 * Ejecuta un procedimiento almacenado en la base de datos SQL Server.
 *
 * @param {Request} request
 * @param {function} callback
 */
exports.callProcedure = function callProcedure(request, callback) {
    try {
        'use strict';
        var res = [],
        connection = new Connection(config);
    
        connection.on('connect', function(err) {
            if (err) {
                callback({
                    success: false,
                    data: err.message,
                    error: SIN_CONEXION
                });
            }
            /**
             * llena la lista res de objetos tipo JSON con los datos retornados de la base de datos
             */
            request.on('row', function(columns) {
                var row = {};
                columns.forEach(function(column) {
                    if (column.value === null) {
                        console.log('NULL recibido');
                    } else {
                        if (column.metadata.colName.length === 0)
                            row["success"] = column.value;
                        else
                            row[column.metadata.colName] = column.value;
                    }
                });
                res.push(row);
            });
            /**
             * evento que captura la respuesta de lo ocurrido en la base de datos
             */
            request.on('returnValue', function(parameterName, value, metadata) {
                connection.close();
                console.log(res);
                if (parameterName === 'success' && (value === 1 || value === true)) {
                    callback({
                        success: true,
                        data: res,
                        error:200
                    });
                } else {
                    callback({
                        success: false,
                        data: [],
                        error:400
                    });
                };
            });
            connection.callProcedure(request);
        });
    } catch (error) {
        console.log(error);
    }    
};