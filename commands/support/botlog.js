const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');
const Errors = require("../../Errors");

class BotChangeCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "botlog",
            group: "support",
            memberName: 'botlog',
            description: 'Tells you the latest changes for the bot!'
        });
    }

    async run(message, args)
    {
        const BotChangeLogmsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setFooter("Hi there! Did you encounter a bug/error with the bot? Make sure to do report the bug using -bug! Thanks! -Hermitcraft BotDev")
            .setThumbnail(client.guild.avatarURL)
            .setTitle("Bot ChangeLog")
            .addField("Bot Dev:", "TheMLGDude#2177")
            .addField("Bot Version", "0.2.1")
            .addField("Changelog:", "PlaceHolder")
            .addField("These are the key changes in the latest bot update! Sincerely,", "-Hermitcraft BotDev")
        message.member.sendEmbed(BotChangeLogmsg);
    }
}

module.exports = BotChangeCommand;