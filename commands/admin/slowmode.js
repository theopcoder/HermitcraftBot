const BotConfiguration = require("../../Configuration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class SlowModeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'slowmode',
			group: 'admin',
			memberName: 'slowmode',
			description: 'Turns on slowmode for a channel!',
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
				message.delete({timeout: 10000});
			});
			return;
		}
        let words = args.split(' ');
        let time = words.slice(0).join(' ');

        if (!time) {
			const NoTimeWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: Please give a time in seconds to use slowmode!`)
			message.channel.send(NoTimeWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}

        if (isNaN(time)){
			const InvalidNumberWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: Please make sure the time is a number!`)
			message.channel.send(InvalidNumberWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
        }

		if (time > 21600){
			const MaxTimeWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: You can only go to 21600!`)
			message.channel.send(MaxTimeWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}

		if (time == 0){
			message.channel.setRateLimitPerUser(0);
			const SlowModeDisabled = new discord.MessageEmbed()
				.setColor("#00FF00")
				.setDescription(`:white_check_mark: Successfully disabled slowmode!`)
			message.channel.send(SlowModeDisabled);
			return;
		}

		message.channel.setRateLimitPerUser(time);
        const SlowMode = new discord.MessageEmbed()
			.setColor("#00FF00")
            .setDescription(`:white_check_mark: Slowmode enabled! You can now send a message every **${time}** seconds!`)
        message.channel.send(SlowMode);

		const SlowModeLogMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#00FF00")
			.setThumbnail(message.author.displayAvatarURL())
			.setTitle("SlowChat")
			.setDescription(`
				**Moderator:** ${message.author}
				**Channel:** ${message.channel}
				**Duration:** ${time} seconds
			`)
		let LogChannel = message.guild.channels.cache.get(ModLogID);
		LogChannel.send(SlowModeLogMessage);
	}
};