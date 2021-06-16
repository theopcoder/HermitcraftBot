const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class AFKCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'afk',
			group: 'fun',
			memberName: 'afk',
			description: 'An AFK command.',
		});
	}

	run(message, args) {
        message.reply("Is now AFK.");
	}
};