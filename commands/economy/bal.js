const BotConfiguration = require("../../Configuration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class WalletCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bal',
			group: 'economy',
			memberName: 'bal',
			description: 'Tells you how much money you have!',
		});
	}

	run(message, args) {
        let MentionedUser = message.mentions.users.first();
        if (MentionedUser){
            let MentionedUserBalanceAmount = db.get(`${message.mentions.users.first().id}.basic.money`); if (MentionedUserBalanceAmount == null)MentionedUserBalanceAmount = "0";

            let MentionUsersBalance = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#008000")
                .setThumbnail(MentionedUser.displayAvatarURL())
                .setTitle(`${MentionedUser.tag} Wallet`)
                .setDescription(`
                    **Balance:** $${MentionedUserBalanceAmount} :moneybag:
                `)
            message.channel.send(MentionUsersBalance);
        }else{
            let UserBalanceAmount = db.get(`${message.author.id}.basic.money`); if (UserBalanceAmount == null)UserBalanceAmount = "0";

            const UserBalance = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#008000")
                .setThumbnail(message.author.displayAvatarURL())
                .setTitle(`${message.author.tag} Wallet`)
                .setDescription(`
                    :moneybag: **Balance:** $${UserBalanceAmount}
                `)
            message.channel.send(UserBalance);
        }
	}
};