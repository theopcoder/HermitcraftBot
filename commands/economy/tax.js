const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class TaxCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "tax",
            group: "economy",
            memberName: 'tax',
            description: 'Shows you have much money is in your account!'
        });
    }

    async run(message, args)
    {
        if (message.guild === null){
            message.reply(DMMessage)
            return;
        }
        if(!message.member.hasPermission("ADMINISTRATOR"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        let TaxedUser = message.guild.member(message.mentions.users.first());
        if(!TaxedUser){
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        let words = args.split(' ');
        let tax = words.slice(1).join(' ');
        if (!tax) return message.reply(`:warning: How much money do you want to tax ${TaxedUser}?`)
        .then(msg => {
            msg.delete(10000)
        });
        if (isNaN(words[1])){
            message.reply(`:warning: You can only use numbers for taxing someone! Example: -tax ${message.author} 1000`)
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        let Extra = (words[2]);
        if (Extra){
            message.channel.send(`:warning: Incorrect command usage! Please make sure you are doing the command correctly! Example -tax ${message.author} 1000`)
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        let TaxedUserBal = db.get(`{money}_${message.mentions.users.first().id}`); if (TaxedUserBal == null)TaxedUserBal = "0";
        if (TaxedUserBal < tax)return message.reply(`${TaxedUser} doesn't have **$${tax}**! They only have **$${TaxedUserBal}**. That is **$${tax-TaxedUserBal}** more than what they have!`)
        db.subtract(`{money}_${message.mentions.users.first().id}`, tax)
        let NewTaxedUserBal = db.get(`{money}_${message.mentions.users.first().id}`); if (NewTaxedUserBal == null)NewTaxedUserBal = "0";
        message.reply(`Successfully taxed ${TaxedUser} **$${tax}**! They now have **$${NewTaxedUserBal}**!`)
    }
}

module.exports = TaxCommand;