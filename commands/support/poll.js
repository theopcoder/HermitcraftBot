const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class PollCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "poll",
            group: "support",
            memberName: 'poll',
            description: 'Create a poll!'
        });
    }

    async run(message, args)
    {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        let words = args.split(' ');
        let poll = words.slice(0).join(' ');
        if (!poll) return message.reply("What's the poll?").then(msg => {
            msg.delete(10000);
        });

        db.add("PollNumber", 1)

        const PollMessage = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle(`Poll ${db.get("PollNumber")}`)
            .setDescription(`
                ${poll}
            `)
        let PollChannel = message.guild.channels.find('name', 'polls'); 
        PollChannel.send(PollMessage);
    }
}

module.exports = PollCommand;