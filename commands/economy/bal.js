const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

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
        if (message.guild === null){
            message.reply(DMMessage)
            return;
        }
        let BalUser = message.guild.member(message.mentions.users.first());
        {
            if (BalUser)
            {
                let MentionedUsersBalance = db.get(`{money}_${message.mentions.users.first().id}`); if (MentionedUsersBalance == null)MentionedUsersBalance = "0";
                let users = message.mentions.users.first();
                const MentionedUsersMoney = new discord.RichEmbed()
                    .setColor(0x668d3c)
                    .setThumbnail(users.displayAvatarURL)
                    .setTitle("Balance")
                    .addField("User:", message.mentions.users.first())
                    .addField("Money:", `$${MentionedUsersBalance}`)
                message.channel.sendEmbed(MentionedUsersMoney);
            }else{
                let UserBalance = db.get(`{money}_${message.author.id}`); if (UserBalance == null)UserBalance = "0";
                const UserMoney = new discord.RichEmbed()
                    .setColor(0x668d3c)
                    .setThumbnail(message.author.avatarURL)
                    .setTitle("Balance")
                    .addField("User:", message.author)
                    .addField("Money:", `$${UserBalance}`)
                message.channel.sendEmbed(UserMoney);
            }
        }
    }
}

module.exports = BalCommand;