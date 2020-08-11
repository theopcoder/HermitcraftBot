const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class WarCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "war",
            group: "war",
            memberName: 'war',
            description: "Let's you view, join a war list."
        });
    }

    async run(message, args)
    {
        if (message.guild === null){
            message.reply(DMMessage)
            return;
        }
        const Warinfo = new discord.RichEmbed()
            .setColor('0xffa500')
            .setTimestamp()
            .setTitle('Minecraft WAR!')
            .setFooter('Who will win? Will it be you or, will it be your enemy?')
            .addField('Members: ', db.get(`WarMemberGlobal`))
            .addField('War Members:', message.guild.roles.get('721920054660431912').members.map(m=>m.user.tag).join('\n')+",are in the war!")
            .addField('Red Team Members: ', message.guild.roles.get('721920044019482675').members.map(m=>m.user.tag).join('\n')+",are in the RedTeam!")
            .addField('Blue Team Members:', message.guild.roles.get('721920050361139260').members.map(m=>m.user.tag).join('\n')+",are in the BlueTeam!")
            .addField('Instructions', "Have you joined a team yet? If not, do -war blue OR -war red to choose your team!")
        message.channel.sendEmbed(Warinfo);
    }
}

module.exports = WarCommand;