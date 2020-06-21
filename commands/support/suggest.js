const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');
const Errors = require("../../Errors");

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
        message.delete();
        let words = args.split(' ');
        let suggestion = words.slice(0).join(' ');
        {
            if (!suggestion) return message.reply("Please say your suggestion!")
            .then(msg => {
                msg.delete(10000)
            })
        }
        const Suggestionmsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setFooter("Click the green check to like the idea or the red x to not have the suggestion done!")
            .setTitle('Suggestion')
            .addField('User:', 
            `${message.author}`)
            .addField('Sugestion:', suggestion)
        let logchannel = message.guild.channels.find('name', 'suggestions'); 
        logchannel.send(Suggestionmsg).then(embedMessage => {
            embedMessage.react("✅");
            embedMessage.react("❌");
        });
        const SuggestionUsermsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setFooter('Hi Their! This bot is in BETA. If you find any bugs report them in #report-a-bug')
            .setTitle("Suggestion")
            .addField("User:", message.author)
            .addField("Your Suggestion:", suggestion)
            .addField("Thank you for sending in your suggestion! This message is a quick recap of what you suggested! We hope your suggestion gets added! Sincerely,", "-HermitcraftDevTeam")
        message.member.sendEmbed(SuggestionUsermsg);
    }
}

module.exports = SuggestCommand;