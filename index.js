const BootLoader = require("./BootLoader.js");
BootLoader.StartUpChecks();
const { CommandoClient } = require("discord.js-commando");
const BotConfiguration = require("./Configuration.js");
const BadWords = require("./BadWords.js");
const System = require("./System.js");
const discord = require("discord.js");
const token = require("./Token.js");
const chalk = require("chalk");
const db = require("quick.db");
const path = require("path");
const fs = require("fs");
const ms = require("ms");

const bot = new CommandoClient({
	commandPrefix: BotPrefix,
    owner: ServerOwnerID,
});

bot.registry
	.registerDefaultTypes()
	.registerGroups([
        ['admin', 'Admin'],
        ['bot', "Bot"],
        ['economy', 'Economy'],
        ['fun', 'Fun Commands'],
        ['support', 'Support'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));
//End of command registration
bot.login(key);

bot.on('ready', function(){
    bot.user.setActivity(ActivityMessage);
    console.log(`Successfully Signed Into: ${bot.user.tag}`);
    console.log(`Bot Developer: ${Developer}`);
    console.log(`Build Version: ${BuildID}`);
    console.log(`Running Version: ${Version}`);
});

//New Member Message
bot.on('guildMemberAdd', member => {
    //Welcome Message
    const NewMemberMessage = new discord.MessageEmbed()
        .setTimestamp()
        .setColor("RANDOM")
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle(`Welcome to ${member.guild.name}, ${member.user.tag}!`)
        .setDescription(`
            :globe_with_meridians: Discord: https://discord.gg/AURDPCN
            :satellite: Minecraft IP: <#704460219521957907>

            ${member}, you are the ${member.guild.memberCount} member!
            Don't forget to read <#703833697153187840> and <#704893263177580544>!
        `)
    let NewMemberChannel = member.guild.channels.cache.get(WelcomeChannelID);
    NewMemberChannel.send(NewMemberMessage);

    //New Member Role
    let MemberRole = member.guild.roles.cache.get(NewMemberRoleID);
    member.roles.add(MemberRole);
});

//Member Leaves
bot.on('guildMemberRemove', member => {
    const MemberLeaveMessage = new discord.MessageEmbed()
        .setTimestamp()
        .setColor("#00008b")
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle("Lost a member")
        .setDescription(`
            ${member} (${member.user.tag}) left the server :(
        `)
    let MemberLeaveChannel = member.guild.channels.cache.get(MemberLeaveChannelID);
    MemberLeaveChannel.send(MemberLeaveMessage);
});

bot.on('message', function(message){
    //Message Reactions
    if (message.content == "1234"){
        message.reply("I declare a Ginger war!");
    }
    if (message.content == "4321"){
        message.reply("Are you sure about that?");
    }
    if (message.content == "pizza"){
        message.reply("Can I have a slice of pizza? Please?");
    }
    if (message.content == "Bob Bingi"){
        message.channel.send("It's the one and only Bob Bingi! Introducing Markiplier and B.B! https://www.youtube.com/watch?v=0Pocn8aSWS4 make sure to watch!");
    }
    if (message.content == "dapopo"){
        message.reply("You knew him?");
    }
    //Listener for Minecraft IP
    var MCIPListener = [" ip ", " address "];
    let msg = message.content.toLowerCase();
    for (x = 0; x < MCIPListener.length; x++){
        if (msg.includes(MCIPListener[x])){
            if (message.author.bot)return;
            message.reply("If you need the IP for the Minecraft server, please visit <#704460219521957907>!");
        }
    }
    //Level Up System
    if (db.get("settings.LevelUpSystem")== 1){
        if (message.author.bot)return;
        if (message.guild === null)return;
        if (message.channel.id === `${ChannelExcludeID}`)return;
        var randomXP = Math.floor(Math.random() * RandomXP);
        db.add(`${message.author.id}.basic.xp`, randomXP);

        //Level Up Message
        if (db.get(`${message.author.id}.basic.xp`) > MaxXP){
            if (message.author.bot)return;
            if (message.guild === null)return;
            db.delete(`${message.author.id}.basic.xp`);
            db.add(`${message.author.id}.basic.level`, 1);
            db.add(`${message.author.id}.basic.money`, LevelUpMoney);

            const LevelUpMessage = new discord.MessageEmbed()
                .setColor('0x0000FF')
                .setTimestamp()
                .setThumbnail(message.author.displayAvatarURL())
                .setTitle(":tada: Level Up!")
                .setDescription(`
                    **User:** ${message.author}
                    **Level:** ${db.get(`${message.author.id}.basic.level`)}
                `)
                .setFooter(`You have received $${LevelUpMoney}! Nice job!`)
            let LevelUpChannel = message.guild.channels.cache.get(LevelUpChannelID);
            LevelUpChannel.send(LevelUpMessage);
        }
    }
});

//Auto Moderation
bot.on('message', function(message){
    if (db.get("settings.AutoModeration")== 1){
        if (message.guild === null)return;
        if (message.author.bot)return;
        let ModLogChannel = message.guild.channels.cache.get(ModLogID);

        //Auto Moderation Bypass
        if (message.member.hasPermission(AMBypassPermissionCheck)){
            return;
        }

        //Mute Bypass Protection
        if (db.get("AutoModeration.MuteBypassProtection") == "1"){
            if (db.get(`${message.author.id}.admin.CurrentlyMuted`)== 1){
                message.delete();
                db.add(`${message.author.id}.admin.TimesBypassedMute`, 1);
                let MuteRole = message.guild.roles.cache.get(MuteRoleID);
                message.member.roles.add(MuteRole);

                //Chat Response
                const MuteBypassMessage = new discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("")//Keep Empty
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription(`
                        **Mute Bypasses:** ${db.get(`${message.author.id}.admin.TimesBypassedMute`)}
                    `)
                    .setFooter("Auto Moderation: Mute Bypass")
                message.channel.send(MuteBypassMessage).then(message => {
                    message.delete({timeout: 15000});
                });

                //Logged Response
                const MuteBypassMessageLog = new discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("")//Keep Empty
                    .setAuthor("Mute Bypass | "+message.author.tag, message.author.displayAvatarURL())
                    .setDescription(`
                        **User:** ${message.author}
                        **Channel:** ${message.channel}
                        **Bypasses:** ${db.get(`${message.author.id}.admin.TimesBypassedMute`)}
                    `)
                    .setFooter("Auto Moderation: Mute Bypass")
                ModLogChannel.send(MuteBypassMessageLog);
            }
        }else{
            return;
        }

        //Chat Filter
        if (db.get("AutoModeration.ChatFilter") == "1"){
            let msg = message.content.toLowerCase();
            for (x = 0; x < profanities.length; x++){
                if (msg.includes(profanities[x])){
                    message.delete();
                    db.add(`{AMPSChatFilter}_${message.author.id}`, 1);

                    //Chat Response
                    const ChatFilterMessage = new discord.MessageEmbed()
                        .setTimestamp()
                        .setColor("#FFFF00")
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setDescription(`
                            ${message.author}, cursing **isn't** allowed!
                        `)
                        .setFooter("Auto Moderation: Chat Filter")
                    message.channel.send(ChatFilterMessage).then(message => {
                        message.delete({timeout: 15000});
                    });

                    //Logged Response
                    const ChatFilterMessageLog = new discord.MessageEmbed()
                        .setTimestamp()
                        .setColor("#FFFF00")
                        .setAuthor("Chat Filter | "+message.author.tag, message.author.displayAvatarURL())
                        .setDescription(`
                            **User:** ${message.author}
                            **Channel:** ${message.channel}
                            **Message:** ${message.content}
                        `)
                        .setFooter("Auto Moderation: Chat Filter")
                    ModLogChannel.send(ChatFilterMessageLog);
                }
            }
        }else{
            return;
        }
        //Discord Invite Checker
        if (db.get("AutoModeration.DiscordInviteChecker") == "1"){
            if (message.content.includes('discord.gg/'||'discordapp.com/invite/')){
                message.delete();

                //Chat Response
                const DiscordInviteWarning = new discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("")//Leave empty
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription(`
                        ${message.author}, Discord invites aren't allowed!
                    `)
                    .setFooter("Auto Moderation: Discord Invite")
                message.channel.send(DiscordInviteWarning).then(message => {
                    message.delete({timeout: 15000});
                });

                //Logged Response
                const DiscordInviteWarningLog = new discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("")//Leave empty
                    .setAuthor("Discord Invite | "+message.author.tag, message.author.displayAvatarURL())
                    .setDescription(`
                        **User:** ${message.author}
                        **Channel:** ${message.channel}
                        **Message:** ${message.content}
                    `)
                    .setFooter("Auto Moderation: Discord Invite")
                ModLogChannel.send(DiscordInviteWarningLog);
            }
        }else{
            return;
        }
    }else{
        return;
    }
});

//Auto Moderation | Edited Messages
bot.on('messageUpdate', (oldMessage, newMessage) => {
    if (db.get("settings.AutoModeration")== 1){
        if (db.get("AutoModeration.EditedMessageLogger") == 1){
            if (newMessage.guild === null)return;
            if(newMessage.embeds.length > 0)return;
            if (!oldMessage.author) return;
            const MessageLog = bot.channels.cache.find(channel => channel.id === EditedMessagesLogChannelID);
            if(newMessage == null)return;

            const EditedMessage = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("")//Leave empty
                .setAuthor("Edited Message | "+newMessage.author.tag, newMessage.author.displayAvatarURL())
                .setDescription(`
                    **User:** ${newMessage.author}
                    **Channel:** ${newMessage.channel}
                    **Original Message:** ${oldMessage}

                    **New Message:** ${newMessage}
                `)
                .setFooter("Auto Moderation: Edited Message")
            MessageLog.send(EditedMessage);
        }
    }
});

//Auto Moderation | Deleted Messages
bot.on('messageDelete', async (message) => {
    if (db.get("settings.AutoModeration")== 1) {
        if (db.get("AutoModeration.DeletedMessageLogger") == "1"){
            if (message.guild === null)return;
            if(message.embeds.length > 0)return;
            let ModLogChannel = message.guild.channels.cache.get(DeletedMessageLogChannelID);
            const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());
            let user = ""
            if (entry.extra.channel.id === message.channel.id
            && (entry.target.id === message.author.id)
            && (entry.createdTimestamp > (Date.now() - 5000))
            && (entry.extra.count >= 1)) {
              user = entry.executor
            }else{ 
              user = message.author;
            }

            const DeletedMessageLog = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#fc3c3c")
                .setThumbnail(user.displayAvatarURL())
                .setAuthor("Deleted Message | "+message.author.tag, message.author.displayAvatarURL())
                .setDescription(`
                    **Executor:** ${user}
                    **Author:** ${message.author}
                    **Channel:** ${message.channel}
                    **Message:** ${message.content}
                `)
                .setFooter("Auto Moderation: Deleted Message")
            ModLogChannel.send(DeletedMessageLog);
        }else {
            return;
        }
    }else{
        return;
    }
});

//Dead Chat Pings
bot.on('ready', () => {
    setInterval(() => {
        if (db.get("settings.DeadChatPings")== 1){
            const DCPQuestion = Math.floor(Math.random() * DeadChatQuestions.length);
            const DeadChatMessage = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("RANDOM")
                .attachFiles('./Images/DCP_Question.png')
                .setThumbnail('attachment://DCP_Question.png')
                .setTitle("Dead Chat Ping!")
                .addField(DeadChatQuestions[DCPQuestion], `<@&${DCPRoleID}>`)
            let PingChannel = bot.channels.cache.get(DCPChannelID);
            PingChannel.send(DeadChatMessage);

            function DCP(message){
                PingChannel.send(`Dead Chat Ping! <@&${DCPPingRoleID}>`).then(message => {
                    message.delete();
                });
            }
        }else{
            return;
        }
    }, ms(`${PingTime}`));
});