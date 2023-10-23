/*
 * /==============================================================\
 * | Copyright (c) P7COMunications LLC                            |
 * | Author(s): Francisco Medina [pancho7532@p7com.net]           |
 * | Date: 23/Oct/2023 (rev 1)                                    |
 * |==============================================================|
 * |-> Purpose: Defines all the possible routes for the website   |
 * \==============================================================/
 */
const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.controller");
module.exports = function() {
    router.get("/", mainController.index);
    return router;
}
