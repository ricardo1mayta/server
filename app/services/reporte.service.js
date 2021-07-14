var PedidoModel = require("../models/reporte.model.js");
var PedidoService = {
    getPedidoSede: getPedidoSede,
    getPedidoUsuarioSede: getPedidoUsuarioSede,
    getPedidoDiaSede: getPedidoDiaSede,
    getPedidoUsuarioDiaSede: getPedidoUsuarioDiaSede,
    getCierredeCajaSede: getCierredeCajaSede,
    gananciasSede: gananciasSede
};

function getPedidoSede(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.getPedidoSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getPedidoUsuarioSede(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.getPedidoUsuarioSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getPedidoDiaSede(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.getPedidoDiaSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getPedidoUsuarioDiaSede(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.getPedidoUsuarioDiaSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getCierredeCajaSede(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.getCierredeCajaSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function gananciasSede(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.gananciasSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}
module.exports = PedidoService;