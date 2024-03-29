const BotConfiguration = require("../../Configuration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class HistoryCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'history',
			group: 'admin',
			memberName: 'history',
			description: 'View a users previous violations!',
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
		let HistoryUser = message.guild.member(message.mentions.users.first());
        if(!HistoryUser) {
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		let words = args.split(' ');
		let part = words.slice(1).join(' ');

		let WarnHistory = db.get(`{WarnReason}_${message.mentions.users.first().id}`); if (WarnHistory == null)WarnHistory = "No Logged Warnings";
		let MuteHistory = db.get(`{MuteReason}_${message.mentions.users.first().id}`); if (MuteHistory == null)MuteHistory = "No Logged Mutes";
		let KickHistory = db.get(`{KickReason}_${message.mentions.users.first().id}`); if (KickHistory == null)KickHistory = "No Logged Kicks";
		let BanHistory = db.get(`{BanReason}_${message.mentions.users.first().id}`); if (BanHistory == null)BanHistory = "No Logged Bans";
		let Violations = db.get(`${message.mentions.users.first().id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Warnings = db.get(`${message.mentions.users.first().id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let Mutes = db.get(`${message.mentions.users.first().id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.mentions.users.first().id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.mentions.users.first().id}.admin.Bans`); if (Bans == null)Bans = "0";
		let users = message.mentions.users.first();

		if (part == "warnings"){
			const UserWarningHistory = new discord.MessageEmbed()
				.setTimestamp()
				.setColor("#FFA500")
				.setAuthor(message.mentions.users.first().tag, message.mentions.users.first().displayAvatarURL())
				.setThumbnail(users.displayAvatarURL())
				.setTitle(`${Warnings} Logged Warnings`)
				.addField("Warnings:", WarnHistory)
				.setFooter("Do -history [warnings, mutes, kicks, bans] for specific logs!")
			message.channel.send(UserWarningHistory);
			return;
		}
		if (part == "mutes"){
			const UserMuteHistory = new discord.MessageEmbed()
				.setTimestamp()
				.setColor("#FFA500")
				.setAuthor(message.mentions.users.first().tag, message.mentions.users.first().displayAvatarURL())
				.setThumbnail(users.displayAvatarURL())
				.setTitle(`${Mutes} Logged Mutes`)
				.addField("Mutes:", MuteHistory)
				.setFooter("Do -history [warnings, mutes, kicks, bans] for specific logs!")
			message.channel.send(UserMuteHistory);
			return;
		}
		if (part == "kicks"){
			const UserKickHistory = new discord.MessageEmbed()
				.setTimestamp()
				.setColor("#6a0dad")
				.setAuthor(message.mentions.users.first().tag, message.mentions.users.first().displayAvatarURL())
				.setThumbnail(users.displayAvatarURL())
				.setTitle(`${Kicks} Logged Kicks`)
				.addField("Kicks:", KickHistory)
				.setFooter("Do -history [warnings, mutes, kicks, bans] for specific logs!")
			message.channel.send(UserKickHistory);
			return;
		}
		if (part == "bans"){
			const UserBanHistory = new discord.MessageEmbed()
				.setTimestamp()
				.setColor("#FF0000")
				.setAuthor(message.mentions.users.first().tag, message.mentions.users.first().displayAvatarURL())
				.setThumbnail(users.displayAvatarURL())
				.setTitle(`${Bans} Logged Bans`)
				.addField("Bans:", BanHistory)
				.setFooter("Do -history [warnings, mutes, kicks, bans] for specific logs!")
			message.channel.send(UserBanHistory);
			return;
		}

		const UserHistory = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("")
            .setAuthor(message.mentions.users.first().tag, message.mentions.users.first().displayAvatarURL())
			.setThumbnail(users.displayAvatarURL())
			.setTitle(`${Violations} Logged Records`)
			.addField("Warnings:", WarnHistory)
			.addField("Mutes:", MuteHistory)
			.addField("Kicks:", KickHistory)
			.addField("Bans:", BanHistory)
			.setFooter("Do -history [warnings, mutes, kicks, bans] for specific logs!")
		message.channel.send(UserHistory);
	}
};