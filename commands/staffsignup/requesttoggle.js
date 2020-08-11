const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class OpenClosedCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "apprtoggle",
            group: "staffsignup",
            memberName: 'apprtoggle',
            description: 'This will open/close application requests!' 
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
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');

        if (!reason) return message.reply('Do you want to open or close application requests? EXP: -apprtoggle open or -apprtoggle close')
        .then(msg => {
            msg.delete(10000)
        });
        if (reason == 'open'){
            if (db.get("closedrequests")== 1)return message.reply("Sorry, Application Requests are already **open!**");
            db.add("closedrequests", 1)
            
            const OpenApplications = new discord.RichEmbed()
                .setColor(0x668d3c)
                .setTimestamp()
                .setTitle("Application Requests                                 :white_check_mark:")
                .addField("Turned on Application Requests:", "Successfully turned on Application Requests!")
            message.channel.sendEmbed(OpenApplications);
        }
        if (reason == 'close'){
            if (db.get("closedrequests")== 0)return message.reply("Sorry, Application Requests are already **closed!**");
            db.subtract("closedrequests", 1)+message.reply("Successfully **closed** Application Requests!");

            const OpenApplications = new discord.RichEmbed()
                .setColor(0x9E265B)
                .setTimestamp()
                .setTitle("Application Requests                                 :x:")
                .addField("Turned off Application Requests:", "Successfully turned off Application Requests!")
            message.channel.sendEmbed(OpenApplications);
        }
    }
}

module.exports = OpenClosedCommand;