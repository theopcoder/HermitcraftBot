const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class TransactionsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'transactions',
			group: 'economy',
			memberName: 'transactions',
			description: 'View your transactions history!',
		});
	}

	run(message, args) {
		let Transactions = db.get(`{ConfirmationMessage}_${message.author.id}`); if (Transactions == null)Transactions = "No transaction history!";
		//BUG After so many transactions, it won't load or it will give an error
		const TransactionHistoryMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#85bb65")
			.setThumbnail(message.author.displayAvatarURL())
			.setTitle("Transaction History")
			.setDescription(`
				**Transactions:**

				${Transactions}
			`)
		message.channel.send(TransactionHistoryMessage);
	}
};