var CotizacionesModel = require("../models/cotizaciones.model.js");
var CotizacionesService = {
    getAllCotizaciones: getAllCotizaciones,
    getCotizacionesById: getCotizacionesById,
    addCotizaciones: addCotizaciones,
    deleteCotizaciones: deleteCotizaciones,
    getDetalleCotizacionesById: getDetalleCotizacionesById
};

function addCotizaciones(CotizacionesData) {
    return new Promise((resolve, reject) => {
        CotizacionesModel.addCotizaciones(CotizacionesData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function deleteCotizaciones(id) {
    return new Promise((resolve, reject) => {
        CotizacionesModel.deleteCotizaciones(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllCotizaciones(id) {
    return new Promise((resolve, reject) => {
        CotizacionesModel.getAllCotizacionesSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getCotizacionesById(id) {
    return new Promise((resolve, reject) => {
        CotizacionesModel.getCotizacionesById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getDetalleCotizacionesById(id) {
    return new Promise((resolve, reject) => {
        CotizacionesModel.getDetalleCotizacionesById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}
module.exports = CotizacionesService;