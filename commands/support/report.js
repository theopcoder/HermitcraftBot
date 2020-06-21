const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');
const Errors = require("../../Errors");

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
        message.delete();
        let words = args.split(' ');
        let report = words.slice(0).join(' ');
        {
            if (!report) return message.reply("Please say the name of the user and what they where doing, alongside proof if possible!")
            .then(msg => {
                msg.delete(10000)
            })
        }
        const UserReportmsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setFooter("Click the green check to like the idea or the red x to not have the suggestion done!")
            .setTitle('Player Report')
            .addField('User reporting:', 
            `${message.author}`)
            .addField('Report:', report)
        let logchannel = message.guild.channels.find('name', 'user-reports'); 
        logchannel.send(UserReportmsg)

        const UserReportermsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setFooter('Hi Their! This bot is in BETA. If you find any bugs report them in #report-a-bug')
            .setTitle("Player Report")
            .addField("Your report:", report)
            .addField("Thank you for reporting the user! Our staff team will take care of the issue as soon as possible! Stay safe! Sincerely, ", "-Hermitcraft Staff Team")
        message.member.sendEmbed(UserReportermsg);
    }
}

module.exports = ReportCommand;