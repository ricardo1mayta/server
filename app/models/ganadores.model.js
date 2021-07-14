var db = require("../../config/database");
var dbFunc = require("../../config/db-function");

var GanadoresModel = {
  getAllGanadores: getAllGanadores,
  addGanadores: addGanadores,
  updateGanadores: updateGanadores,
  deleteGanadores: deleteGanadores,
  getGanadoresById: getGanadoresById,
};

function getAllGanadores() {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT id, idpartida, orden, monto, descripcion,status, addDate FROM ganadores where status>0 ";
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

function getGanadoresById(id) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, idpartida, monto, descripcion, status, addDate FROM Ganadores   where status>0 and id =" +
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

function addGanadores(Ganadores) {
  return new Promise((resolve, reject) => {
    db.query(
      " call sp_create_ganadores('" +
        Ganadores.idpartida +
        "','" +
        Ganadores.orden +
        "','" +
        Ganadores.monto +
        "','" +
        Ganadores.descripcion +
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

function updateGanadores(id, Ganadores) {
  return new Promise((resolve, reject) => {
    db.query(
      "calls sp_update_Ganadores('" +
        Ganadores.id +
        "','" +
        Ganadores.lastName +
        "','" +
        Ganadores.firtsName +
        "','" +
        Ganadores.telefono +
        "','" +
        Ganadores.img +
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

function deleteGanadores(id) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE ganadores set status=0 WHERE id='" + id + "'",
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

module.exports = GanadoresModel;
