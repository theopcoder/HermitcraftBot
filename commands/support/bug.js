const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');
const Errors = require("../../Errors");

class BugCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "bug",
            group: "support",
            memberName: 'bug',
            description: 'Send a bug report to developers!'
        });
    }

    async run(message, args)
    {
        let words = args.split(' ');
        let bug = words.slice(1).join(' ');
        {
            if (!bug) return message.reply("Please report the bug and say where the bug occured!")
            .then(msg => {
                msg.delete(10000)
            });
        }

        const Bugmsg = new discord.RichEmbed()
        .setColor("0x20B2AA")
        .setTimestamp()
        .setFooter("Thank you for sending your bug report! Developers will look at the issue as soon as possible! Sincerely, Hermitcraft DevTeam")
        .setTitle('Bug Report')
        .addField('Bug location:', words[0])
        .addField('User:', message.author)
        .addField("Bug report: ", bug)
        let logchannel = message.guild.channels.find('name', 'bug-reports'); 
        logchannel.send(Bugmsg);

        const BugUsermsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setFooter('Hi Their! This bot is in BETA. If you find any bugs report them in #report-a-bug')
            .setTitle("Bug Report")
            .addField("Bug Location", words[0])
            .addField("Bug Report:", bug)
            .addField("Thank you for sending your bug report! Developers will look at the issue as soon as possible! Sincerely, ", "Hermitcraft DevTeam")
        message.member.sendEmbed(BugUsermsg);
    }
}

module.exports = BugCommand;