/*
 * /=======================================================\
 * | Copyright (c) P7COMunications LLC                     |
 * | Author(s): Francisco Medina [pancho7532@p7com.net]    |
 * | Date: 01/Aug/2023 (rev 1)                             |
 * |=======================================================|
 * |-> Purpose: Configuration Manager                      |
 * \=======================================================/
 * This file is just used to wrap multiple configuration files in an exported object and create missing ones
 * You don't need to modify this file unless you want to keep *some* parameter in a persistent way in case of loss
 */
const fs = require("fs");
const rebuildConfigFile = process.argv.indexOf("--rebuild-config-file") == -1 ? false : true;
const configFiles = [
    /*
     * Every object you declare here (in this array) will be created as a .config.json inside where this .js is located.
     * If you want to declare a custom configuration file, add an object to this array that looks like this:
     * {
     *     $configName: "yourConfigurationName",
     *     someParameter: "value",
     *     anotherParameter: 1234
     * }
     * 
     * Then, you can access it anywhere by requiring this .js file location, and then referencing the configName, like this:
     * const myConfiguration = require("./config");
     * myConfiguration.yourConfiguratioName.someParameter; // this contains "value"
     * 
     * Can't stress this enough but make sure to add a comma (,) at the end of every object everytime you want to add something to an array.
     */
    {
        $configName: "server",
        listenHost: "::",
        listenPort: 80,
        databaseInfo: {
            mysqlHostname: "127.0.0.1",
            mysqlPort: 3306,
            mysqlUsername: "root",
            mysqlPassword: "password",
            mysqlDatabase: "db1000"
        },
    }
];
// What this does?
// 1) Checks that you declared $configName properly
// 2) Checks if your configuration exists on disk, if it doesn't, it creates one with the hardcoded values
// 3) Loads your configuration from disk and converts it to an JavaScript object
// 4) It exposes said object as an module object under the name you declared in $configName
// EXTRA: If you pass the parameter --rebuild-config-file when executing the server, it'll overwrite your config files
//        regardless if it exists on disk or not, this is mainly useful for development...
//        ...or if you messed up and just want an fresh config.
for(let configIdx = 0; configIdx < configFiles.length; configIdx++) {
    if(!configFiles[configIdx].$configName || configFiles[configIdx].$configName.length < 1) { console.log("[ERROR] Invalid configuration layout, make sure you declared $configName and has more than 1 character."); process.exit(1); }
    const fileExists = fs.existsSync(__dirname + "/" + configFiles[configIdx].$configName + ".config.json");
    if(!fileExists || (fileExists && rebuildConfigFile)) {
        fs.writeFileSync(__dirname + "/" + configFiles[configIdx].$configName + ".config.json", JSON.stringify(configFiles[configIdx], null, "    "));
    }
    const configContent = JSON.parse(fs.readFileSync(__dirname + "/" + configFiles[configIdx].$configName + ".config.json").toString());
    module.exports[configFiles[configIdx].$configName] = configContent;
}