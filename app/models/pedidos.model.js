var db = require("../../config/database");
var dbFunc = require("../../config/db-function");
var PedidoModel = {
    getAllPedidosSede: getAllPedidosSede,
    addPedido: addPedido,
    deletePedido: deletePedido,
    getPedidoById: getPedidoById,
    getDetallePedidoById: getDetallePedidoById,
    getClientessede: getClientessede,
    getPedidosProductoSede: getPedidosProductoSede
};

function getAllPedidosSede(id) {
    return new Promise((resolve, reject) => {
        var numPerPage = id.items;
        var page = id.page;
        var skip = page * numPerPage;
        var limit = skip + "," + numPerPage;
        var sql = "SELECT count(*) numRows from pedidos where  status>0 and sede=" + id.id;
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var numRows = rows1[0].numRows;
                var numPages = Math.ceil(numRows / numPerPage);
                var sql = "SELECT * FROM pedidos a     where status>0 and sede=" + id.id + " order by id desc LIMIT " + limit;
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

function addPedido(Pedido) {
    return new Promise((resolve, reject) => {
        var guia = 0;
        if (Pedido.guia === true) {
            guia = 1;
        } else {
            guia = 0;
        }
        db.query(" call sp_save_pedido('" + Pedido.total_gravadas + "','" + Pedido.total_descuento + "','" + Pedido.sub_total + "','" + Pedido.total_igv + "','" + Pedido.total + "','" + Pedido.total_letras + "','" + Pedido.cod_tipo_documento + "','" + Pedido.cod_moneda + "','" + Pedido.cliente_numerodocumento + "','" + Pedido.cliente_nombre + "','" + Pedido.cliente_tipodocumento + "','" + Pedido.cliente_direccion + "','" + Pedido.cliente_codigoubigeo + "','" + Pedido.cliente_pais + "','" + Pedido.cliente_ciudad + "','" + Pedido.serie_comprobante + "','" + Pedido.tipo_proceso + "','" + guia + "','" + Pedido.sede + "','" + Pedido.idusuario + "','" + Pedido.condicionpago + "','" + Pedido.observacion + "','1'" + ")", (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var detalle = JSON.parse(JSON.stringify(Pedido.detalle));
                var idPedido = rows[0][0].idventa;
                for (var i = 0; i < detalle.length; i++) {
                    //console.log("Insert " + i, detalle[i]);
                    db.query("call sp_save_detallepedido('" + detalle[i].idPRODUCTO + "','" + (i + 1) + "','" + detalle[i].txtUNIDAD_MEDIDA_DET + "','" + detalle[i].txtCANTIDAD_DET + "','" + detalle[i].txtPRECIO_DET + "','" + detalle[i].txtSUB_TOTAL_DET + "','" + detalle[i].txtPRECIO_TIPO_CODIGO + "','" + detalle[i].txtIGV + "','" + detalle[i].txtISC + "','" + detalle[i].txtIMPORTE_DET + "','" + detalle[i].txtCOD_TIPO_OPERACION + "','" + detalle[i].txtCODIGO_DET + "','" + detalle[i].txtDESCRIPCION_DET + "','" + detalle[i].txtPRECIO_SIN_IGV_DET + "','" + idPedido + "','" + Pedido.sede + "','" + Pedido.idusuario + "')", (error, rows, fields) => {
                        if (!!error) {
                            dbFunc.connectionRelease;
                            reject(error);
                        } else {
                            // dbFunc.connectionRelease;
                            // resolve(rows);
                        }
                    });
                }
                db.query("SELECT tipo_operacion, total_gravadas, total_inafecta, total_exoneradas, total_gratuitas, total_exportacion, total_descuento, sub_total, porcentaje_igv, total_igv, total_isc, total_otr_imp, total, total_letras, '' as nro_guia_remision, '' as cod_guia_remision, nro_otr_comprobante, serie_comprobante, numero_comprobante, fecha_comprobante, fecha_vto_comprobante, cod_tipo_documento, cod_moneda, cliente_numerodocumento, cliente_nombre, cliente_tipodocumento, cliente_direccion, cliente_pais, cliente_ciudad, cliente_codigoubigeo, cliente_departamento, cliente_provincia, cliente_distrito,id,tipo_proceso FROM pedidos where id=" + idPedido, (error, rows, fields) => {
                    if (!!error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else {
                        var vent = rows[0];
                        dbFunc.connectionRelease;
                        resolve(vent);
                    }
                });
                /*
                dbFunc.connectionRelease;
                resolve(rows);*/
            }
        });
    });
}

function getDetallePedidoById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT idPRODUCTO,txtITEM,txtUNIDAD_MEDIDA_DET,txtCANTIDAD_DET,concat(''+txtPRECIO_DET) txtPRECIO_DET, concat(''+txtSUB_TOTAL_DET) txtSUB_TOTAL_DET,txtPRECIO_TIPO_CODIGO, concat(''+txtIGV) txtIGV,txtISC,concat(''+txtIMPORTE_DET) txtIMPORTE_DET ,txtCOD_TIPO_OPERACION,txtCODIGO_DET,txtDESCRIPCION_DET,txtPRECIO_SIN_IGV_DET FROM pedidosdetalle where idventa=" + id.id, (error, rows, fields) => {
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

function getPedidoById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM pedidos a  where  a.id=" + id.id, (error, rows, fields) => {
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

function getClientessede(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM clientes a where  a.sede=" + id.id, (error, rows, fields) => {
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

function deletePedido(id) {
    return new Promise((resolve, reject) => {
        db.query("call sp_delete_pedido('" + id + "')", (error, rows, fields) => {
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

function getPedidosProductoSede(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM pedidos c inner join pedidosdetalle cd on c.id=cd.idventa inner join user u on u.id=c.idusuario INNER JOIN tipopago tp on tp.id=c.condicionpago WHERE  c.fecha_comprobante >= '" + id.fini + "' and c.fecha_comprobante <= '" + id.ffin + "'  and c.status>0  and c.sede=" + id.id + " order by numero_comprobante", (error, rows, fields) => {
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
module.exports = PedidoModel;