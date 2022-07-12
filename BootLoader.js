const { version } = require("os");
const fs = require("fs");
//TODO Merge BootLoader.js and System.js?

module.exports = {
    StartUpChecks: () => {
        //Checks for required packages
            try {
                const discord = require("discord.js");
                const chalk =require('chalk');
            }catch(err) {
                //TODO make it tell you specifically which package is missing.
                console.log(`
                One or more of the following packages are missing! Please insure the following packages are installed:
                discord.js
                chalk

                To install a package, run npm i then the packages name.
                Example: npm i discord.js
                `);
                process.exit();
            }

        //Package Imports
        const Token = require("./Token.js");
        const chalk = require("chalk");

        //Token Checks

            //Checks for Token.js
            try { 
                if (!fs.existsSync("./Token.js")) {
                    console.log(chalk.red("Token.js not found! Creating file!"));
                    fs.writeFileSync("Token.js", 'var Token = [\n     key = "BOT TOKEN HERE",\n     ApplicationLink = ""\n];', function (err) {
                        if (err) throw err;
                        console.log(chalk.redBright("There was an issue creating Token.js"));
                    });
                    console.log(chalk.green("Successfully created Token.js! Please fill in the file!"));
                    process.exit();
                }
            }catch(err) {
                console.error(err);
            }

            //Checks for token
            if (key == "BOT TOKEN HERE"){
                console.log(chalk.red("No token detected in Token.js!"));
                process.exit();
            }

        //Checks for Configuration.js
            try {
                if (!fs.existsSync("./Config.js")) {
                    console.log(chalk.red("Fatal Error! Could not find Configuration.js"));
                    console.log(chalk.red("Configuration.js is a critical file and the bot will not work without it!"));
                    console.log(chalk.red("Please download the file and configure the file to start the bot!"));
                    console.log(chalk.green("Official Bot Website: https://github.com/theopcoder/HermitcraftBot/tree/master"));
                    process.exit();
                }
            }catch(err) {
                console.error(err);
            }

        //TODO Redo this?
        //Checks for System.js
            try {
                if (!fs.existsSync("./System.js")) {
                    console.log(chalk.red("Fatal Error! Could not find System.js"));
                    console.log(chalk.red("System.js is a critical file containing error codes and information for the bot!"));
                    console.log(chalk.red("Please re add this file from the link below to start the bot!"));
                    console.log(chalk.green("Official Bot Website: https://github.com/theopcoder/HermitcraftBot/tree/master"));
                    process.exit();
                }
            }catch(err) {
                console.error(err);
            }

        //Finish Message
        console.log(chalk.greenBright("All Startup Checks Passed Successfully!"));

        //TODO add default settings when quick.db is added
    }
};