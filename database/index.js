/*
 * /=======================================================\
 * | Copyright (c) P7COMunications LLC                     |
 * | Author(s): Francisco Medina [pancho7532@p7com.net]    |
 * | Date: 01/Aug/2023 (rev 1)                             |
 * |=======================================================|
 * |-> Purpose: Database connector/manager                 |
 * \=======================================================/
 */
const Sequelize = require("sequelize");
const configurationFile = require("../config").server.databaseInfo;
if(!configurationFile.mysqlHostname) { console.log("[ERROR] No database hostname specified in your server configuration"); process.exit(1);}
if(!configurationFile.mysqlUsername) { console.log("[ERROR] No database username specified in your server configuration"); process.exit(1);}
if(!configurationFile.mysqlPassword) { console.log("[ERROR] No database password specified in your server configuration"); process.exit(1);}
if(!configurationFile.mysqlDatabase) { console.log("[ERROR] No database name specified in your server configuration"); process.exit(1);}
const sequelizeInstance = new Sequelize(configurationFile.mysqlDatabase, configurationFile.mysqlUsername, configurationFile.mysqlPassword, {
    host: configurationFile.mysqlHost,
    port: configurationFile.mysqlPort || 3306,
    dialect: "mysql",
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
module.exports = sequelizeInstance;
/****************** ADD YOUR MODELS AND RELATIONSHPS HERE ******************/
const user = require("./models/User.db");
/***************************************************************************/