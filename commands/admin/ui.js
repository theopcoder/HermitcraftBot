const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');
const Errors = require("../../Errors");

class UserInfoCommand extends Commando.Command
{
    constructor(client) 
    {
        super(client,{
            name: "ui", 
            group: "admin",
            memberName: 'ui',
            description: 'Shows the mentioned users info.'
        });
    }

    async run(message, args)
    {
        if(!message.member.hasPermission("MANAGE_MESSAGES"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            return;
        }
        let InfoUser = message.guild.member(message.mentions.users.first());
        if(!InfoUser)
        {
            message.channel.send("Sorry, I couldn't find that user")
            return;
        }
        {
            const serverinfo = new discord.RichEmbed()
            .setColor("0x43c90e")
            .setThumbnail(message.author.avatarURL)
            .setTimestamp()
            .addField ('Info requester: ', message.author.tag)
            .addField('User: ', message.mentions.users.first())
            .addField('Rep Points: ', db.get(`{reputation}_${message.mentions.members.first().id}`))
            .addField('Money: ', db.get(`{money}_${message.mentions.members.first().id}`))
            .addField('Level:', db.get(`{Level}_${message.mentions.members.first().id}`))
            .addField('Info: ', message.mentions.users.first()+' Has, '+db.get(`{warnp}_${message.mentions.users.first().id}`)+' Warns, '+db.get(`{mutep}_${message.mentions.users.first().id}`)+' Mutes, '+db.get(`{kickp}_${message.mentions.users.first().id}`)+' Kicks, '+db.get(`{banp}_${message.mentions.users.first().id}`)+' Bans')
            .setFooter('This is the ui I was able to pull up!')
            message.channel.sendEmbed(serverinfo);
        }
    }
}

module.exports = UserInfoCommand;