const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class UnmuteCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "unmute",
            group: "admin",
            memberName: 'unmute',
            description: 'Unmutes a user'
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
            });
            return;
        }
        let bannedUser = message.guild.member(message.mentions.users.first());
        if(!bannedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        {
            if (!reason) return message.reply(':warning: Please supply a reason for the unmute!')
            .then(msg => {
                msg.delete(10000)
            });
        }

        let member = message.mentions.members.first();
        let MemberRole = message.guild.roles.find(r => r.name === "Member");
        member.addRole(MemberRole)
        let MutedRole = message.guild.roles.find(r => r.name === "Muted");
        member.removeRole(MutedRole)

        db.subtract(`{CurrentlyMuted}_${message.mentions.users.first().id}`, 1);
        db.delete(`{AMPSMuteBypass}_${message.mentions.users.first().id}`);

        let users = message.mentions.users.first();
        message.mentions.members.first().send(`You have been unmuted on ${message.guild.name} because, `+reason+".")

        const ChatUnmutemsg = new discord.RichEmbed()
            .setColor("0x00FF00")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .addField('Action:', 'Unmute')
            .addField(`Moderator:`, message.author)
            .addField(`User:`, message.mentions.users.first())
            .addField(`Reason:`, reason)
            .setFooter(`Successfully logged and unmuted ${message.mentions.users.first().tag}!`)
        message.channel.sendEmbed(ChatUnmutemsg)

        const Unmutemsg = new discord.RichEmbed()
            .setColor("0x00FF00")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .addField('Action:', 'Unmute') 
            .addField('Moderator:', `${message.author}`)
            .addField('Unmuted User:', message.mentions.users.first())
            .addField("User ID:", message.mentions.users.first().id)
            .addField('Reason:', reason)
        let logchannel = message.guild.channels.find('name', 'logs');
        return logchannel.send(Unmutemsg);
    }
}

module.exports = UnmuteCommand;