const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class PurgeCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "purge",
            group: "admin",
            memberName: 'purge',
            description: 'Deletes a specified amount of messages.'
        });
    }

    async run(message, args)
    {
        if (message.guild === null){
            message.reply(DMMessage)
            return;
        }
        if(!message.member.hasPermission("MANAGE_MESSAGES"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');
        {
            if (!reason) return message.reply('Please specify the amount of messages you want to purge! Make sure its between 2-99!')
            .then(msg => {
                msg.delete(10000)
            })
            if (reason == "1")return message.reply("The purge must be 2 to 99!")
            .then(msg => {
                msg.delete(10000)
            })
        }
        let messagecount = parseInt(reason);
        message.channel.fetchMessages({ limit: messagecount })
        .then(messages => message.channel.bulkDelete(messages));
    }
}

module.exports = PurgeCommand;