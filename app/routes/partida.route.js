const PartidaService = require("../services/partida.service");
var schema = require("../schema/partidaValidacionSchema.json");
var iValidator = require("../../common/iValidator");
var errorCode = require("../../common/error-code");
var errorMessage = require("../../common/error-methods");
var mail = require("./../../common/mailer.js");

function init(router) {
  router.route("/partida").post(addPartida);
  router
    .route("/partida/:id")
    .get(getPartidaById)
    .delete(deletePartida)
    .put(updatePartida);
  router.route("/partidas/:id/:page/:items").get(getAllPartidas);
}

function getAllPartidas(req, res) {
  let PartidaId = req.params;

  PartidaService.getAllPartida(PartidaId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function getPartidaById(req, res) {
  let PartidaId = req.params;

  var json_format = iValidator.json_schema(
    schema.getSchema,
    PartidaId,
    "Partida"
  );
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  PartidaService.getPartidaById(PartidaId)
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function addPartida(req, res) {
  var PartidaData = req.body;

  //Validating the input entity
  var json_format = iValidator.json_schema(
    schema.postSchema,
    PartidaData,
    "Partida"
  );
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  PartidaService.addPartida(PartidaData)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.json(err);
    });
}

function updatePartida(req, res) {
  var PartidaData = req.body;
  var id = req.params.id;
  PartidaService.updatePartida(id, PartidaData)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.json(err);
    });
}

function deletePartida(req, res) {
  var delId = req.params.id;
  PartidaService.deletePartida(delId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.json(err);
    });
}

module.exports.init = init;
