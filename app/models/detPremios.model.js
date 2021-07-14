var db = require("../../config/database");
var dbFunc = require("../../config/db-function");

var DetPremiosModel = {
  getAllDetPremios: getAllDetPremios,
  addDetPremios: addDetPremios,
  updateDetPremios: updateDetPremios,
  deleteDetPremios: deleteDetPremios,
  getDetPremiosById: getDetPremiosById,
};

function getAllDetPremios(id) {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT id, idpartida, monto, descripcion,status, addDate FROM detpremios where status>0 and idpartida=" +
      id.id;
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

function getDetPremiosById(id) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, idpartida, monto, descripcion, status, addDate FROM detpremios   where status>0 and id =" +
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

function addDetPremios(DetPremios) {
  return new Promise((resolve, reject) => {
    db.query(
      " call sp_create_detpremios('" +
        DetPremios.idpartida +
        "','" +
        DetPremios.monto +
        "','" +
        DetPremios.descripcion +
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

function updateDetPremios(id, DetPremios) {
  return new Promise((resolve, reject) => {
    db.query(
      "calls sp_update_DetPremios('" +
        DetPremios.id +
        "','" +
        DetPremios.lastName +
        "','" +
        DetPremios.firtsName +
        "','" +
        DetPremios.telefono +
        "','" +
        DetPremios.img +
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

function deleteDetPremios(id) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE detpremios set status=0 WHERE id='" + id + "'",
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

module.exports = DetPremiosModel;
