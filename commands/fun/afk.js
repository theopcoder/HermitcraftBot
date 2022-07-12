const { message } = require("discord.js");
const discord = require('discord.js');

module.exports = {
    name : "afk",
    description : "Checks the ping of the bot",
    category: 'Info',
    usage: '[name] (optional)',
    
    run : async (client, interaction, args, message) => {
        interaction.followUp("is now afk!");
    }
}