/*
===============================================================================================
>  BackEnd de Componentes, se encarga de realizar las llamadas necesarias a la base de datos  <
===============================================================================================
*/

var consultsPreparer = require('../ConsultsPreparer/consultsPreparer');
exports.insertMessages= function(datos, callback){
    consultsPreparer.insertMessages(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Se inserto con exito",
                message: "Se inserto en la base de datos con exito",
                data: response.data,
                type: "success"
            })
        } else{
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};
exports.selectMessages = function(datos, callback) {
    consultsPreparer.selectMessages(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success){
            callback({
                success: true,
                title: "Se obtuvo el ultimo con exito",
                message: "Se obtuvo el ultimo elemento con exito",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};
/*
// inserta componentes
exports.login = function(datos, callback) {
    consultsPreparerPartida.login(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "El usuario existe",
                message: "El usuario existe en la base de datos",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};
exports.validaCorreo = function(datos, callback){
    consultsPreparerPartida.validaCorreo(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "El usuario existe",
                message: "El usuario existe en la base de datos",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};
exports.insertarUsuario = function(datos, callback) {
    consultsPreparerPartida.insertarUsuario(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Se inserto con exito",
                message: "Se inserto en la base de datos con exito",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

exports.insertarSesion = function(datos, callback) {
    consultsPreparerPartida.insertarSesion(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Se inserto con exito",
                message: "Se inserto en la base de datos con exito",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};
exports.insertarUsuarioSesion = function(datos, callback) {
    consultsPreparerPartida.insertarUsuarioSesion(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Se inserto con exito",
                message: "Se inserto en la base de datos con exito",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

exports.misSesiones = function(datos, callback) {
    consultsPreparerPartida.misSesiones(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Se inserto con exito",
                message: "Se inserto en la base de datos con exito",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

exports.detalles = function(datos, callback) {
    consultsPreparerPartida.detalles(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Se recuperaron las partidas con exito",
                message: "Se recuperaron las partidas con exito",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};
exports.partidaActual = function(datos, callback) {
    consultsPreparerPartida.partidaActual(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Se recupero la partida con exito",
                message: "Se recupero la partida con exito",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};
exports.seleccionarSesionesJuegoDisponibles = function(callback) {
    consultsPreparerPartida.selectSesionesJuegoDisponibles( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se pudo seleccionar las sesiones de juego";
            callback({
                success: true,
                data: response.data,
                error: response.error
            })
        } else {
            callback({
                success: false,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

// seleccionar componentes
exports.seleccionarComponente = function(callback) {
    consultsPreparerPartida.selectComponente( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se pudo seleccionar los componentes";
            callback({
                success: true,
                data: response.data,
                error: response.error
            })
        } else {
            callback({
                success: false,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

//inserta movimiento
exports.insertMovimiento = function(datos, callback) {
    consultsPreparerPartida.insertMovimiento(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se pudo modificar el componente";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Componente editado",
                message: "Componente editado con exito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

// eliminar componentes
exports.eliminarComponente = function(datos, callback) {
    consultsPreparerPartida.deleteComponente(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar el componente";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Componente eliminado",
                message: "Componente eliminado con éxito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                error: response.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
};*/