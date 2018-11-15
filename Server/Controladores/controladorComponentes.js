/*
================================================
>  Controlador de los Componentes del sistema  <
================================================
*/
var controlador = require('../Logica/logicaComponentes');

exports.insertMessages= function(rRequest, rResponse){
    controlador.insertMessages(rRequest.body, function(data){
        rResponse.send(data);
    });
};
exports.selectMessages = function(rRequest, rResponse){
    controlador.selectMessages(function(data){
        rResponse.send(data.data);
    });
};



/*exports.realizarMovimiento = function(rRequest, rResponse){
    //console.log(rRequest.body);
    logicaFunciones.validarMovimiento(rRequest.body, function(data){
        //console.log(data)
        rResponse.send(data);
    })
};
exports.login = function(rRequest, rResponse){
    controlador.login(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
exports.validaCorreo = function(rRequest, rResponse){
    controlador.validaCorreo(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
exports.insertarUsuario = function(rRequest, rResponse){
    controlador.insertarUsuario(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};

exports.selectSesionesJuegoDisponibles = function(rRequest, rResponse){
    controlador.seleccionarSesionesJuegoDisponibles(function(data){
        rResponse.send(data.data);
    })
};

exports.insertarSesion = function(rRequest, rResponse){
    controlador.insertarSesion(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
exports.insertarSesion = function(rRequest, rResponse){
    controlador.insertarSesion(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
exports.insertarUsuarioSesion = function(rRequest, rResponse){
    controlador.insertarUsuarioSesion(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
exports.misSesiones = function(rRequest, rResponse){
    controlador.misSesiones(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
exports.detalles = function(rRequest, rResponse){
    controlador.detalles(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
exports.partidaActual = function(rRequest, rResponse){
    controlador.partidaActual(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
exports.selectComponente = function(rRequest, rResponse){
    logicaComponente.seleccionarComponente(function(data){
        rResponse.send(data.data);
    })
};
exports.deleteComponente = function(rRequest, rResponse){
    logicaComponente.eliminarComponente(rRequest.body, function(data){
        rResponse.send(data);
    });
};*/
