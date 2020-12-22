const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class AcceptApplicationCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "accept",
            group: "staffsignup",
            memberName: 'accept',
            description: 'Accepts a users application!'
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
            .setTitle("New Staff Member Confirmation Alert")
            .addField("User:", message.mentions.users.first())
            .addField("User ID:", message.mentions.users.first().id)
            .addField("Acception Message:", reason)
        message.member.sendEmbed(ApplicationConfirmation)

        const StaffChatMessage = new discord.RichEmbed()
            .setColor('0x228B22')
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle("New Staff Member! :tada:")
            .addField("Member:", message.mentions.users.first())
            .addField("Welcome!", `Make sure to welcome ${message.mentions.users.first().tag} and show them arround!`)
        let AlertChannel = message.guild.channels.find('name', 'staff-chat'); 
        AlertChannel.send(StaffChatMessage);

        const UserAcceptmsg = new discord.RichEmbed()
            .setColor("0x008000")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .setAuthor(message.mentions.users.first().tag, users.displayAvatarURL)
            .setTitle("Application Accepted! :tada:")
            .addField("Congradulations, your application has been accepted!", reason)
            .addField("Other Info:", "You will recieve your roles soon! Make sure to be patient!")
            .setFooter('Congrats on becoming a staff member! Good luck!')
        message.mentions.users.first().sendEmbed(UserAcceptmsg);

        db.subtract(`{ApplicationSent}_${message.mentions.users.first().id}`, 1);
        let member = message.mentions.members.first();
        let StaffRole = message.guild.roles.find(r => r.name === "Staff");
        member.addRole(StaffRole)
        let TraineeRole = message.guild.roles.find(r => r.name === "Trainee");
        member.addRole(TraineeRole)
    }
}

module.exports = AcceptApplicationCommand;