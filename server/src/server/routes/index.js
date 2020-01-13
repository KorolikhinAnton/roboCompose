const express    = require("express");
const controller = require("../controllers");
const routes     = express.Router();

routes.route("/").get(controller.getSymptoms);
routes.route("/new").post(controller.addSymptom);

module.exports = routes;