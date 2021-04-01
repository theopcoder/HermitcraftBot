const BotConfiguration = require("../../BotConfiguration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class KickCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'admin',
			memberName: 'kick',
			description: 'Kicks a user from the server!',
		}); 
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
		}
		if (!message.member.hasPermission("KICK_MEMBERS")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		let KickedUser = message.guild.member(message.mentions.users.first());
        if(!KickedUser) {
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		if (KickedUser.hasPermission("MANAGE_MESSAGES")){
			const StaffUserMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(StaffUser)
			message.channel.send(StaffUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
            return;
		}
		let words = args.split(' ');
		let reason = words.slice(1).join(' ');
        if (!reason){
			const NoReasonWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: Please supply a reason for the kick!`)
			message.channel.send(NoReasonWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}
		

	}
};