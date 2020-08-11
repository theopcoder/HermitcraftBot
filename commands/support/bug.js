const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

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
        if (message.guild === null){
            message.reply(DMMessage)
            return;
        }
        let words = args.split(' ');
        let bug = words.slice(1).join(' ');
        {
            if (!bug) return message.reply("Please report the bug and say where the bug occured!")
            .then(msg => {
                msg.delete(10000)
            });
        }

        db.add("BugNumber", 1)

        const Bugmsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle('Bug Report')
            .addField('User:', message.author)
            .addField('Bug location:', words[0])
            .addField("Bug Number:", db.get("BugNumber"))
            .addField("Bug report: ", bug)
            .setFooter("Thank you for sending your bug report! Developers will look at the issue as soon as possible! Sincerely, Hermitcraft DevTeam")
        let logchannel = message.guild.channels.find('name', 'bug-reports'); 
        logchannel.send(Bugmsg);

        const BugUsermsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle("Bug Report")
            .addField("Bug Location:", words[0])
            .addField("Bug Number:", db.get("BugNumber"))
            .addField("Bug Report Message:", bug)
            .setFooter("Thank you for sending your bug report! Developers will look at the issue as soon as possible! Sincerely, Hermitcraft DevTeam")
        message.member.sendEmbed(BugUsermsg);
    }
}

module.exports = BugCommand;