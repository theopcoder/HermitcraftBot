const { message } = require("discord.js");
const discord = require("discord.js");
//XXX Temporary command for development

module.exports = {
    name : "test",
    description : "Checks the ping of the bot",
    
    run: async (client, interaction, args, message) => {
        interaction.followUp({content : client.ws.ping + "ms"});
    }
}