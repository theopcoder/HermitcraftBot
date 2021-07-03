const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");
const os = require('os');

module.exports = class PerformanceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pf',
			group: 'bot',
			memberName: 'pf',
			description: `Performance command for the bot!`,
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
		if (!message.member.hasPermission("MANAGE_MESSAGES")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000})
			});
			return;
		}

		var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
		var  getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + '%'

		const PerformanceMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#d3d3d3")
			.setTitle("Bot Performance")
			.setDescription(`
				**Used RAM:** ${getpercentage}
				**RAM:** ${(usedMemory/ Math.pow(1024, 3)).toFixed(2)}
				**Ping:** ${Date.now() - message.createdTimestamp} ms
			`)
		message.channel.send(PerformanceMessage);
	}
};