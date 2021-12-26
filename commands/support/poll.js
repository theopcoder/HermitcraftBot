const BotConfiguration = require("../../Configuration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class PollCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'poll',
			group: 'support',
			memberName: 'poll',
			description: 'Create a poll!',
		});
	}

	run(message, args) {
        let words = args.split(' ');
        let poll = words.slice(0).join(' ');
        if (!message.member.hasPermission("ADMINISTRATOR")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
        if(!poll){
            const NoArgumentsGiven = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(NullArguments);
            return message.channel.send(NoArgumentsGiven).then(message => {
                message.delete({timeout: 10000});
            });
        }

        const PollMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#20B2AA")
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle(`Poll`)
            .setDescription(`
                ${poll}
            `)
        let PollChannel = message.guild.channels.cache.get(PollChannelID);
		PollChannel.send(PollMessage).then(MessageEmbed => {
            MessageEmbed.react("✅");
            MessageEmbed.react("❌");
        });
	}
};