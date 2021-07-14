var CompraModel = require("../models/compras.model.js");
var CompraService = {
    getAllCompra: getAllCompra,
    getCompraById: getCompraById,
    addCompra: addCompra,
    deleteCompra: deleteCompra,
    getDetalleCompraById: getDetalleCompraById,
    getProvedoresSede: getProvedoresSede,
    getComprasProductoSede: getComprasProductoSede
};

function addCompra(CompraData) {
    return new Promise((resolve, reject) => {
        CompraModel.addCompra(CompraData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function deleteCompra(id) {
    return new Promise((resolve, reject) => {
        CompraModel.deleteCompra(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllCompra(id) {
    return new Promise((resolve, reject) => {
        CompraModel.getAllComprasSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getCompraById(id) {
    return new Promise((resolve, reject) => {
        CompraModel.getCompraById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getProvedoresSede(id) {
    return new Promise((resolve, reject) => {
        CompraModel.getProvedoresSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getDetalleCompraById(id) {
    return new Promise((resolve, reject) => {
        CompraModel.getDetalleCompraById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getComprasProductoSede(id) {
    return new Promise((resolve, reject) => {
        CompraModel.getComprasProductoSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}
module.exports = CompraService;