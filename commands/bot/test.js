const BotConfiguration = require("../../Configuration.js");
const { Command, CommandoClient } = require("discord.js-commando");
const BotData = require("../../System.js");
const token = require("../../Token.js");
const discord = require("discord.js");

module.exports = class NameCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'name',
			group: 'bot',
			memberName: 'name',
			description: `A test command for early bot releases.`,
		});
	}

	//TODO Remove when update is finished

	run(message, args) {
		const embed = new discord.MessageEmbed()
			.setDescription("few erw")
		message.channel.send(embed);
	}
};