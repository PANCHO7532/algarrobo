/*
 * /=======================================================\
 * | Copyright (c) P7COMunications LLC                     |
 * | Author(s): Francisco Medina [pancho7532@p7com.net]    |
 * | Date: 01/Aug/2023 (rev 1)                             |
 * |=======================================================|
 * |-> Purpose: User schema in database                    |
 * \=======================================================/
 */
const Sequelize = require("sequelize");
const sequelizeInstance = require("../index.js");
const user = sequelizeInstance.define("users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING
});
module.exports = user;