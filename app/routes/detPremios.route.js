const DetPremiosService = require("../services/detPremios.service");
var schema = require("../schema/detPremiosValidacionSchema.json");
var iValidator = require("../../common/iValidator");
var errorCode = require("../../common/error-code");
var errorMessage = require("../../common/error-methods");
var mail = require("./../../common/mailer.js");

function init(router) {
  router.route("/detpremios").get(getAllDetPremioss).post(addDetPremios);
  router
    .route("/detpremios/:id")
    .get(getDetPremiosById)
    .delete(deleteDetPremios)
    .put(updateDetPremios);
}

function getAllDetPremioss(req, res) {
  DetPremiosService.getAllDetPremios()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function getDetPremiosById(req, res) {
  let DetPremiosId = req.params;

  var json_format = iValidator.json_schema(
    schema.getSchema,
    DetPremiosId,
    "DetPremios"
  );
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  DetPremiosService.getDetPremiosById(DetPremiosId)
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function addDetPremios(req, res) {
  var DetPremiosData = req.body;

  //Validating the input entity
  var json_format = iValidator.json_schema(
    schema.postSchema,
    DetPremiosData,
    "DetPremios"
  );
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  DetPremiosService.addDetPremios(DetPremiosData)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.json(err);
    });
}

function updateDetPremios(req, res) {
  var DetPremiosData = req.body;
  var id = req.params.id;
  DetPremiosService.updateDetPremios(id, DetPremiosData)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.json(err);
    });
}

function deleteDetPremios(req, res) {
  var delId = req.params.id;
  DetPremiosService.deleteDetPremios(delId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.json(err);
    });
}

module.exports.init = init;
