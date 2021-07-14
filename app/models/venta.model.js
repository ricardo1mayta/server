var db = require("../../config/database");
var dbFunc = require("../../config/db-function");
var VentaModel = {
    getAllVentSede: getAllVentSede,
    addVenta: addVenta,
    updateGuia: updateGuia,
    deleteVenta: deleteVenta,
    getVentaById: getVentaById,
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
    getDetalleNotaCreditoById: getDetalleNotaCreditoById
};

function getAllVentSede(id) {
    return new Promise((resolve, reject) => {
        var numPerPage = id.items;
        var page = id.page;
        var skip = page * numPerPage;
        var limit = skip + "," + numPerPage;
        var sql = "SELECT count(*) numRows from ventas where  sede=" + id.id;
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var numRows = rows1[0].numRows;
                var numPages = Math.ceil(numRows / numPerPage);
                var sql = "SELECT * FROM ventas a left join ( select z.id as idrespuesta,z.cod_sunat,z.hash_cdr,z.hash_cpe,z.msj_sunat,z.respuesta,z.ruta_cdr,z.ruta_pdf,z.ruta_xml,z.iddocumento,z.status as statusres from respuestasunat z inner join ( select iddocumento, max(id) id from respuestasunat GROUP by iddocumento) tb on z.id=tb.id ) tb2 on a.id=tb2.iddocumento  where  sede=" + id.id + " order by id desc LIMIT " + limit;
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

function getAllVentSedeResumen(id) {
    return new Promise((resolve, reject) => {
        var sql = "SELECT concat( serie_comprobante,'-',numero_comprobante) Numero, date(`fecha_comprobante`) fecha,`cliente_numerodocumento`, `cliente_nombre`, `sub_total`,  `total_igv`,  `total`,  `cod_moneda`, (case when status =2 then 'ok' else 'error' end) as estado_envio_sunat FROM ventas a  where status>0 and  month(fecha_comprobante)='" + id.mes + "' and year(fecha_comprobante)='" + id.ano + "' and  sede=" + id.id + " order by id asc ";
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

function addVenta(Venta) {
    return new Promise((resolve, reject) => {
        var guia = 0;
        if (Venta.guia === true) {
            guia = 1;
        } else {
            guia = 0;
        }
        db.query(" call sp_save_venta('" + Venta.total_gravadas + "','" + Venta.total_descuento + "','" + Venta.sub_total + "','" + Venta.total_igv + "','" + Venta.total + "','" + Venta.total_letras + "','" + Venta.cod_tipo_documento + "','" + Venta.cod_moneda + "','" + Venta.cliente_numerodocumento + "','" + Venta.cliente_nombre + "','" + Venta.cliente_tipodocumento + "','" + Venta.cliente_direccion + "','" + Venta.cliente_codigoubigeo + "','" + Venta.cliente_pais + "','" + Venta.cliente_ciudad + "','" + Venta.serie_comprobante + "','" + Venta.tipo_proceso + "','" + guia + "','" + Venta.sede + "','" + Venta.idusuario + "','" + Venta.condicionpago + "','" + Venta.observacion + "','1'" + ")", (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var detalle = JSON.parse(JSON.stringify(Venta.detalle));
                var idventa = rows[0][0].idventa;
                for (var i = 0; i < detalle.length; i++) {
                    //console.log("Insert " + i, detalle[i]);
                    db.query("call sp_save_detalleventa('" + detalle[i].idPRODUCTO + "','" + (i + 1) + "','" + detalle[i].txtUNIDAD_MEDIDA_DET + "','" + detalle[i].txtCANTIDAD_DET + "','" + detalle[i].txtPRECIO_DET + "','" + detalle[i].txtSUB_TOTAL_DET + "','" + detalle[i].txtPRECIO_TIPO_CODIGO + "','" + detalle[i].txtIGV + "','" + detalle[i].txtISC + "','" + detalle[i].txtIMPORTE_DET + "','" + detalle[i].txtCOD_TIPO_OPERACION + "','" + detalle[i].txtCODIGO_DET + "','" + detalle[i].txtDESCRIPCION_DET + "','" + detalle[i].txtPRECIO_SIN_IGV_DET + "','" + idventa + "')", (error, rows, fields) => {
                        if (!!error) {
                            dbFunc.connectionRelease;
                            reject(error);
                        } else {
                            // dbFunc.connectionRelease;
                            // resolve(rows);
                        }
                    });
                }
                db.query("SELECT tipo_operacion, total_gravadas, total_inafecta, total_exoneradas, total_gratuitas, total_exportacion, total_descuento, sub_total, porcentaje_igv, total_igv, total_isc, total_otr_imp, total, total_letras, '' as nro_guia_remision, '' as cod_guia_remision, nro_otr_comprobante, serie_comprobante, numero_comprobante, fecha_comprobante, fecha_vto_comprobante, cod_tipo_documento, cod_moneda, cliente_numerodocumento, cliente_nombre, cliente_tipodocumento, cliente_direccion, cliente_pais, cliente_ciudad, cliente_codigoubigeo, cliente_departamento, cliente_provincia, cliente_distrito,id,tipo_proceso FROM ventas where id=" + idventa, (error, rows, fields) => {
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

function updateVenta(id, Venta) {
    return new Promise((resolve, reject) => {
        var guia = 0;
        if (Venta.guia === true) {
            guia = 1;
        } else {
            guia = 0;
        }
        db.query(" call sp_update_venta('" + Venta.total_gravadas + "','" + Venta.total_descuento + "','" + Venta.sub_total + "','" + Venta.total_igv + "','" + Venta.total + "','" + Venta.total_letras + "','" + Venta.cod_tipo_documento + "','" + Venta.cod_moneda + "','" + Venta.cliente_numerodocumento + "','" + Venta.cliente_nombre + "','" + Venta.cliente_tipodocumento + "','" + Venta.cliente_direccion + "','" + Venta.cliente_codigoubigeo + "','" + Venta.cliente_pais + "','" + Venta.cliente_ciudad + "','" + Venta.serie_comprobante + "','" + Venta.tipo_proceso + "','" + guia + "','" + Venta.sede + "','" + Venta.idusuario + "','" + Venta.condicionpago + "','" + Venta.observacion + "','1','" + id + "')", (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var idventa = id;
                var detalle = JSON.parse(JSON.stringify(Venta.detalle));
                for (var i = 0; i < detalle.length; i++) {
                    var sql = "call sp_save_detalleventa('" + detalle[i].idPRODUCTO + "','" + (i + 1) + "','" + detalle[i].txtUNIDAD_MEDIDA_DET + "','" + detalle[i].txtCANTIDAD_DET + "','" + detalle[i].txtPRECIO_DET + "','" + detalle[i].txtSUB_TOTAL_DET + "','" + detalle[i].txtPRECIO_TIPO_CODIGO + "','" + detalle[i].txtIGV + "','" + detalle[i].txtISC + "','" + detalle[i].txtIMPORTE_DET + "','" + detalle[i].txtCOD_TIPO_OPERACION + "','" + detalle[i].txtCODIGO_DET + "','" + detalle[i].txtDESCRIPCION_DET + "','" + detalle[i].txtPRECIO_SIN_IGV_DET + "','" + idventa + "')";
                    console.log("Insert " + i, detalle[i], sql);
                    db.query(sql, (error, rows1, fields) => {
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
                resolve(rows);
            }
        });
    });
}

function getDetalleVentaById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT idPRODUCTO,txtITEM,txtUNIDAD_MEDIDA_DET,txtCANTIDAD_DET,concat(''+txtPRECIO_DET) txtPRECIO_DET, concat(''+txtSUB_TOTAL_DET) txtSUB_TOTAL_DET,txtPRECIO_TIPO_CODIGO, concat(''+txtIGV) txtIGV,txtISC,concat(''+txtIMPORTE_DET) txtIMPORTE_DET ,txtCOD_TIPO_OPERACION,txtCODIGO_DET,txtDESCRIPCION_DET,txtPRECIO_SIN_IGV_DET FROM ventadetalle where  status>0 and idventa=" + id.id + " order by txtITEM asc", (error, rows, fields) => {
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

function getDetalleNotaCreditoById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT idPRODUCTO,txtITEM,txtUNIDAD_MEDIDA_DET,txtCANTIDAD_DET,concat(''+txtPRECIO_DET) txtPRECIO_DET, concat(''+txtSUB_TOTAL_DET) txtSUB_TOTAL_DET,txtPRECIO_TIPO_CODIGO, concat(''+txtIGV) txtIGV,txtISC,concat(''+txtIMPORTE_DET) txtIMPORTE_DET ,txtCOD_TIPO_OPERACION,txtCODIGO_DET,txtDESCRIPCION_DET,txtPRECIO_SIN_IGV_DET FROM creditodetalle where  status>0 and idventa=" + id.id + " order by txtITEM asc", (error, rows, fields) => {
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

function getSeriesGuiaById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM series WHERE iddetventa=" + id.id, (error, rows, fields) => {
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

function addRespuestaSunat(respuesta) {
    return new Promise((resolve, reject) => {
        db.query("call sp_save_respuestasunat('" + respuesta.cod_sunat + "','" + respuesta.hash_cdr + "','" + respuesta.hash_cpe + "','" + respuesta.msj_sunat + "','" + respuesta.respuesta + "','" + respuesta.ruta_cdr + "','" + respuesta.ruta_pdf + "','" + respuesta.ruta_xml + "','" + respuesta.url_xml + "','" + respuesta.iddocumento + "','" + respuesta.idUser + "','" + respuesta.tipocomprobante + "')", (error, rows, fields) => {
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

function updateGuia(id, Venta) {
    return new Promise((resolve, reject) => {
        db.query("call sp_update_guia('" + Venta.codmotivo_traslado + "','" + Venta.motivo_traslado + "','" + Venta.peso + "','" + Venta.numero_paquetes + "','" + Venta.codtipo_transportista + "','" + Venta.tipo_documento_transporte + "','" + Venta.nro_documento_transporte + "','" + Venta.razon_social_transporte + "','" + Venta.ubigeo_destino + "','" + Venta.dir_destino + "','" + Venta.ubigeo_partida + "','" + Venta.dir_partida + "','" + Venta.idusuario + "','" + id + "')", (error, rows, fields) => {
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

function getVentaById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM ventas a left join ( select z.id,z.cod_sunat,z.hash_cdr,z.hash_cpe,z.msj_sunat,z.respuesta,z.ruta_cdr,z.ruta_pdf,z.ruta_xml,z.iddocumento,z.status from respuestasunat z inner join ( select iddocumento, max(id) id from respuestasunat GROUP by iddocumento) tb on z.id=tb.id ) tb2 on a.id=tb2.iddocumento where  a.id=" + id.id, (error, rows, fields) => {
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

function getNotaCreditoId(id) {
    return new Promise((resolve, reject) => {
        db.query(" call sp_get_notacredito('" + id.id + "','" + id.sede + "','" + id.us + "')", (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows[0]);
            }
        });
    });
}

function getDepartamentos() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM sm_regions ", (error, rows, fields) => {
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

function getProvincias(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM sm_provinces where region_id='" + id.id + "'", (error, rows, fields) => {
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

function getDistritos(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * from sm_districts where region_id='" + id.id + "'", (error, rows, fields) => {
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

function getGuiaRemision(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * from guiaremision where status>0 and  idventa='" + id.id + "' and serie='" + id.serie + "'", (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                 var guias = JSON.parse(JSON.stringify(rows));
                 console.log(guias[0].id);
                db.query("SELECT * from detalleguia where idguia='" + guias[0].id + "'", (error, rowsdet, fields) => {
                    if (!!error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else {
                        dbFunc.connectionRelease;
                        resolve({ ...rows[0],
                            detalle: rowsdet
                        });
                    }
                });
            }
        });
    });
}

function deleteVenta(id) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE Venta set status=0 WHERE id='" + id + "'", (error, rows, fields) => {
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

function addSerie(serie) {
    return new Promise((resolve, reject) => {
        var series = JSON.parse(JSON.stringify(serie));
        for (var i = 0; i < series.length; i++) {
            db.query("call sp_save_series('" + series[i].iddetventa + "','" + series[i].idproducto + "','" + series[i].serie + "')", (error, rows, fields) => {
                if (!!error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } else {
                    dbFunc.connectionRelease;
                    resolve(rows);
                }
            });
        }
    });
}
module.exports = VentaModel;