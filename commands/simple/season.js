const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class ServerSeasonCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "season",
            group: "simple",
            memberName: 'season',
            description: 'Adds a role to you to people know how long you have been on the server!'
        });
    }

    async run(message, args)
    {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        let role = message.guild.roles.find(role => role.name === "Season 2 Hermitcraft Fan Server Member");
        if (role) 
        message.member.addRole(role);
        message.reply(`Successfully gave you Season 2 role!`);
    }
}

module.exports = ServerSeasonCommand;