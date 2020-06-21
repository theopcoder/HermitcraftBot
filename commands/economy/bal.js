const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');
const Errors = require("../../Errors");

class BalCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "bal",
            group: "economy",
            memberName: 'bal',
            description: 'Shows you have much money is in your account!'
        });
    }

    async run(message, args)
    {
        let BalUser = message.guild.member(message.mentions.users.first());
        {
            if (BalUser)
            {   
                const UserMoney = new discord.RichEmbed()
                .setColor(0x668d3c)
                .setThumbnail(message.author.avatarURL)
                .setTitle("Balance")
                .addField("User:", message.mentions.users.first())
                .addField("Money:", "$"+db.get(`{money}_${message.mentions.users.first().id}`))
                message.channel.sendEmbed(UserMoney);
            }
            else
            {
                const UserMoney2 = new discord.RichEmbed()
                .setColor(0x668d3c)
                .setThumbnail(message.author.avatarURL)
                .setTitle("Balance")
                .addField("User:", message.author)
                .addField("Money:", "$"+db.get(`{money}_${message.author.id}`))
                message.channel.sendEmbed(UserMoney2);
            }
        }
    }
}

module.exports = BalCommand;