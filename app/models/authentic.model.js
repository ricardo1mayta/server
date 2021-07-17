var db = require("../../config/database");
var dbFunc = require("../../config/db-function");
const bcrypt = require("bcrypt");
var authenticModel = {
    authentic: authentic,
    signup: signup,
    sigin: sigin,
    getAllProductos: getAllProductos,
    getAllVenta: getAllVenta,
    getdetalleventa: getdetalleventa,
    getsede: getsede,
    addRespuestaSunat: addRespuestaSunat
};

function authentic(authenticData) {
    return new Promise((resolve, reject) => {
        db.query("select a.addDate,a.email,a.firtsName,a.id,a.img,a.lastName,a.parent, a.password,a.rol,a.sede,a.status,a.subsede,a.telefono,b.nombressede,c.nombrerol from user a inner join sudsedes b on b.idssede = a.subsede inner join roles c on c.idrol=a.rol WHERE a.status=1 and a.email='"+ authenticData.email+"'", (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                try {
                    bcrypt.compare(authenticData.password, rows[0].password, function(err, isMatch) {
                        if (err) {
                            reject(error);
                        } else if (isMatch) {
                            db.query("SELECT * FROM sedes where idsede=" + rows[0].sede, (error, rowsemisor, fields) => {
                                if (!!error) {
                                    dbFunc.connectionRelease;
                                    reject(error);
                                } else {
                                    //console.log(rowsemisor[0]);
                                    resolve({ ...rows[0],
                                        edmisor: rowsemisor[0]
                                    });
                                }
                            });
                        } else {
                            reject({
                                success: false,
                                message: "password doesnot match"
                            });
                        }
                    });
                } catch (error) {
                    reject({
                        success: false,
                        message: "password doesnot match"
                    });
                }
            }
        });
    });
}

function signup(user) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                db.query("SELECT * from user where email='" + user.email + " '  AND status=1  ", (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if (rows.length > 0) {
                        dbFunc.connectionRelease;
                        reject({
                            success: false,
                            message: "user already exist ! try with different user",
                        });
                    }
                });
            });
        });
    });
}

function sigin(user) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                db.query("call sp_registro_user('" + user.email + "','" + user.password + "','" + user.lastName + "','" + user.firtsName + "','" + user.telefono + "','" + user.status + "','" + user.img + "','" + user.rol + "','" + user.parent + "' ,'" + user.sede + "')", (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else {
                        dbFunc.connectionRelease;
                        resolve(rows[0][0]);
                    }
                });
            });
        });
    });
}

function getAllProductos(id) {
    return new Promise((resolve, reject) => {
        var numPerPage = id.items;
        var page = id.page;
        var skip = page * numPerPage;
        var limit = skip + "," + numPerPage;
        var sql = "SELECT count(*) numRows from productos where status>0 and statuspublic = 'AC'";
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var numRows = rows1[0].numRows;
                var numPages = Math.ceil(numRows / numPerPage);
                var sql = "SELECT `descripcion` ,  precio3, cantidad,case when categoria=1 then 'CELULARES' WHEN categoria=2 then 'ACCESORIOS' else 'OTROS' end categoriad  ,`descc`,`descl`  FROM productos p inner join produtosdetalle dp on dp.idpro=p.id and dp.idsede=p.sede  where status>0 and   statuspublic = 'AC' order by categoria, descripcion desc LIMIT " + limit;
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

function getAllVenta() {
    return new Promise((resolve, reject) => {
        var sql = "SELECT *  from ventas v where  v.status=1 and  v.cod_tipo_documento='01' and v.tipo_proceso=1  ";
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows1);
            }
        });
    });
}

function getsede(id) {
    return new Promise((resolve, reject) => {
        var sql = "SELECT *  FROM sedes where status='AC' AND  idsede =" + id.id;
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows1);
            }
        });
    });
}

function getdetalleventa(id) {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM ventadetalle where status>0 AND  idventa = " + id.id + " order by txtITEM asc";
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows1);
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
module.exports = authenticModel;