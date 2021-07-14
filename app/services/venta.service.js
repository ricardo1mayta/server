var VentaModel = require("../models/venta.model.js");
var VentaService = {
    getAllVenta: getAllVenta,
    getVentaById: getVentaById,
    addVenta: addVenta,
    updateGuia: updateGuia,
    deleteVenta: deleteVenta,
    getDetalleVentaById: getDetalleVentaById,
    addRespuestaSunat: addRespuestaSunat,
    getDepartamentos: getDepartamentos,
    getProvincias: getProvincias,
    getDistritos: getDistritos,
    getGuiaRemision: getGuiaRemision,
    addSerie: addSerie,
    getSeriesGuiaById: getSeriesGuiaById,
    updateVenta: updateVenta,
    getAllVentSedeResumen: getAllVentSedeResumen,
    getNotaCreditoId: getNotaCreditoId,
    getDetalleNotaCreditoById: getDetalleNotaCreditoById,
};

function addVenta(VentaData) {
    return new Promise((resolve, reject) => {
        VentaModel.addVenta(VentaData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function updateVenta(id, VentaData) {
    return new Promise((resolve, reject) => {
        VentaModel.updateVenta(id, VentaData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function updateGuia(VentaData) {
    return new Promise((resolve, reject) => {
        VentaModel.updateGuia(VentaData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function addRespuestaSunat(VentaData) {
    return new Promise((resolve, reject) => {
        VentaModel.addRespuestaSunat(VentaData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function updateGuia(id, VentaData, callback) {
    return new Promise((resolve, reject) => {
        VentaModel.updateGuia(id, VentaData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function deleteVenta(id) {
    return new Promise((resolve, reject) => {
        VentaModel.deleteVenta(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllVenta(id) {
    return new Promise((resolve, reject) => {
        VentaModel.getAllVentSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllVentSedeResumen(id) {
    return new Promise((resolve, reject) => {
        VentaModel.getAllVentSedeResumen(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getVentaById(id) {
    return new Promise((resolve, reject) => {
        VentaModel.getVentaById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getNotaCreditoId(id) {
    return new Promise((resolve, reject) => {
        VentaModel.getNotaCreditoId(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getSeriesGuiaById(id) {
    return new Promise((resolve, reject) => {
        VentaModel.getSeriesGuiaById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getDepartamentos() {
    return new Promise((resolve, reject) => {
        VentaModel.getDepartamentos().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getProvincias(id) {
    return new Promise((resolve, reject) => {
        VentaModel.getProvincias(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getDistritos(id) {
    return new Promise((resolve, reject) => {
        VentaModel.getDistritos(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getGuiaRemision(id) {
    return new Promise((resolve, reject) => {
        VentaModel.getGuiaRemision(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getDetalleVentaById(id) {
    return new Promise((resolve, reject) => {
        VentaModel.getDetalleVentaById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getDetalleNotaCreditoById(id) {
    return new Promise((resolve, reject) => {
        VentaModel.getDetalleNotaCreditoById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function addSerie(VentaData, callback) {
    return new Promise((resolve, reject) => {
        VentaModel.addSerie(VentaData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}
module.exports = VentaService;