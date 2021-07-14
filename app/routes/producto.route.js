const ProductoService = require("../services/producto.service");
var schema = require("../schema/productoValidacionSchema.json");
var iValidator = require("../../common/iValidator");
var errorCode = require("../../common/error-code");
var errorMessage = require("../../common/error-methods");
var mail = require("./../../common/mailer.js");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: '/var/www/html/img'
});

function init(router) {
    router.route("/producto/").post(addProducto);
    router.route("/productosede/:id").get(getAllProductoSede);
    router.route("/producto/:id").get(getProductoById).delete(deleteProducto).put(updateProducto);
    router.route("/productos/:id/:subsede/:page/:items").get(getAllProductos);
    router.route("/productosactivos/:id/:subsede/:page/:items").get(getAllProductoActivos);
    router.route("/productosman/:id/:page/:items").get(getAllProductosMan);
    router.route("/productos2/:id/:subsede/:page/:items").get(getAllProductos2);
    router.route("/products/:page/:items").get(getAllProducts);
    router.route("/upload").post(multipartMiddleware, uploadfile);
    router.route("/producto2").post(addProducto2);
    router.route("/traslados").post(addTraslado);
    router.route("/traslados/:id").get(getTraslados);
}

function uploadfile(req, res) {
    let fil = req.files.uploads[0];
    res.send({
        'message': 'File uploaded succesfully.',
        'path': fil.path
    });
}


function getAllProductoActivos(req, res) {
    let ProductoId = req.params;
    ProductoService.getAllProductoActivos(ProductoId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}
function getAllProductos(req, res) {
    let ProductoId = req.params;
    ProductoService.getAllProducto(ProductoId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getAllProductosMan(req, res) {
    let ProductoId = req.params;
    ProductoService.getAllProductosMan(ProductoId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getTraslados(req, res) {
    let ProductoId = req.params.id;
    ProductoService.getTraslados(ProductoId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getAllProductos2(req, res) {
    let ProductoId = req.params;
    ProductoService.getAllProducto2(ProductoId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getAllProducts(req, res) {
    let ProductoId = req.params;
    ProductoService.getAllProducts(ProductoId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getAllProductoSede(req, res) {
    let ProductoId = req.params;
    ProductoService.getAllProductoSede(ProductoId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getProductoById(req, res) {
    let ProductoId = req.params;
    var json_format = iValidator.json_schema(schema.getSchema, ProductoId, "Producto");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    ProductoService.getProductoById(ProductoId).then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        res.send(err);
    });
}

function addProducto(req, res) {
    var ProductoData = req.body;
    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, ProductoData, "Producto");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    ProductoService.addProducto(ProductoData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function addTraslado(req, res) {
    var ProductoData = req.body;
    //Validating the input entity
    ProductoService.addTraslado(ProductoData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function addProducto2(req, res) {
    var ProductoData = req.body;
    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, ProductoData, "Producto");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    ProductoService.addProducto2(ProductoData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function updateProducto(req, res) {
    var ProductoData = req.body;
    var id = req.params;
    ProductoService.updateProducto(id, ProductoData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function deleteProducto(req, res) {
    var delId = req.params.id;
    ProductoService.deleteProducto(delId).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}
module.exports.init = init;