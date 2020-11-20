const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class RankCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "rank",
            group: "simple",
            memberName: 'rank',
            description: 'Shows you your rank level!'
        });
    }

    async run(message, args)
    {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        let RankUser = message.guild.member(message.mentions.users.first());
        if (RankUser)
        {   
            let MentionLevel = db.get(`{Level}_${message.mentions.users.first().id}`); if (MentionLevel == null)MentionLevel = "0";
            let MentionXP = db.get(`{xp}_${message.mentions.users.first().id}`); if (MentionXP == null)MentionXP = "0";
            let users = message.mentions.users.first();

            const RankMentions = new discord.RichEmbed()
                .setColor(0x668d3c)
                .setThumbnail(users.displayAvatarURL)
                .setTitle("Rank")
                .addField("User:", message.mentions.users.first())
                .addField("Level: ", MentionLevel)
                .addField("XP: ", MentionXP)
            message.channel.sendEmbed(RankMentions);
        }
        else
        {
            let Level = db.get(`{Level}_${message.author.id}`); if (Level == null)Level = "0";
            let XP = db.get(`{xp}_${message.author.id}`); if (XP == null)XP = "0";
            
            const RankUser = new discord.RichEmbed()
                .setColor(0x668d3c)
                .setThumbnail(message.author.avatarURL)
                .setTitle("Rank")
                .addField("User:", message.author)
                .addField("Level: ", Level)
                .addField("XP: ", XP)
            message.channel.sendEmbed(RankUser);
        }
    }
}

module.exports = RankCommand;