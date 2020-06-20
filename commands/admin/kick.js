const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');

class KickCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "kick",
            group: "admin",
            memberName: 'kick',
            description: 'Kicks a user!'
        });
    }

    async run(message, args)
    {
        if(!message.member.hasPermission("KICK_MEMBERS"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        let kickedUser = message.guild.member(message.mentions.users.first());
        if(!kickedUser)
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
            if (!reason) return message.reply(':warning: Please supply a reason for the kick!')
            .then(msg => {
                msg.delete(10000)
            })
        }
        {
            message.mentions.members.first().send("Hi there! You have been kicked from Hermitcraft Fan Server because, "+reason+".")
        }
        message.guild.member(KickedUser).kick(reason)
            .then(console.log)
            .catch(console.error);
            {
                message.reply("has kicked, "+message.mentions.users.first()+' for, '+reason)
                .then(msg => {
                    msg.delete(10000)
                })
            }
            {
                db.get(`{kickp}_${message.mentions.members.first().id}`)
                db.add(`{kickp}_${message.mentions.members.first().id}`, 1);
            }
            {
                db.get(`{reputation}_${message.mentions.members.first().id}`)
                db.add(`{reputation}_${message.mentions.members.first().id}`, 1);
            }
            const kickmsg = new discord.RichEmbed()
            .setColor("0xff0000")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .addField('Action:', 'Kick') 
            .addField('Staff:', 
            `${message.author.tag}`)
            .addField('Kicked User:', message.mentions.users.first())
            .addField("User ID:", message.mentions.users.first().id)
            .addField('Reason', reason)
            .addField('Offences: ', 'This is, '+message.mentions.users.first()+' '+db.get(`{reputation}_${message.mentions.users.first().id}`)+' offence!')
            .addField('Info: ', message.mentions.users.first()+' Has, '+db.get(`{warnp}_${message.mentions.users.first().id}`)+' Warning(s), '+db.get(`{mutep}_${message.mentions.users.first().id}`)+' Mute(s), '+db.get(`{kickp}_${message.mentions.users.first().id}`)+' Kick(s), '+db.get(`{banp}_${message.mentions.users.first().id}`)+' Ban(s)!')
            message.channel.send(`This has been logged and a rep point was added`)
            let logchannel = message.guild.channels.find('name', 'logs'); 
            return logchannel.send(kickmsg);
    }
}

module.exports = KickCommand;