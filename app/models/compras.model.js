var db = require("../../config/database");
var dbFunc = require("../../config/db-function");
var CompraModel = {
    getAllComprasSede: getAllComprasSede,
    addCompra: addCompra,
    deleteCompra: deleteCompra,
    getCompraById: getCompraById,
    getDetalleCompraById: getDetalleCompraById,
    getProvedoresSede: getProvedoresSede,
    getComprasProductoSede: getComprasProductoSede
};

function getAllComprasSede(id) {
    return new Promise((resolve, reject) => {
        var numPerPage = id.items;
        var page = id.page;
        var skip = page * numPerPage;
        var limit = skip + "," + numPerPage;
        var sql = "SELECT count(*) numRows from compras where  status>0 and sede=" + id.id;
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var numRows = rows1[0].numRows;
                var numPages = Math.ceil(numRows / numPerPage);
                var sql = "SELECT * FROM compras a     where status>0 and sede=" + id.id + " order by id desc LIMIT " + limit;
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

function addCompra(Compra) {
    return new Promise((resolve, reject) => {
        var guia = 0;
        if (Compra.guia === true) {
            guia = 1;
        } else {
            guia = 0;
        }
        db.query(" call sp_save_compra('" + Compra.total_gravadas + "','" + Compra.total_descuento + "','" + Compra.sub_total + "','" + Compra.total_igv + "','" + Compra.total + "','" + Compra.total_letras + "','" + Compra.cod_tipo_documento + "','" + Compra.cod_moneda + "','" + Compra.cliente_numerodocumento + "','" + Compra.cliente_nombre + "','" + Compra.cliente_tipodocumento + "','" + Compra.cliente_direccion + "','" + Compra.cliente_codigoubigeo + "','" + Compra.cliente_pais + "','" + Compra.cliente_ciudad + "','" + Compra.serie_comprobante + "','" + Compra.tipo_proceso + "','" + guia + "','" + Compra.sede + "','" + Compra.idusuario + "','" + Compra.condicionpago + "','" + Compra.observacion + "','1'" + ")", (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var detalle = JSON.parse(JSON.stringify(Compra.detalle));
                var idCompra = rows[0][0].idventa;
                for (var i = 0; i < detalle.length; i++) {
                    // console.log("Insert " + i, detalle[i]);
                    db.query("call sp_save_detallecompra('" + detalle[i].idPRODUCTO + "','" + (i + 1) + "','" + detalle[i].txtUNIDAD_MEDIDA_DET + "','" + detalle[i].txtCANTIDAD_DET + "','" + detalle[i].txtPRECIO_DET + "','" + detalle[i].txtSUB_TOTAL_DET + "','" + detalle[i].txtPRECIO_TIPO_CODIGO + "','" + detalle[i].txtIGV + "','" + detalle[i].txtISC + "','" + detalle[i].txtIMPORTE_DET + "','" + detalle[i].txtCOD_TIPO_OPERACION + "','" + detalle[i].txtCODIGO_DET + "','" + detalle[i].txtDESCRIPCION_DET + "','" + detalle[i].txtPRECIO_SIN_IGV_DET + "','" + idCompra + "','" + Compra.sede + "','" + Compra.idusuario + "')", (error, rows1, fields) => {
                        if (!!error) {
                            dbFunc.connectionRelease;
                            reject(error);
                        } else {
                            dbFunc.connectionRelease;
                            resolve(rows1);
                        }
                    });
                }
                /*
                dbFunc.connectionRelease;
                resolve(rows);*/
            }
        });
    });
}

function getDetalleCompraById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT txtITEM,txtUNIDAD_MEDIDA_DET,txtCANTIDAD_DET,concat(''+txtPRECIO_DET) txtPRECIO_DET, concat(''+txtSUB_TOTAL_DET) txtSUB_TOTAL_DET,txtPRECIO_TIPO_CODIGO, concat(''+txtIGV) txtIGV,txtISC,concat(''+txtIMPORTE_DET) txtIMPORTE_DET ,txtCOD_TIPO_OPERACION,txtCODIGO_DET,txtDESCRIPCION_DET,txtPRECIO_SIN_IGV_DET FROM comprasdetalle where idventa=" + id.id, (error, rows, fields) => {
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

function getCompraById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM compras a  where  a.id=" + id.id, (error, rows, fields) => {
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

function getProvedoresSede(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM provedores a where  a.sede=" + id.id, (error, rows, fields) => {
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

function deleteCompra(id) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE compras set status=0 WHERE  id='" + id + "'", (error, rows, fields) => {
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

function deleteCompraProducto(id) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE compras set status=0 WHERE  id='" + id + "'", (error, rows, fields) => {
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

function getComprasProductoSede(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM compras c inner join comprasdetalle cd on c.id=cd.idventa WHERE fecha_comprobante>='" + id.fini + "' and fecha_comprobante<='" + id.ffin + "' and c.status>0 and c.sede=" + id.id, (error, rows, fields) => {
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
module.exports = CompraModel;