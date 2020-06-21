const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');
const Errors = require("../../Errors");

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
        if (message.author.bot)return;
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');
        let WarConfirm = words.slice(1).join(' ');

        if (reason == "red")
        {
            if (db.get(`{WarMember}_${message.author.id}`)== 1)return message.reply("Sorry, you have already joined a team!")
            message.reply("Are you sure you want to join the red team? If you do, there's no turning back! Do ```-war red confirmRed``` to proceed!");
        }
        if (WarConfirm == "confirmRed"){
            if (db.get(`{WarMember}_${message.author.id}`)== 1)return message.reply("Sorry, you have already joined a team!")
            db.add(`{RedTeam}_${message.author.id}`, 1)
            db.add(`RedTeamGlobal`, 1)
            db.add(`{WarMember}_${message.author.id}`, 1)
            db.add(`WarMemberGlobal`, 1)

            let WarRole = message.guild.roles.find(r => r.name === "---WarRoles---");
            message.member.addRole(WarRole)
            let RedTeam = message.guild.roles.find(r => r.name === "Red Team");
            message.member.addRole(RedTeam)
            let WarUpdates = message.guild.roles.find(r => r.name === "War Updates");
            message.member.addRole(WarUpdates)
            let WarMember = message.guild.roles.find(r => r.name === "War Member");
            message.member.addRole(WarMember)

            return message.channel.send("Congradulations, "+message.author+"! You have now officially joined the Red Team!");
        }

        if (reason == "blue")
        {
            if (db.get(`{WarMember}_${message.author.id}`)== 1)return message.reply("Sorry, you have already joined a team!")
            message.reply("Are you sure you want to join the blue team? When you do, there's no turning back! Do ```-war blue confirmBlue``` to proceed!");
        }
        if (WarConfirm == "confirmBlue"){
            if (db.get(`{WarMember}_${message.author.id}`)== 1)return message.reply("Sorry, you have already joined a team!")
            db.add(`{BlueTeam}_${message.author.id}`, 1)
            db.add(`BlueTeamGlobal`, 1)
            db.add(`{WarMember}_${message.author.id}`, 1)
            db.add(`WarMemberGlobal`, 1)

            let WarRole = message.guild.roles.find(r => r.name === "---WarRoles---");
            message.member.addRole(WarRole)
            let BlueTeam = message.guild.roles.find(r => r.name === "Blue Team");
            message.member.addRole(BlueTeam)
            let WarUpdates = message.guild.roles.find(r => r.name === "War Updates");
            message.member.addRole(WarUpdates)
            let WarMember = message.guild.roles.find(r => r.name === "War Member");
            message.member.addRole(WarMember)

            return message.channel.send("Congradulations, "+message.author+"! You have now officially joined the Blue Team!");
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