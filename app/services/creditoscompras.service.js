var PedidoModel = require("../models/creditoscompras.model.js");
var PedidoService = {
    getCreditosComprassede: getCreditosComprassede,
    getAllComprasCreditoSede: getAllComprasCreditoSede,
    pagotodoCredito: pagotodoCredito,
    pagofraccionCredito: pagofraccionCredito,
    getpagofaccionCredito: getpagofaccionCredito
};

function getCreditosComprassede(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.getCreditosComprassede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllComprasCreditoSede(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.getAllComprasCreditoSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function pagotodoCredito(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.pagotodoCredito(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function pagofraccionCredito(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.pagofraccionCredito(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getpagofaccionCredito(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.getpagofaccionCredito(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}
module.exports = PedidoService;