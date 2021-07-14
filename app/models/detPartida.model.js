var db = require("../../config/database");
var dbFunc = require("../../config/db-function");

var DetPartidaModel = {
  getAllDetPartida: getAllDetPartida,
  addDetPartida: addDetPartida,
  updateDetPartida: updateDetPartida,
  deleteDetPartida: deleteDetPartida,
  getDetPartidaById: getDetPartidaById,
};

function getAllDetPartida(id) {
  return new Promise((resolve, reject) => {
    var sql =
      `SELECT a.id, a.idpartida, a.idparticipante, a.costo,a.numero, concat(b.firtsName,' ', b.lastName)  as participante, a.status, a.addDate FROM detpartida a left join user b on a.idparticipante=b.id  where a.status>0  and a.idpartida=` +
      id;
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

function getDetPartidaById(id) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, idpartida, idparticipante, costo,numero, status, addDate FROM detpartida   where status>0 and id =" +
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

function addDetPartida(DetPartida) {
  return new Promise((resolve, reject) => {
    db.query(
      " call sp_create_detpartida('" +
        DetPartida.idpartida +
        "','" +
        DetPartida.idparticipante +
        "','" +
        DetPartida.costo +
        "','" +
        DetPartida.numero +
        "')",
      (error, rows, fields) => {
        if (error) {
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

function updateDetPartida(id, DetPartida) {
  return new Promise((resolve, reject) => {
    db.query(
      "call sp_update_detpartida('" +
        id +
        "','" +
        DetPartida.idparticipante +
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

function deleteDetPartida(id) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE detpartida set status=0 WHERE id='" + id + "'",
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

module.exports = DetPartidaModel;
