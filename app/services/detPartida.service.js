var DetPartidaModel = require("../models/detPartida.model.js");

var DetPartidaService = {
  getAllDetPartida: getAllDetPartida,
  getDetPartidaById: getDetPartidaById,
  addDetPartida: addDetPartida,
  updateDetPartida: updateDetPartida,
  deleteDetPartida: deleteDetPartida,
};

function addDetPartida(DetpartidaData) {
  return new Promise((resolve, reject) => {
    DetPartidaModel.addDetPartida(DetpartidaData)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function updateDetPartida(id, DetpartidaData, callback) {
  return new Promise((resolve, reject) => {
    DetPartidaModel.updateDetPartida(id, DetpartidaData)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteDetPartida(id) {
  return new Promise((resolve, reject) => {
    DetPartidaModel.deleteDetPartida(id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getAllDetPartida(id) {
  return new Promise((resolve, reject) => {
    DetPartidaModel.getAllDetPartida(id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getDetPartidaById(id) {
  return new Promise((resolve, reject) => {
    DetPartidaModel.getDetPartidaById(id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = DetPartidaService;
