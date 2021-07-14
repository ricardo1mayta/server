var db = require("../../config/database");
var dbFunc = require("../../config/db-function");
var ProductoModel = {
    getAllProducto: getAllProducto,
    getAllProductoSede: getAllProductoSede,
    addProducto: addProducto,
    updateProducto: updateProducto,
    deleteProducto: deleteProducto,
    getProductoById: getProductoById,
    addProducto2: addProducto2,
    getAllProducts: getAllProducts,
    getAllProducto2: getAllProducto2,
    addTraslado: addTraslado,
    getTraslados: getTraslados,
    getAllProductosMan: getAllProductosMan,
    getAllProductoActivos: getAllProductoActivos
};

function getAllProducto(id) {
    return new Promise((resolve, reject) => {
        var numPerPage = id.items;
        var page = id.page;
        var skip = page * numPerPage;
        var limit = skip + "," + numPerPage;
        var sql = "SELECT count(*) numRows from productos p left join produtosdetalle dp on dp.idpro=p.id where status>0 and p.sede=" + id.id;
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var numRows = rows1[0].numRows;
                var numPages = Math.ceil(numRows / numPerPage);
                var sql = "SELECT * FROM productos p left join produtosdetalle dp on dp.idpro=p.id left join sudsedes sd on sd.idssede=dp.idsubsede where status>0 AND sede=" + id.id + " and dp.idsubsede= " + id.subsede + " order by categoria asc, descripcion, cantidad desc LIMIT " + limit;
                db.query(sql, (error, rows, fields) => {
                    if (!!error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else {
                        dbFunc.connectionRelease;
                        resolve({
                            data: rows,
                            numPages: numPages,
                            total: numRows
                        });
                    }
                });
            }
        });
    });
}

function getAllProductoActivos(id) {
    return new Promise((resolve, reject) => {
        var numPerPage = id.items;
        var page = id.page;
        var skip = page * numPerPage;
        var limit = skip + "," + numPerPage;
        var sql = "SELECT count(*) numRows from productos p left join produtosdetalle dp on dp.idpro=p.id where status>0 and p.sede=" + id.id;
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var numRows = rows1[0].numRows;
                var numPages = Math.ceil(numRows / numPerPage);
                var sql = "SELECT * FROM productos p left join produtosdetalle dp on dp.idpro=p.id left join sudsedes sd on sd.idssede=dp.idsubsede where status>0 and dp.cantidad>0 AND sede=" + id.id + " and dp.idsubsede= " + id.subsede + " order by categoria asc, descripcion, cantidad desc LIMIT " + limit;
                db.query(sql, (error, rows, fields) => {
                    if (!!error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else {
                        dbFunc.connectionRelease;
                        resolve({
                            data: rows,
                            numPages: numPages,
                            total: numRows
                        });
                    }
                });
            }
        });
    });
}

function getAllProductosMan(id) {
    return new Promise((resolve, reject) => {
        var numPerPage = id.items;
        var page = id.page;
        var skip = page * numPerPage;
        var limit = skip + "," + numPerPage;
        var sql = "SELECT count(*) numRows from productos p left join produtosdetalle dp on dp.idpro=p.id where status>0 and p.sede=" + id.id;
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var numRows = rows1[0].numRows;
                var numPages = Math.ceil(numRows / numPerPage);
                var sql = "SELECT * FROM productos p left join produtosdetalle dp on dp.idpro=p.id left join sudsedes sd on sd.idssede=dp.idsubsede where status>0 AND sede=" + id.id + "  order by categoria asc, descripcion, cantidad desc LIMIT " + limit;
                db.query(sql, (error, rows, fields) => {
                    if (!!error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else {
                        dbFunc.connectionRelease;
                        resolve({
                            data: rows,
                            numPages: numPages,
                            total: numRows
                        });
                    }
                });
            }
        });
    });
}

function getAllProducto2(id) {
    return new Promise((resolve, reject) => {
        var numPerPage = id.items;
        var page = id.page;
        var sql = "SELECT * FROM productos p left join produtosdetalle dp on dp.idpro=p.id  where status>0 AND sede=" + id.id + " and dp.idsubsede= " + id.subsede + " and cantidad>0 order by categoria,descripcion asc";
        db.query(sql, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                resolve(rows);
            }
        });
    });
}

function getAllProducts(id) {
    return new Promise((resolve, reject) => {
        var numPerPage = id.items;
        var page = id.page;
        var skip = page * numPerPage;
        var limit = skip + "," + numPerPage;
        var sql = "SELECT count(*) numRows from productos where status>0 and    statuspublic='AC'";
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var numRows = rows1[0].numRows;
                var numPages = Math.ceil(numRows / numPerPage);
                var sql = "SELECT * FROM productos p left join produtosdetalle dp on dp.idpro=p.id  where status>0 AND   statuspublic='AC' order by cantidad desc LIMIT " + limit;
                db.query(sql, (error, rows, fields) => {
                    if (!!error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else {
                        dbFunc.connectionRelease;
                        resolve({
                            data: rows,
                            numPages: numPages,
                            total: numRows
                        });
                    }
                });
            }
        });
    });
}

function getAllProductoSede(id) {
    return new Promise((resolve, reject) => {
        var sql = "SELECT id, descripcion , categoria, imagen, preciocompra,preciounitario, codigo, sku, medida, tipoafetacion, adddate, idusercreate, editdate, iduserupdate, status, sede, idsubsede subsede FROM productos p left join produtosdetalle dp on dp.idpro=p.id  where status>0 AND sede=" + id.id;
        db.query(sql, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function getProductoById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT id, idorganiza, descripcion, costo, total, jugadasgratis, maximojugadores, status, addDate FROM Producto   where status>0 and id =" + id.id, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function addProducto(Producto) {
    return new Promise((resolve, reject) => {
        db.query("call sp_save_producto('" + Producto.descripcion + "','" + Producto.categoria + "','" + Producto.imagen + "','" + Producto.preciocompra + "','" + Producto.preciounitario + "','" + Producto.codigo + "','" + Producto.sku + "','" + Producto.medida + "','" + Producto.tipoafetacion + "','" + Producto.idusercreate + "','" + Producto.sede + "','" + Producto.subsede + "')", (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function addProducto2(Producto) {
    return new Promise((resolve, reject) => {
        db.query("call sp_save_producto_p('" + Producto.descripcion + "','" + Producto.categoria + "','" + Producto.imagen + "','" + Producto.preciocompra + "','" + Producto.preciounitario + "','" + Producto.codigo + "','" + Producto.sku + "','" + Producto.medida + "','" + Producto.tipoafetacion + "','" + Producto.idusercreate + "','" + Producto.sede + "','" + Producto.descc + "','" + Producto.descl + "','" + Producto.precio1 + "','" + Producto.precio2 + "','" + Producto.precio3 + "','" + Producto.img1 + "','" + Producto.img2 + "','" + Producto.img3 + "','" + Producto.img4 + "','" + Producto.statuspublic + "')", (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function updateProducto(id, Producto) {
    return new Promise((resolve, reject) => {
        db.query("call sp_update_producto_p('" + Producto.descripcion + "','" + Producto.categoria + "','" + Producto.imagen + "','" + Producto.preciocompra + "','" + Producto.preciounitario + "','" + Producto.codigo + "','" + Producto.sku + "','" + Producto.medida + "','" + Producto.tipoafetacion + "','" + Producto.idusercreate + "','" + Producto.sede + "','" + Producto.descc + "','" + Producto.descl + "','" + Producto.precio1 + "','" + Producto.precio2 + "','" + Producto.precio3 + "','" + Producto.img1 + "','" + Producto.img2 + "','" + Producto.img3 + "','" + Producto.img4 + "','" + id.id + "','" + Producto.statuspublic + "','" + Producto.cantidad + "','" + Producto.subsede + "')", (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows[0][0]);
            }
        });
    });
}

function deleteProducto(id) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE productos set status=0 WHERE id='" + id + "'", (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function addTraslado(Pedido) {
    return new Promise((resolve, reject) => {
        var guia = 0;
        if (Pedido.guia === true) {
            guia = 1;
        } else {
            guia = 0;
        }
        db.query(" call sp_save_traslado('" + Pedido.idusuario + "','" + Pedido.sede + "','" + Pedido.subsede + "','" + Pedido.origen + "','" + Pedido.destino + "')", (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var detalle = JSON.parse(JSON.stringify(Pedido.detalle));
                var idPedido = rows[0][0].id;
                for (var i = 0; i < detalle.length; i++) {
                    //console.log("Insert " + i, detalle[i]);
                    db.query("call sp_save_detalle_traslado('" + detalle[i].idPRODUCTO + "','" + detalle[i].txtCANTIDAD_DET + "','" + idPedido + "')", (error, rows, fields) => {
                        if (!!error) {
                            dbFunc.connectionRelease;
                            reject(error);
                        } else {
                            // dbFunc.connectionRelease;
                            // resolve(rows);
                        }
                    });
                }
                dbFunc.connectionRelease;
                resolve({
                    id: idPedido
                });
            }
        });
    });
}

function getTraslados(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT t.id,t.fecha, u.firtsName,u.lastName, s1.nombressede origen, s2.nombressede destino, p.descripcion,td.cantidad FROM traslados t left join user u on u.id=t.iduser left join sudsedes s1 on s1.idssede=t.origen left join sudsedes s2 on s2.idssede=t.destino inner join trasladosdetalle td on td.idtraslado=t.id inner join productos p on p.id=td.idpro WHERE t.sede='" + id + "' limit 150", (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}
module.exports = ProductoModel;