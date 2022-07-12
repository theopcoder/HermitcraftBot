const { message } = require("discord.js")

module.exports = {
    name : "ping",
    description : "Checks the ping of the bot",
    
    run : async (client, interaction, args, message) => {
        interaction.followUp({content : client.ws.ping + "ms"})
    }
}