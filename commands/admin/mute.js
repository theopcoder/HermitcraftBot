const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class MuteCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "mute",
            group: "admin",
            memberName: 'mute',
            description: 'Mutes a player.'
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
        let MutedUser = message.guild.member(message.mentions.users.first());
        if(!MutedUser)
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
            if (!reason) return message.reply(':warning: Please supply a reason for the mute!')
            .then(msg => {
                msg.delete(10000)
            });
        }

        let member = message.mentions.members.first();
        let MutedRole = message.guild.roles.find(r => r.name === "Muted");
        member.addRole(MutedRole)
        let MemberRole = message.guild.roles.find(r => r.name === "Member");
        member.removeRole(MemberRole)

        db.add(`{mutep}_${message.mentions.members.first().id}`, 1);
        db.add(`{reputation}_${message.mentions.members.first().id}`, 1);
        db.add(`{CurrentlyMuted}_${message.mentions.users.first().id}`, 1);//This is a chat bypass mute protection module
        let RepP = db.get(`{reputation}_${message.mentions.users.first().id}`); if (RepP == null)RepP = "0";
        let WarnP = db.get(`{warnp}_${message.mentions.users.first().id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.mentions.users.first().id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.mentions.users.first().id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.mentions.users.first().id}`); if (BanP == null)BanP = "0";
        let users = message.mentions.users.first();

        message.mentions.members.first().send(`You have been muted on ${message.guild.name} because, ${reason}.`)

        const ChatMutemsg = new discord.RichEmbed()
            .setColor("0x8B4513")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .addField('Action:', 'Mute')
            .addField(`Moderator:`, message.author)
            .addField(`User:`, message.mentions.users.first())
            .addField(`Reason:`, reason)
            .setFooter(`Successfully logged and muted ${message.mentions.users.first().tag}!`)
        message.channel.sendEmbed(ChatMutemsg)

        const Mutemsg = new discord.RichEmbed()
            .setColor("0x8B4513")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .addField('Action:', 'Mute') 
            .addField('Moderator:', `${message.author}`)
            .addField('Muted User:', message.mentions.users.first())
            .addField("User ID:", message.mentions.users.first().id)
            .addField('Reason:', reason)
            .addField('Offences:', message.mentions.users.first()+" has **"+RepP+"** offence(s).")
            .addField('Info:', message.mentions.users.first()+' Has, '+WarnP+' Warning(s), '+MuteP+' Mute(s), '+KickP+' Kick(s), '+BanP+' Ban(s)!')
        let logchannel = message.guild.channels.find('name', 'logs');
        return logchannel.send(Mutemsg);
    }
}

module.exports = MuteCommand;