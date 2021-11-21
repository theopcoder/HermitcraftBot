const BotConfiguration = require("../../Configuration.js");
const { Command, CommandoClient } = require("discord.js-commando");
const BotData = require("../../System.js");
const token = require("../../Token.js");
const discord = require("discord.js");
const client = new CommandoClient();
const db = require("quick.db");
const chalk = require("chalk");

module.exports = class PowerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'power',
			group: 'bot',
			memberName: 'power',
			description: `Power commands for the bot.`,
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        if(!message.member.hasPermission("ADMINISTRATOR")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000})
			});
			return;
        }
		let words = args.split(' ');
		let PowerAction = words.slice(0).join(' ');
        if (!PowerAction) return message.reply(":warning: Incorrect Usage. Ex: -power <restart or shutdown>").then(message => {
            message.delete({timeout: 10000});
        });

        if (PowerAction == "restart"){
            console.log(chalk.red(`${message.author.tag} Restarted the bot!`));
            const RestartingBot = new discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(":hourglass_flowing_sand: Restarting bot...")
            message.channel.send(RestartingBot);
            client.destroy().then(() => {
                client.login(key);
            });
            const BotOnline = new discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(":white_check_mark: The bot is back online!")
            message.channel.send(BotOnline);
            console.log(chalk.green("The bot is back online!"));
        }
        if (PowerAction == "shutdown"){
            console.log(chalk.red(`${message.author.tag} Shut down the bot!`));
            const TurningOffBot = new discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(":arrows_counterclockwise: Turning off bot...")
            message.channel.send(TurningOffBot).then(message => {
                const BotOffline = new discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(":white_check_mark: The bot is now offline!")
            message.channel.send(BotOffline).then(() => {
                    process.exit();
                });
            });
        }
	}
};