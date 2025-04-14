const express = require("express");
const {getUser,updateUser,changePassword} = require('./lecturerProfile')
const lecturerProfileRouter = express.Router();

lecturerProfileRouter.get("/users/:id", getUser);
lecturerProfileRouter.put("/users/:id", updateUser);
lecturerProfileRouter.put("/users/:id/change-password", changePassword)

module.exports = lecturerProfileRouter;
 