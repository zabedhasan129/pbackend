const express = require("express");
const secureApi = require("../../middleware/secureApi");
const registrationController = require("../../controler/registrationController");
const _ = express.Router();




_.post("/registration",secureApi,registrationController)




module.exports = _;