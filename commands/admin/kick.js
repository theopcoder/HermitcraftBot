const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

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
        if (message.guild === null){
            message.reply(DMMessage)
            return;
        }
        if(!message.member.hasPermission("KICK_MEMBERS"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        let kickedUser = message.guild.member(message.mentions.users.first());
        if(!kickedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        
        if (!reason) return message.reply(':warning: Please supply a reason for the kick!')
        .then(msg => {
            msg.delete(10000)
        });

        message.guild.member(kickedUser).kick(reason)
        //.then(console.log)
        .catch(console.error)

        db.add(`{kickp}_${message.mentions.members.first().id}`, 1);
        db.add(`{reputation}_${message.mentions.members.first().id}`, 1);
        let RepP = db.get(`{reputation}_${message.mentions.users.first().id}`); if (RepP == null)RepP = "0";
        let WarnP = db.get(`{warnp}_${message.mentions.users.first().id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.mentions.users.first().id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.mentions.users.first().id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.mentions.users.first().id}`); if (BanP == null)BanP = "0";
        let users = message.mentions.users.first();

            //User to be members
        message.mentions.users.first().send(`You have been kicked from ${message.guild.name} because, ${reason}.`)

        const ChatKickmsg = new discord.RichEmbed()
            .setColor("0xF2771D")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .addField('Action:', 'Kick')
            .addField(`Moderator:`, message.author)
            .addField(`User:`, message.mentions.users.first())
            .addField(`Reason:`, reason)
            .setFooter(`Successfully logged and kicked ${message.mentions.users.first().tag}!`)
        message.channel.sendEmbed(ChatKickmsg)

        const Kickmsg = new discord.RichEmbed()
            .setColor("0xF2771D")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .addField('Action:', 'Kick') 
            .addField('Staff:', `${message.author}`)
            .addField('Kicked User:', message.mentions.users.first())
            .addField("User ID:", message.mentions.users.first().id)
            .addField('Reason:', reason)
            .addField('Offences: ', message.mentions.users.first()+" has **"+RepP+"** offence(s).")
            .addField('Info:', message.mentions.users.first()+`${WarnP} Warn(s), ${MuteP} Mute(s), ${KickP} Kick(s), ${BanP} Bans!`)
        let logchannel = message.guild.channels.find('name', 'logs'); 
        return logchannel.send(Kickmsg);
    }
}

module.exports = KickCommand;