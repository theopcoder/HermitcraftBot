const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class BanCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "ban",
            group: "admin",
            memberName: 'ban',
            description: 'Bans a user!'
        });
    }

    async run(message, args)
    {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        if(!message.member.hasPermission("BAN_MEMBERS"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            .then(msg => {
                msg.delete(10000);
            });
            return;
        }
        let BannedUser = message.guild.member(message.mentions.users.first());
        if(!BannedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000);
            });
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        if (!reason) return message.reply(':warning: Please supply a reason for the ban!')
        .then(msg => {
            msg.delete(10000);
        });
        
        db.add(`{reputation}_${message.mentions.members.first().id}`, 1);
        db.add(`{banp}_${message.mentions.members.first().id}`, 1);
        let RepP = db.get(`{reputation}_${message.mentions.users.first().id}`); if (RepP == null)RepP = "0";
        let WarnP = db.get(`{warnp}_${message.mentions.users.first().id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.mentions.users.first().id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.mentions.users.first().id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.mentions.users.first().id}`); if (BanP == null)BanP = "0";
        let users = message.mentions.users.first();

        message.guild.member(BannedUser).ban(reason)
            //.then(console.log)
            .catch(console.error);
        message.mentions.users.first().send(`You have been banned from ${message.guild.name} because, ${reason}.`)

        const ChatBanMessage = new discord.RichEmbed()
            .setColor("0xFFA500")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .setTitle("Ban")
            .setDescription(`
                **Moderator:** ${message.author}
                **User:** ${BannedUser}
                **Reason:** ${reason}
            `)
        message.channel.sendEmbed(ChatBanMessage);

        const BanMessage = new discord.RichEmbed()
            .setColor("0xFFA500")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .setTitle("Ban")
            .setDescription(`
                **Moderator:** ${message.author}
                **User:** ${BannedUser}
                **User ID:** ${message.mentions.users.first().id}
                **Reason:** ${reason}
                **Violations:** ${RepP}
                **Other Offences:** Warnings: ${WarnP} | Mutes: ${MuteP} | Kicks: ${KickP} | Bans: ${BanP}
            `)
        let logchannel = message.guild.channels.find('name', 'logs');
        return logchannel.send(BanMessage);
    }
}

module.exports = BanCommand;