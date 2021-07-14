var ProductoModel = require("../models/producto.model.js");
var ProductoService = {
    getAllProducto: getAllProducto,
    getProductoById: getProductoById,
    getAllProductoSede: getAllProductoSede,
    addProducto: addProducto,
    updateProducto: updateProducto,
    deleteProducto: deleteProducto,
    addProducto2: addProducto2,
    getAllProducts: getAllProducts,
    getAllProducto2: getAllProducto2,
    addTraslado: addTraslado,
    getTraslados: getTraslados,
    getAllProductosMan: getAllProductosMan,
    getAllProductoActivos: getAllProductoActivos
};

function addProducto(ProductoData) {
    return new Promise((resolve, reject) => {
        ProductoModel.addProducto(ProductoData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function addProducto2(ProductoData) {
    return new Promise((resolve, reject) => {
        ProductoModel.addProducto2(ProductoData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function addTraslado(ProductoData) {
    return new Promise((resolve, reject) => {
        ProductoModel.addTraslado(ProductoData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function updateProducto(id, ProductoData, callback) {
    return new Promise((resolve, reject) => {
        ProductoModel.updateProducto(id, ProductoData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function deleteProducto(id) {
    return new Promise((resolve, reject) => {
        ProductoModel.deleteProducto(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllProducto(id) {
    return new Promise((resolve, reject) => {
        ProductoModel.getAllProducto(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}


function getAllProductoActivos(id) {
    return new Promise((resolve, reject) => {
        ProductoModel.getAllProductoActivos(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllProductosMan(id) {
    return new Promise((resolve, reject) => {
        ProductoModel.getAllProductosMan(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllProducto2(id) {
    return new Promise((resolve, reject) => {
        ProductoModel.getAllProducto2(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllProducts(id) {
    return new Promise((resolve, reject) => {
        ProductoModel.getAllProducts2(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllProductoSede(id) {
    return new Promise((resolve, reject) => {
        ProductoModel.getAllProductoSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getProductoById(id) {
    return new Promise((resolve, reject) => {
        ProductoModel.getProductoById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getTraslados(id) {
    return new Promise((resolve, reject) => {
        ProductoModel.getTraslados(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}
module.exports = ProductoService;