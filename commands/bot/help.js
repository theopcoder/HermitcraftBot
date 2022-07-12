const { MessageEmbed } = require("discord.js")

module.exports = {
    name : "help",
    description : "Checks the ping of the bot",
    
    run : async (client, interaction, args, message) => {
        //TODO New layout for help command/finish adding commands.
        const Help = new MessageEmbed()
            .setTimestamp()
            .setColor("RANDOM") //TODO Set a color instead of random
            .setThumbnail(interaction.guild.iconURL())
            .setTitle("Help | Commands")
            .setDescription(`
                BOT COMMANDS
                **help**
                This command
                **ping**
                Shows the bots ping
            `)
            .setFooter({text: "Commands & Descriptions"})
        interaction.followUp({ embeds: [Help] });
    }
};