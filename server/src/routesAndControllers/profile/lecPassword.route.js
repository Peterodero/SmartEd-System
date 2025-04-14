const express = require("express");
const {changePassword} = require('./lecturerProfile')
const lecturerPasswordRouter = express.Router();

lecturerPasswordRouter.put("/users/:id/change-password", changePassword)

module.exports = lecturerPasswordRouter;
 