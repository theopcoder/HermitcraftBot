const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class StoreCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "store",
            group: "economy",
            memberName: 'store',
            description: 'A list of items you can buy with the bot currency!'
        });
    }

    async run(message, args)
    {
        message.reply("This command is coming soon! Stay tuned!")//TODO In next minor release, add this command
    }
}

module.exports = StoreCommand;