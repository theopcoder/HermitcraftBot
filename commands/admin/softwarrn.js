const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');
const Errors = require("../../Errors");

class SoftWarnCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "softwarn",
            group: "admin",
            memberName: 'softwarn',
            description: 'A verbal warning!'
        });
    }

    async run(message, args)
    {
        if(!message.member.hasPermission("MANAGE_MESSAGES"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        let SoftWarnedUser = message.guild.member(message.mentions.users.first());
        if(!SoftWarnedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        {
            if (!reason) return message.reply(':warning: Please supply a reason for the softwarn!')
            .then(msg => {
                msg.delete(10000)
            })
        }
        {
            message.reply('Has softwarnedwarned '+message.mentions.users.first()+ ' For, '+reason)
        }
    }
}

module.exports = SoftWarnCommand;