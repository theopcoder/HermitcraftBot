const BotConfiguration = require("../../Configuration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class UpdateRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'update',
			group: 'fun',
			memberName: 'update',
			description: `Gives you the update role!`,
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');
		if (!reason){
			const IncorrectUsage = new discord.MessageEmbed()
				.setColor("#FFFF00")
				.setTitle("Incorrect Usage!")
				.setDescription(`
					-update get | This allows you to get the update role
					-update remove | This allows you to remove the update role
				`)
			message.channel.send(IncorrectUsage);
			return;
		}
		if (reason == "get"){
			message.member.roles.add(UpdateRoleID);
			message.reply(`Successfully gave you the update role! Do -update remove to remove the role!`);
		}
		if (reason == "remove"){
			message.member.roles.remove(UpdateRoleID);
			message.reply(`Successfully removed the update role! Do -update get to reapply the role!`);
		}
	}
};