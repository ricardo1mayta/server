var db = require("../../config/database");
var dbFunc = require("../../config/db-function");
var CotizacionesModel = {
    getAllCotizacionesSede: getAllCotizacionesSede,
    addCotizaciones: addCotizaciones,
    deleteCotizaciones: deleteCotizaciones,
    getCotizacionesById: getCotizacionesById,
    getDetalleCotizacionesById: getDetalleCotizacionesById,
};

function getAllCotizacionesSede(id) {
    return new Promise((resolve, reject) => {
        var numPerPage = id.items;
        var page = id.page;
        var skip = page * numPerPage;
        var limit = skip + "," + numPerPage;
        var sql = "SELECT count(*) numRows from cotizaciones where  status>0 and sede=" + id.id;
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var numRows = rows1[0].numRows;
                var numPages = Math.ceil(numRows / numPerPage);
                var sql = "SELECT * FROM cotizaciones a     where status>0 and sede=" + id.id + " order by id desc LIMIT " + limit;
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

function addCotizaciones(Cotizaciones) {
    return new Promise((resolve, reject) => {
        var guia = 0;
        if (Cotizaciones.guia === true) {
            guia = 1;
        } else {
            guia = 0;
        }
        db.query(" call sp_save_cotizacion('" + Cotizaciones.total_gravadas + "','" + Cotizaciones.total_descuento + "','" + Cotizaciones.sub_total + "','" + Cotizaciones.total_igv + "','" + Cotizaciones.total + "','" + Cotizaciones.total_letras + "','" + Cotizaciones.cod_tipo_documento + "','" + Cotizaciones.cod_moneda + "','" + Cotizaciones.cliente_numerodocumento + "','" + Cotizaciones.cliente_nombre + "','" + Cotizaciones.cliente_tipodocumento + "','" + Cotizaciones.cliente_direccion + "','" + Cotizaciones.cliente_codigoubigeo + "','" + Cotizaciones.cliente_pais + "','" + Cotizaciones.cliente_ciudad + "','" + Cotizaciones.serie_comprobante + "','" + Cotizaciones.tipo_proceso + "','" + guia + "','" + Cotizaciones.sede + "','" + Cotizaciones.idusuario + "','" + Cotizaciones.condicionpago + "','" + Cotizaciones.observacion + "','1'" + ")", (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var detalle = JSON.parse(JSON.stringify(Cotizaciones.detalle));
                var idCotizaciones = rows[0][0].idventa;
                for (var i = 0; i < detalle.length; i++) {
                    //console.log("Insert " + i, detalle[i]);
                    db.query("call sp_save_detallecotizacion('" + detalle[i].idPRODUCTO + "','" + (i + 1) + "','" + detalle[i].txtUNIDAD_MEDIDA_DET + "','" + detalle[i].txtCANTIDAD_DET + "','" + detalle[i].txtPRECIO_DET + "','" + detalle[i].txtSUB_TOTAL_DET + "','" + detalle[i].txtPRECIO_TIPO_CODIGO + "','" + detalle[i].txtIGV + "','" + detalle[i].txtISC + "','" + detalle[i].txtIMPORTE_DET + "','" + detalle[i].txtCOD_TIPO_OPERACION + "','" + detalle[i].txtCODIGO_DET + "','" + detalle[i].txtDESCRIPCION_DET + "','" + detalle[i].txtPRECIO_SIN_IGV_DET + "','" + idCotizaciones + "')", (error, rows, fields) => {
                        if (!!error) {
                            dbFunc.connectionRelease;
                            reject(error);
                        } else {
                            // dbFunc.connectionRelease;
                            // resolve(rows);
                        }
                    });
                }
                db.query("SELECT tipo_operacion, total_gravadas, total_inafecta, total_exoneradas, total_gratuitas, total_exportacion, total_descuento, sub_total, porcentaje_igv, total_igv, total_isc, total_otr_imp, total, total_letras, '' as nro_guia_remision, '' as cod_guia_remision, nro_otr_comprobante, serie_comprobante, numero_comprobante, fecha_comprobante, fecha_vto_comprobante, cod_tipo_documento, cod_moneda, cliente_numerodocumento, cliente_nombre, cliente_tipodocumento, cliente_direccion, cliente_pais, cliente_ciudad, cliente_codigoubigeo, cliente_departamento, cliente_provincia, cliente_distrito,id,tipo_proceso FROM cotizaciones where id=" + idCotizaciones, (error, rows, fields) => {
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

function getDetalleCotizacionesById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT txtITEM,txtUNIDAD_MEDIDA_DET,txtCANTIDAD_DET,concat(''+txtPRECIO_DET) txtPRECIO_DET, concat(''+txtSUB_TOTAL_DET) txtSUB_TOTAL_DET,txtPRECIO_TIPO_CODIGO, concat(''+txtIGV) txtIGV,txtISC,concat(''+txtIMPORTE_DET) txtIMPORTE_DET ,txtCOD_TIPO_OPERACION,txtCODIGO_DET,txtDESCRIPCION_DET,txtPRECIO_SIN_IGV_DET FROM cotizacionesdetalle where idventa=" + id.id, (error, rows, fields) => {
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

function getCotizacionesById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM cotizaciones a  where  a.id=" + id.id, (error, rows, fields) => {
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

function deleteCotizaciones(id) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE Cotizacioness set status=0 WHERE  id='" + id + "'", (error, rows, fields) => {
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
module.exports = CotizacionesModel;