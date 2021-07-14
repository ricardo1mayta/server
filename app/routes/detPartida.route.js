const DetPartidaService = require("../services/detpartida.service");
var schema = require("../schema/detPartidaValidacionSchema.json");
var iValidator = require("../../common/iValidator");
var errorCode = require("../../common/error-code");
var errorMessage = require("../../common/error-methods");
var mail = require("./../../common/mailer.js");

function init(router) {
  router.route("/detpartida").post(addDetPartida);
  router
    .route("/detpartida/:id")
    .get(getDetPartidaById)
    .delete(deleteDetPartida)
    .put(updateDetPartida);
  router.route("/detpartidas/:id").get(getAllDetPartidas);
}

function getAllDetPartidas(req, res) {
  let DetPartidaId = req.params;
  DetPartidaService.getAllDetPartida(DetPartidaId.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function getDetPartidaById(req, res) {
  let DetPartidaId = req.params;

  var json_format = iValidator.json_schema(
    schema.getSchema,
    DetPartidaId,
    "DetPartida"
  );
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  DetPartidaService.getDetPartidaById(DetPartidaId)
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function addDetPartida(req, res) {
  var DetPartidaData = req.body;

  //Validating the input entity
  var json_format = iValidator.json_schema(
    schema.postSchema,
    DetPartidaData,
    "DetPartida"
  );
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  DetPartidaService.addDetPartida(DetPartidaData)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.json(err);
    });
}

function updateDetPartida(req, res) {
  var DetPartidaData = req.body;
  var id = req.params.id;
  DetPartidaService.updateDetPartida(id, DetPartidaData)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.json(err);
    });
}

function deleteDetPartida(req, res) {
  var delId = req.params.id;
  DetPartidaService.deleteDetPartida(delId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.json(err);
    });
}

module.exports.init = init;
