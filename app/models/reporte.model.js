var db = require("../../config/database");
var dbFunc = require("../../config/db-function");
var PedidoModel = {
    getPedidoSede: getPedidoSede,
    getPedidoUsuarioSede: getPedidoUsuarioSede,
    getPedidoDiaSede: getPedidoDiaSede,
    getPedidoUsuarioDiaSede: getPedidoUsuarioDiaSede,
    getCierredeCajaSede: getCierredeCajaSede,
    gananciasSede: gananciasSede
};

function getPedidoSede(id) {
    return new Promise((resolve, reject) => {
        db.query("" + "SELECT CONCAT( MONTHNAME( fecha_comprobante ) ,' - ',YEAR( fecha_comprobante )) AS mes,sum(total) total FROM pedidos p " + "inner join user u on u.id=p.idusuario  WHERE p.sede =" + id.id + " and p.status>0 GROUP BY mes  ", (error, rows, fields) => {
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

function getPedidoUsuarioSede(id) {
    return new Promise((resolve, reject) => {
        db.query("" + "SELECT CONCAT( MONTHNAME( fecha_comprobante ) ,' - ',YEAR( fecha_comprobante )) AS mes,u.firtsName,sum(total) total FROM pedidos p " + "inner join user u on u.id=p.idusuario  WHERE p.sede =" + id.id + " and p.status>0 and  MONTH( fecha_comprobante )= MONTH( ahora() ) GROUP BY mes,firtsName  ", (error, rows, fields) => {
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

function getPedidoDiaSede(id) {
    return new Promise((resolve, reject) => {
        db.query("" + "SELECT CONCAT( MONTHNAME( fecha_comprobante ) ,' - ',YEAR( fecha_comprobante )) AS mes,sum(total) total FROM pedidos p " + "inner join user u on u.id=p.idusuario  WHERE p.sede =" + id.id + " and p.status>0 and  date( fecha_comprobante )= date( ahora() ) GROUP BY mes ", (error, rows, fields) => {
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

function getPedidoUsuarioDiaSede(id) {
    return new Promise((resolve, reject) => {
        db.query("" + "SELECT CONCAT( MONTHNAME( fecha_comprobante ) ,' - ',YEAR( fecha_comprobante )) AS mes,u.firtsName,sum(total) total FROM pedidos p " + "inner join user u on u.id=p.idusuario  WHERE p.sede =" + id.id + " and p.status>0 and  date( fecha_comprobante )= date( ahora() ) GROUP BY mes,firtsName  ", (error, rows, fields) => {
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

function getCierredeCajaSede(id) {
    return new Promise((resolve, reject) => {
        db.query(" call sp_cierre_caja_sede('" + id.fini + "','" + id.id + "')  ", (error, rows, fields) => {
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

function gananciasSede(id) {
    return new Promise((resolve, reject) => {
        db.query(" call sp_ganancia_sede('" + id.fini + "','" + id.ffin + "','" + id.id + "')  ", (error, rows, fields) => {
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
module.exports = PedidoModel;