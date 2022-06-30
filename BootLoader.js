const { version } = require("os");
const fs = require("fs");

module.exports = {
    StartUpChecks: () => {
        //Checks for required packages
            try {
                const { CommandoClient } = require("discord.js-commando");
                const discord = require("discord.js");
                const chalk = require("chalk");
                const db = require("quick.db");
                const ms = require("ms");
            }catch(err) {
                console.log(`
                Missing packages have been detected. Please insure the following packages are installed:
                npm i discord.js
                npm i discord.js-commando
                npm i quick.db
                npm i chalk
                npm i ms
                `);
                process.exit();
            }
        
        const chalk = require("chalk");
        const db = require("quick.db");
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
        
        //Checks if token is in place
            const token = require("./Token.js");
            if (key == ""){
                console.log(chalk.red(`Please make sure there is a token in Token.js`));
                process.exit();
            };

        //Checks for Configuration.js
        try {
            if (!fs.existsSync("./Configuration.js")) {
                console.log(chalk.red("Fatal Error! Could not find Configuration.js"));
                console.log(chalk.red("Configuration.js is a critical file and the bot will not work without it!"));
                console.log(chalk.red("Please download the file and configure the file to start the bot!"));
                console.log(chalk.green("Official Bot Website: https://github.com/theopcoder/HermitcraftBot/tree/master"));
                process.exit();
            }
        }catch(err) {
            console.error(err);
        }

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

        //First Time SetUp Setting Defaults
            //Settings
            if (db.get("settings.LevelUpSystem")== null)db.set("settings.LevelUpSystem", 1);
            if (db.get("settings.DeadChatPings")== null)db.set("settings.DeadChatPings", 1);
            if (db.get("settings.AutoModeration")== null)db.set("settings.AutoModeration", 1);
            if (db.get("settings.StaffApplications")== null)db.set("settings.StaffApplications", 0);
            //Auto Moderation
            if (db.get("AutoModeration.MuteBypassProtection")== null)db.set("AutoModeration.MuteBypassProtection", 1);
            if (db.get("AutoModeration.ChatFilter")== null)db.set("AutoModeration.ChatFilter", 1);
            if (db.get("AutoModeration.DiscordInviteChecker")== null)db.set("AutoModeration.DiscordInviteChecker", 1);
            if (db.get("AutoModeration.EditedMessageLogger")== null)db.set("AutoModeration.EditedMessageLogger", 1);
            if (db.get("AutoModeration.DeletedMessageLogger")== null)db.set("AutoModeration.DeletedMessageLogger", 1);
        
        //
        //Finish Message
        console.log(chalk.greenBright("All Startup Checks Passed Successfully!"));
    },
};