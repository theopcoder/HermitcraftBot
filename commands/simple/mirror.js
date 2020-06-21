const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');
const Errors = require("../../Errors");

class MirrorCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "mirror",
            group: "simple",
            memberName: 'mirror',
            description: 'Shows you your pfp!'
        });
    }

    async run(message, args)
    {
        message.reply(message.author.avatarURL)
    }
}

module.exports = MirrorCommand;