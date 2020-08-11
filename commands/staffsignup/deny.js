const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class DenyApplicationCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "deny",
            group: "staffsignup",
            memberName: 'deny',
            description: 'Lets you apply for staff!'
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
            message.channel.send(":warning: You do NOT have the permission to perform this command! :warning:")
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        let AcceptApplicationUser = message.guild.member(message.mentions.users.first());
        if (!AcceptApplicationUser){
            message.channel.send(":warning: Please mention a user application to accept!")
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        if (db.get(`{ApplicationSent}_${message.mentions.users.first().id}`)== null){
            message.reply(`${message.mentions.users.first()} hasn't signed up for staff!`);
            return;
        }
        if (db.get(`{ApplicationSent}_${message.mentions.users.first().id}`)== 0){
            message.reply(`${message.mentions.users.first()} hasn't signed up for staff!`);
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        if (!reason){
            message.reply(`Please decribe why your accepting ${message.mentions.users.first()} application request!`)
            return;
        }
        let users = message.mentions.users.first();
        const ApplicationConfirmation = new discord.RichEmbed()
            .setColor("0xFFCC00")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle("Denied Staff Member Confirmation Alert")
            .addField("User:", message.mentions.users.first())
            .addField("User ID:", message.mentions.users.first().id)
            .addField("Acception Message:", reason)
        message.member.sendEmbed(ApplicationConfirmation)

        const UserDeniedmsg = new discord.RichEmbed()
            .setColor("0x00008B")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .setAuthor(message.mentions.users.first().tag, users.displayAvatarURL)
            .setTitle("Application Denied! :anguished: ")
            .addField("Sorry, your application has been denied.", reason)
        message.mentions.users.first().sendEmbed(UserDeniedmsg);
        db.subtract(`{ApplicationSent}_${message.author.id}`, 1)
    }
}

module.exports = DenyApplicationCommand;