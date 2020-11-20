const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class ReportCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "report",
            group: "support",
            memberName: 'report',
            description: 'Send a report to staff about a misbehaving user!'
        });
    }

    async run(message, args)
    {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        message.delete();
        let words = args.split(' ');
        let ReportedUser = words[0];
        let report = words.slice(1).join(' ');

        if (!ReportedUser){
            message.channel.send(`Please say the name of the user, there ID or, mention them so staff know who your reporting! If they have spaces in there names, please use _ Thanks!`)
            .then(msg => {
                msg.delete(10000);
            });
            return;
        }
        if (!report){
            message.channel.send(`Please say the report or else staff cant help you!`)
            .then(msg => {
                msg.delete(10000);
            });
            return;
        }

        const UserReportmsg = new discord.RichEmbed()
            .setColor("0xFF0000")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle("User Report")
            .addField("User:", message.author)
            .addField("Reported User:", ReportedUser)
            .addField("Report:", report)
        let logchannel = message.guild.channels.find('name', 'user-reports'); 
        logchannel.send(UserReportmsg);

        const ConfirmedReport = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle("User Report")
            .addField("Reported User:", ReportedUser)
            .addField("Report:", report)
        message.member.sendEmbed(ConfirmedReport);
    }
}

module.exports = ReportCommand;