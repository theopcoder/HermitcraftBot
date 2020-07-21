const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

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
        let user = message.author;
        const BotChangeLogmsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setFooter("Hello! Have you encountered any bugs, errors or, issues? Well, head to #bug-reports and do -bug so we can fix the issue as soon as possible! Sincerely, Hermitcraft BotDev")
            .setTitle("Bot ChangeLog")
            .addField("Bot Dev:", "TheMLGDude#2177(GitHub: theopcoder)")
            .addField("Bot Version", Version)
            .addField("Latest Update Name:", VersionName)
            .addField("Changelog:", "Visit https://github.com/theopcoder/HermitcraftBot/tree/master/Changelogs then head to the 1.0.0+ Changelog to see the latest bot updates!")
            .addField("These are the most recent bot updates! Thanks for checking them out! Sincerely,", "BotDev")
        message.member.sendEmbed(BotChangeLogmsg);

        message.channel.send("Successfully sent the Bot Changelog")
    }
}

module.exports = BotChangeCommand;