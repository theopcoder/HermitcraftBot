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
            message.reply(DMMessage);
            return;
        }
        if(!message.member.hasPermission("KICK_MEMBERS"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            .then(msg => {
                msg.delete(10000);
            });
            return;
        }
        let KickedUser = message.guild.member(message.mentions.users.first());
        if(!KickedUser)
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
            msg.delete(10000);
        });

        db.add(`{kickp}_${message.mentions.members.first().id}`, 1);
        db.add(`{reputation}_${message.mentions.members.first().id}`, 1);
        let RepP = db.get(`{reputation}_${message.mentions.users.first().id}`); if (RepP == null)RepP = "0";
        let WarnP = db.get(`{warnp}_${message.mentions.users.first().id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.mentions.users.first().id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.mentions.users.first().id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.mentions.users.first().id}`); if (BanP == null)BanP = "0";
        let users = message.mentions.users.first();

        message.mentions.users.first().send(`You have been kicked from ${message.guild.name} because, ${reason}.`).then(message => {
            KickedUser.kick(reason);
        });

        const ChatKickMessage = new discord.RichEmbed()
            .setColor("0xFFA500")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .setTitle("Kick")
            .setDescription(`
                **Moderator:** ${message.author}
                **User:** ${KickedUser}
                **Reason:** ${reason}
            `)
        message.channel.sendEmbed(ChatKickMessage);

        const KickMessage = new discord.RichEmbed()
            .setColor("0xFFA500")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .setTitle("Kick")
            .setDescription(`
                **Moderator:** ${message.author}
                **User:** ${KickedUser}
                **User ID:** ${message.mentions.users.first().id}
                **Reason:** ${reason}
                **Violations:** ${RepP}
                **Other Offences:** Warnings: ${WarnP} | Mutes: ${MuteP} | Kicks: ${KickP} | Bans: ${BanP}
            `)
        let logchannel = message.guild.channels.find('name', 'logs');
        return logchannel.send(KickMessage);
    }
}

module.exports = KickCommand;