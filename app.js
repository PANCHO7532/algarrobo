/*
 * /=======================================================\
 * | Copyright (c) P7COMunications LLC                     |
 * | Author(s): Francisco Medina [pancho7532@p7com.net]    |
 * | Date: 23/Oct/2023 (rev 1)                             |
 * |=======================================================|
 * |-> Purpose: Application                                |
 * \=======================================================/
 */
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes");
const database = require("./database");
const config = require("./config").server;
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", routes());
app.set("view engine", "pug");
app.set('view options', { pretty: true });
app.set("views", path.join(__dirname, "./views"));
app.listen(config.listenPort, config.listenHost, async() => {
    console.log("[INFO] Server started at " + config.listenHost + " in port " + config.listenPort);
    try { await database.sync({force: true}); } catch(e) { console.log(`[ERROR] Couldn't sync database! ${e}`); }
});