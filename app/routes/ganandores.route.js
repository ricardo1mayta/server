const GanadoresService = require("../services/ganadores.service");
var schema = require("../schema/ganadoresValidacionSchema.json");
var iValidator = require("../../common/iValidator");
var errorCode = require("../../common/error-code");
var errorMessage = require("../../common/error-methods");
var mail = require("./../../common/mailer.js");

function init(router) {
  router.route("/Ganadores").get(getAllGanadoress).post(addGanadores);
  router
    .route("/Ganadores/:id")
    .get(getGanadoresById)
    .delete(deleteGanadores)
    .put(updateGanadores);
}

function getAllGanadoress(req, res) {
  GanadoresService.getAllGanadores()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function getGanadoresById(req, res) {
  let GanadoresId = req.params;

  var json_format = iValidator.json_schema(
    schema.getSchema,
    GanadoresId,
    "Ganadores"
  );
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  GanadoresService.getGanadoresById(GanadoresId)
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}

function addGanadores(req, res) {
  var GanadoresData = req.body;

  //Validating the input entity
  var json_format = iValidator.json_schema(
    schema.postSchema,
    GanadoresData,
    "Ganadores"
  );
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  GanadoresService.addGanadores(GanadoresData)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.json(err);
    });
}

function updateGanadores(req, res) {
  var GanadoresData = req.body;
  var id = req.params.id;
  GanadoresService.updateGanadores(id, GanadoresData)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.json(err);
    });
}

function deleteGanadores(req, res) {
  var delId = req.params.id;
  GanadoresService.deleteGanadores(delId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      mail.mail(err);
      res.json(err);
    });
}

module.exports.init = init;
