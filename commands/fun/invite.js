const BotConfiguration = require("../../Configuration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class InviteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'fun',
			memberName: 'invite',
			description: 'Get an invite for the server!',
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        message.channel.createInvite().then(invite => message.reply(`Here is an invite for the server! https://discord.gg/${invite.code}`));
	}
};