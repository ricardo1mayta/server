var db = require("../../config/database");
var dbFunc = require("../../config/db-function");
const bcrypt = require("bcrypt");
var userModel = {
    getAllUser: getAllUser,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserById: getUserById,
    getUserByIdParent: getUserByIdParent,
    getUserByIdParent2: getUserByIdParent2,
    getAllMenu: getAllMenu,
    getSubsedes: getSubsedes
};

function getAllUser(id) {
    return new Promise((resolve, reject) => {
        var numPerPage = id.items;
        var page = id.page;
        var skip = page * numPerPage;
        var limit = skip + "," + numPerPage;
        var sql = "SELECT count(*) numRows FROM user where sede=" + id.id + " and  status>0 ";
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var numRows = rows1[0].numRows;
                var numPages = Math.ceil(numRows / numPerPage);
                var sql = "select  id, email, lastName,firtsName, telefono, status, img, rol,addDate  FROM user where sede=" + id.id + " and  status>0 " + " order by id desc LIMIT " + limit;
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

function getAllMenu(id) {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM menudetalle md  inner join menu m on md.idmenu=m.id   WHERE md.idrol=" + id.id + " and md.statusd>0 and m.status>0 ";
        db.query(sql, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var r = convert(rows);
                dbFunc.connectionRelease;
                resolve(r);
            }
        });
    });
}

function addToHeirarchy(val, level) {
    if (val.parent === level) {
        return {
            label: val.label,
            link: val.link,
            icon: val.icon,
            items: []
        };
        //console.log(val)
    }
}

function remapHeirarchy(item) {
    var children = [];
    for (var k in item) {
        children.Push({
            "name": k,
            "children": remapHeirarchy(item[k])
        });
    }
    return children;
}

function convert(array) {
    var map = {};
    for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        obj.items = [];
        map[obj.id] = obj;
        var parent = obj.parent || '-';
        if (!map[parent]) {
            map[parent] = {
                items: []
            };
        }
        map[parent].items.push(obj);
    }
    return map['-'].items;
}

function getUserById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT id, email, lastName,firtsName, telefono, status, img, rol,addDate  FROM user where status>0 and id =" + id.id, (error, rows, fields) => {
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

function getUserByIdParent(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT id, email, lastName,firtsName, telefono, status, img, rol,addDate  FROM user where status>0 and parent =" + id.id, (error, rows, fields) => {
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

function getUserByIdParent2(id) {
    return new Promise((resolve, reject) => {
        var numPerPage = id.items;
        var page = id.page;
        var skip = page * numPerPage;
        var limit = skip + "," + numPerPage;
        var sql = "SELECT count(*) numRows FROM user where status>0 and parent=" + id.id;
        db.query(sql, (error, rows1, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                var numRows = rows1[0].numRows;
                var numPages = Math.ceil(numRows / numPerPage);
                var sql = "select  id, email, lastName,firtsName, telefono, status, img, rol,addDate  FROM user where status>0 and parent=" + id.id + " order by id desc LIMIT " + limit;
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

function addUser(user) {
    return new Promise((resolve, reject) => {
        db.query("sp_registro_user('" + user.email + "','" + user.password + "','" + user.lastName + "','" + user.firtsName + "','" + user.telefono + "','" + user.status + "','" + user.img + "','" + user.rol + "','" + user.parent + "','" + user.sede + "')", (error, rows, fields) => {
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

function updateUser(id, user) {
    return new Promise((resolve, reject) => {
        db.query("call sp_update_user('" + user.id + "','" + user.lastName + "','" + user.firtsName + "','" + user.telefono + "','" + user.img + "')", (error, rows, fields) => {
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

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE user set status=0 WHERE id='" + id + "'", (error, rows, fields) => {
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

function getSubsedes(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM sudsedes WHERE idsede='" + id + "'", (error, rows, fields) => {
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
module.exports = userModel;