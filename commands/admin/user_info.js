const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

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

        let Money = db.get(`{money}_${message.mentions.users.first().id}`); if (Money == null)Money = "0";
        let Level = db.get(`{Level}_${message.mentions.users.first().id}`); if (Level == null)Level = "0";
        let XP = db.get(`{xp}_${message.mentions.users.first().id}`); if (XP == null)XP = "0";
        let RepP = db.get(`{reputation}_${message.mentions.users.first().id}`); if (RepP == null)RepP = "0";
        let WarnP = db.get(`{warnp}_${message.mentions.users.first().id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.mentions.users.first().id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.mentions.users.first().id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.mentions.users.first().id}`); if (BanP == null)BanP = "0";
        let users = message.mentions.users.first();

        const Userinfo = new discord.RichEmbed()
            .setColor("0x43c90e")
            .setThumbnail(users.displayAvatarURL)
            .setTimestamp()
            .addField ('Info requester: ', message.author)
            .addField('User: ', message.mentions.users.first())
            .addField('Rep Points: ', RepP)
            .addField('Money: ', Money)
            .addField('Rank:', `**Level:** ${Level} **XP:** ${XP}`)
            .addField('Info: ', message.mentions.users.first()+' Has, '+WarnP+' Warn(s), '+MuteP+' Mute(s), '+KickP+' Kick(s), '+BanP+' Ban(s)')
            .setFooter('This is the user information I was able to pull up!')
        message.channel.sendEmbed(Userinfo);
    }
}

module.exports = UserInfoCommand;