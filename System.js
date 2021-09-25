const { CommandoClient } = require("discord.js-commando");
const BotSystem = require("./System.js");
const discord = require("discord.js");
const chalk = require("chalk");

var BotInfo = [
    Version = chalk.red("2.2.0 Early Access"),//XXX With this set as chalk.red, it creates issue in -info and anything else declaring Version.
    BuildID = "2021.month.day.2.2.0",
    VN = "2.2.0 Early Access",
    Developer = "theopcoder",
]

var BotErrors = [
    PermissionError = ":no_entry_sign: You don't have permission to use this command!",
    NullUser = ":warning: You forgot to mention a user or couldn't be found!",
    StaffUser = ":no_entry_sign: You can't perform this command on staff!",
    NullArguments = ":warning: Please supply an argument/reason for the command!",
    DMMessage = ":no_entry_sign: You can't use this command in DMs!",
    UserAlreadyUnmuted = ":warning: That user is already unmuted",
    UserAlreadyMuted = ":warning: That user is already muted!",
    DMError = ":warning: I couldn't DM that user!",
];

//TODO Add a first time setup