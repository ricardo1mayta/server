var PartidaModel = require("../models/partida.model.js");

var PartidaService = {
  getAllPartida: getAllPartida,
  getPartidaById: getPartidaById,
  addPartida: addPartida,
  updatePartida: updatePartida,
  deletePartida: deletePartida,
};

function addPartida(partidaData) {
  return new Promise((resolve, reject) => {
    PartidaModel.addPartida(partidaData)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function updatePartida(id, partidaData, callback) {
  return new Promise((resolve, reject) => {
    PartidaModel.updatePartida(id, partidaData)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deletePartida(id) {
  return new Promise((resolve, reject) => {
    PartidaModel.deletePartida(id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getAllPartida(id) {
  return new Promise((resolve, reject) => {
    PartidaModel.getAllPartida(id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getPartidaById(id) {
  return new Promise((resolve, reject) => {
    PartidaModel.getPartidaById(id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = PartidaService;
