var DetPremiosModel = require("../models/detPremios.model.js");

var DetPremiosService = {
  getAllDetPremios: getAllDetPremios,
  getDetPremiosById: getDetPremiosById,
  addDetPremios: addDetPremios,
  updateDetPremios: updateDetPremios,
  deleteDetPremios: deleteDetPremios,
};

function addDetPremios(DetPremiosData) {
  return new Promise((resolve, reject) => {
    DetPremiosModel.addDetPremios(DetPremiosData)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function updateDetPremios(id, DetPremiosData, callback) {
  return new Promise((resolve, reject) => {
    DetPremiosModel.updateDetPremios(id, DetPremiosData)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteDetPremios(id) {
  return new Promise((resolve, reject) => {
    DetPremiosModel.deleteDetPremios(id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getAllDetPremios() {
  return new Promise((resolve, reject) => {
    DetPremiosModel.getAllDetPremios()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getDetPremiosById(id) {
  return new Promise((resolve, reject) => {
    DetPremiosModel.getDetPremiosById(id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = DetPremiosService;
