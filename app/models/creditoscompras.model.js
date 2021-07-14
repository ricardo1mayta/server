var db = require("../../config/database");
var dbFunc = require("../../config/db-function");
var PedidoModel = {
    getCreditosComprassede: getCreditosComprassede,
    getAllComprasCreditoSede: getAllComprasCreditoSede,
    pagotodoCredito: pagotodoCredito,
    pagofraccionCredito: pagofraccionCredito,
    getpagofaccionCredito: getpagofaccionCredito
};

function getCreditosComprassede(id) {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT DISTINCT c.cliente_numerodocumento,c.cliente_nombre,c.cliente_direccion,(select sum(total) total from compras co where co.cliente_numerodocumento=c.cliente_numerodocumento and co.condicionpago="02" and co.sede=2 and c.status>0 ) total,(SELECT sum(ca.monto)  pagado FROM compras c left join comprasabono ca on ca.idcompra=c.id WHERE c.condicionpago="02" and c.sede=' + id.id + ' and c.status>0 and ca.status=1 group by c.cliente_numerodocumento ) pagado FROM compras c inner join provedores pv on pv.cliente_numerodocumento=c.cliente_numerodocumento WHERE c.condicionpago="02" and c.sede=' + id.id + ' and c.status>0 ';
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

function getAllComprasCreditoSede(id) {
    return new Promise((resolve, reject) => {
        var sql = "SELECT a.id idcompra, a.fecha_comprobante,a.cliente_nombre, a.serie_comprobante,a.numero_comprobante,a.total,( select sum(ca.monto) from comprasabono ca where ca.idcompra=a.id and ca.status>0 GROUP BY ca.idcompra) pagado FROM compras a     where status>0 and sede=" + id.id + " and    condicionpago='02' order by id desc";
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

function pagotodoCredito(pago) {
    return new Promise((resolve, reject) => {
        var sql = "call sp_pagar_todo('" + pago.descripcion + "','" + pago.monto + "','" + pago.tipo + "','" + pago.idcompra + "','" + pago.idus + "')";
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

function pagofraccionCredito(pago) {
    return new Promise((resolve, reject) => {
        var sql = "call sp_pagar_fraccion('" + pago.descripcion + "','" + pago.monto + "','" + pago.tipo + "','" + pago.idcompra + "','" + pago.idus + "')";
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

function getpagofaccionCredito(pago) {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM comprasabono WHERE idcompra= " + pago.id + "  and status>0";
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
module.exports = PedidoModel;