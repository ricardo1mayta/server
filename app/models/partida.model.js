var db = require("../../config/database");
var dbFunc = require("../../config/db-function");

var PartidaModel = {
  getAllPartida: getAllPartida,
  addPartida: addPartida,
  updatePartida: updatePartida,
  deletePartida: deletePartida,
  getPartidaById: getPartidaById,
};

function getAllPartida(id) {
  return new Promise((resolve, reject) => {
    var numPerPage = id.items;
    var page = id.page;
    var skip = page * numPerPage;
    var limit = skip + "," + numPerPage;
    var sql =
      "SELECT count(*) numRows from partida where status>0 and idorganiza=" +
      id.id;

    db.query(sql, (error, rows1, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        var numRows = rows1[0].numRows;
        var numPages = Math.ceil(numRows / numPerPage);
        var sql =
          "SELECT id, idorganiza, descripcion, costo, total, jugadasgratis, maximojugadores, status, addDate FROM partida where status>0 AND idorganiza=" +
          id.id +
          " order by id desc LIMIT " +
          limit;
        db.query(sql, (error, rows, fields) => {
          if (!!error) {
            dbFunc.connectionRelease;
            reject(error);
          } else {
            dbFunc.connectionRelease;
            resolve({ data: rows, numPages: numPages, total: numRows });
          }
        });
      }
    });
  });
}

function getPartidaById(id) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, idorganiza, descripcion, costo, total, jugadasgratis, maximojugadores, status, addDate FROM partida   where status>0 and id =" +
        id.id,
      (error, rows, fields) => {
        if (!!error) {
          dbFunc.connectionRelease;
          reject(error);
        } else {
          dbFunc.connectionRelease;
          resolve(rows);
        }
      }
    );
  });
}

function addPartida(Partida) {
  return new Promise((resolve, reject) => {
    db.query(
      " call sp_create_partida('" +
        Partida.idorganiza +
        "','" +
        Partida.descripcion +
        "','" +
        Partida.costo +
        "','" +
        Partida.total +
        "','" +
        Partida.jugadasgratis +
        "','" +
        Partida.maximojugadores +
        "')",
      (error, rows, fields) => {
        if (error) {
          dbFunc.connectionRelease;
          reject(error);
        } else {
          dbFunc.connectionRelease;
          resolve(rows[0][0]);
        }
      }
    );
  });
}

function updatePartida(id, Partida) {
  return new Promise((resolve, reject) => {
    db.query(
      "calls sp_update_Partida('" +
        Partida.id +
        "','" +
        Partida.lastName +
        "','" +
        Partida.firtsName +
        "','" +
        Partida.telefono +
        "','" +
        Partida.img +
        "')",
      (error, rows, fields) => {
        if (!!error) {
          dbFunc.connectionRelease;
          reject(error);
        } else {
          dbFunc.connectionRelease;
          resolve(rows[0][0]);
        }
      }
    );
  });
}

function deletePartida(id) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE partida set status=0 WHERE id='" + id + "'",
      (error, rows, fields) => {
        if (!!error) {
          dbFunc.connectionRelease;
          reject(error);
        } else {
          dbFunc.connectionRelease;
          resolve(rows);
        }
      }
    );
  });
}

module.exports = PartidaModel;
