var authenticModel = require("../models/authentic.model");
var authenticService = {
    authentic: authentic,
    signup: signup,
    sigin: sigin,
    getAllProductos: getAllProductos,
    getAllVenta: getAllVenta,
    getdetalleventa: getdetalleventa,
    getsede: getsede,
    addRespuestaSunat: addRespuestaSunat,
};

function authentic(authenticData) {
    return new Promise((resolve, reject) => {
        authenticModel.authentic(authenticData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function signup(signUpData) {
    return new Promise((resolve, reject) => {
        authenticModel.signup(signUpData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function sigin(signUpData) {
    return new Promise((resolve, reject) => {
        authenticModel.sigin(signUpData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllProductos(id) {
    return new Promise((resolve, reject) => {
        authenticModel.getAllProductos(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllVenta() {
    return new Promise((resolve, reject) => {
        authenticModel.getAllVenta().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getdetalleventa(id) {
    return new Promise((resolve, reject) => {
        authenticModel.getdetalleventa(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getsede(id) {
    return new Promise((resolve, reject) => {
        authenticModel.getsede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function addRespuestaSunat(VentaData) {
    return new Promise((resolve, reject) => {
        authenticModel.addRespuestaSunat(VentaData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}
module.exports = authenticService;