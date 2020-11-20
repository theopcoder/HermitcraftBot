const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class SuggestCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "suggest",
            group: "support",
            memberName: 'suggest',
            description: 'Sends your suggestion to #suggestions!'
        });
    }

    async run(message, args)
    {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        message.delete();
        let words = args.split(' ');
        let suggestion = words.slice(0).join(' ');
        if (!suggestion) return message.reply("Please say your suggestion!")
        .then(msg => {
            msg.delete(10000);
        });
        
        const Suggestionmsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setTitle('Suggestion')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setThumbnail(message.author.avatarURL)
            .addField('User:', 
            `${message.author}`)
            .addField('Sugestion:', suggestion)
            .setFooter("Click the green check to like the idea or the red x to not have the suggestion done!")
        let logchannel = message.guild.channels.find('name', 'suggestions'); 
        logchannel.send(Suggestionmsg).then(embedMessage => {
            embedMessage.react("✅");
            embedMessage.react("❌");
        });
        const SuggestionUsermsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setTitle("Suggestion")
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setThumbnail(message.author.avatarURL)
            .addField("User:", message.author)
            .addField("Your Suggestion:", suggestion)
            .setFooter("Thank you for your suggestion! This is just a quick recap of what you suggested! Good luck! Sincerely, HC Dev Team")
        message.member.sendEmbed(SuggestionUsermsg);
    }
}

module.exports = SuggestCommand;