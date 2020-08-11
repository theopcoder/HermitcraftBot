const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class MirrorCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "mirror",
            group: "simple",
            memberName: 'mirror',
            description: 'Shows you your pfp or another users pfp!'
        });
    }

    async run(message, args)
    {
        if (message.guild === null){
            message.reply(DMMessage)
            return;
        }
        let MirrorUser = message.guild.member(message.mentions.users.first());
        if (MirrorUser){
            let users = message.mentions.users.first();
            message.reply(users.displayAvatarURL)
        }else{
            message.reply(message.author.avatarURL)
        }
    }
}

module.exports = MirrorCommand;