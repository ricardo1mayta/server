var GanadoresModel = require("../models/ganadores.model.js");

var GanadoresService = {
  getAllGanadores: getAllGanadores,
  getGanadoresById: getGanadoresById,
  addGanadores: addGanadores,
  updateGanadores: updateGanadores,
  deleteGanadores: deleteGanadores,
};

function addGanadores(GanadoresData) {
  return new Promise((resolve, reject) => {
    GanadoresModel.addGanadores(GanadoresData)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function updateGanadores(id, GanadoresData, callback) {
  return new Promise((resolve, reject) => {
    GanadoresModel.updateGanadores(id, GanadoresData)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteGanadores(id) {
  return new Promise((resolve, reject) => {
    GanadoresModel.deleteGanadores(id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getAllGanadores() {
  return new Promise((resolve, reject) => {
    GanadoresModel.getAllGanadores()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getGanadoresById(id) {
  return new Promise((resolve, reject) => {
    GanadoresModel.getGanadoresById(id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = GanadoresService;
