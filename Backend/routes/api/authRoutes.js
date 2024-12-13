const express = require("express");
const secureApi = require("../../middleware/secureApi");
const registrationController = require("../../controler/registrationController");
const otpController = require("../../controler/otpcontroller");
const _ = express.Router();




_.post("/registration",registrationController)
_.post("/otp",otpController)



module.exports = _;