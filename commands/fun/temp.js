const BotConfiguration = require("../../Configuration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class TestCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'test',
			group: 'fun',
			memberName: 'test',
			description: 'Rates what you say on a scale of 1-10!',
		});
	}

	run(message, args) {
		const user = message.mentions.users.first() || message.users.cache.get(args[0]) || message.author
		if (!user) {
		user = message.author;
		}
	   
		   const member = message.guild.member(user)
		   const avatar = user.avatarURL({dynamic:true})
		   if (!avatar) return message.channel.send("This user doesn't have an avatar to show")
		   const embed = new Discord.MessageEmbed()
			  .setTitle(`${user.username}'s avatar`)
			  .setColor('RANDOM')
			  .setDescription(`[Click here for the image link](${avatar})`)
			  .setImage(avatar)
			  .setFooter(`${message.user.username} 2021`)
			  .setTimestamp()
	  
		  message.channel.send(embed)
	}
};