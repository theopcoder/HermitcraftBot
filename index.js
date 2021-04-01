const { CommandoClient } = require("discord.js-commando");
const BotConfiguration = require("./BotConfiguration.js");
const BadWords = require("./BadWords.js");
const BotData = require("./BotData.js");
const discord = require("discord.js");
const token = require("./Token.js");
const db = require("quick.db");
const path = require("path");

const bot = new CommandoClient({
	commandPrefix: BotPrefix,
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
    console.log(`Running Version: ${Version}`);
});

//-----------------------

//New Members
bot.on("guildMemberAdd", member => {
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
        .setThumbnail(member.user.displayAvatarURL)
        .setTitle("Lost a member")
        .setDescription(`
            ${member} (${member.name}) left the server :(
        `)
    let MemberLeaveChannel = member.guild.channels.cache.get(MemberLeaveChannelID);
    MemberLeaveChannel.send(MemberLeaveMessage);
});

//member.send("We're sorry to see you go. If you don't mind, can you tell us why you left? https://forms.gle/UbyAV2Nze9ni24mx5");



bot.on('message', function(message){
    //Level Up System
    if (db.get(`LevelUpSystem`)== 1){//TODO Replace null with value
        //XP Generator
        if (message.author.bot)return;
        if (message.guild === null)return;
        var RandomXP = Math.floor(Math.random() * MaxRandomXP);
        db.add(`${message.author.id}.basic.xp`, RandomXP);

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
                .setFooter(`You have recieved $${LevelUpMoney}! Nice job!`)
            let LevelUpChannel = message.guild.channels.cache.get(LevelUpChannelID);
            LevelUpChannel.send(LevelUpMessage);
        }
    }else{
        return;
    }
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
});

//Auto Moderation
bot.on('message', function(message){
    if (db.get(`AutoModerationSetting`)== null){//TODO Replace null with value
        if (message.guild === null)return;
        if (message.author.bot)return;
        let ModLogChannel = message.guild.channels.cache.get(ModLogID);
        //Mute Bypass Protection
        if (MuteBypassProtectionSetting == "1"){
            if (db.get(`${message.author.id}.admin.CurrentlyMuted`)== 1){
                message.delete();
                db.add(`${message.author.id}.admin.TimesBypassedMute`, 1);
                let MuteRole = message.guild.roles.cache.get(MuteRoleID);
                message.member.roles.add(MuteRole);

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
                ModLogChannel.send(MuteBypassMessage);
            }
        }else{
            return;
        }
        //Chat Filter
        if (ChatFilterSetting == "1"){
            let msg = message.content.toLowerCase();
            for (x = 0; x < profanities.length; x++){
                if (msg.includes(profanities[x])){
                    message.delete();
                    db.add(`{AMPSChatFilter}_${message.author.id}`, 1);
                    const ChatFilterMessage = new discord.MessageEmbed()
                        .setTimestamp()
                        .setColor("0xFFFF00")
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setDescription(`
                            ${message.author}, cursing **isn't** allowed!
                        `)
                        .setFooter("Auto Moderation: Chat Filter")
                    message.channel.send(ChatFilterMessage).then(message => {
                        ModLogChannel.send(ChatFilterMessage);
                        message.delete({timeout: 15000});
                    });
                }
            }
        }else{
            return;
        }
        //Discord Invite Checker
        if (DiscordInviteSetting == "1"){
            if (message.content.includes('discord.gg/'||'discordapp.com/invite/')){
                message.delete();
                
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
            }
        }else{
            return;
        }
    }else{
        return;
    }
});


//NOTE Unchecked code below
//===---|||---===//===---|||---===//===---|||---===//===---|||---===//===---|||---===//===---|||---===//===---|||---===//===---|||---===//===---|||---===//===---|||---===

//Default Bot Settings | Don't touch!
//if (db.get("StaffApplicationsSetting")== null)db.add("StaffApplicationsSetting", StaffApplicationsSetting);
//if (db.get("AutoModerationSetting")== null)db.add("AutoModerationSetting", AutoModerationSetting);
//if (db.get("DeadChatPingSetting")== null)db.add("DeadChatPingSetting", DeadChatPingSetting);
//if (db.get("LevelUpsSetting")== null)db.add("LevelUpsSetting", LevelUpsSetting);
//---------------------------------------------------------------------------

//TODO move Deleted Messages into the auto moderation section.
//Deleted Messages
bot.on('messageDelete', async (message) => {
    if (db.get("AutoModerationSetting")== 0){
        return;
    }else{
        if (message.guild === null)return;
        if (DeletedMessagesSetting == "1"){
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
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setTitle("Deleted Message")
                .setDescription(`
                    **Executor:** ${user}
                    **Author:** ${message.author}
                    **Channel:** ${message.channel}
                    **Message:** ${message.content}
                `)
                .setFooter(`Message ID: ${message.id}\nAuthor ID: ${message.author.id}`)
            let DeletedMessageLogChannel = message.guild.channels.cache.get(DeletedMessageLogChannelID);
            DeletedMessageLogChannel.send(DeletedMessageLog);
        }else{
            return;
        }
    }
});

//Dead Chat Pings
bot.on('ready', () => {
    setInterval(() => {
        //TODO Update questions
        var DeadChatQuestion = Math.round(Math.random() * 31);
        if (DeadChatQuestion == 0){DCPQuestion = "What is the most valuable thing you currently have ingame?"};
        if (DeadChatQuestion == 1){DCPQuestion = "What movie or book character do you most identify with?"};
        if (DeadChatQuestion == 2){DCPQuestion = "As a child, what did you wish to be when you grew up?"};
        if (DeadChatQuestion == 3){DCPQuestion = "Are we seeing signs of evolution in our species?"};
        if (DeadChatQuestion == 4){DCPQuestion = "What's a trait do you like most about yourself?"};
        if (DeadChatQuestion == 5){DCPQuestion = "What are you currently working on in Survival?"};
        if (DeadChatQuestion == 6){DCPQuestion = "Why is science so important to modern society?"};
        if (DeadChatQuestion == 7){DCPQuestion = "What are you currently working on in WarLands?"};
        if (DeadChatQuestion == 8){DCPQuestion = "What is your favorite form of transportation?"};
        if (DeadChatQuestion == 9){DCPQuestion = "What's the worst thing you ever did as a kid?"};
        if (DeadChatQuestion == 10){DCPQuestion = "What is your favorite version of Minecraft?"};
        if (DeadChatQuestion == 11){DCPQuestion = "Is time relative to a person or universal?"};
        if (DeadChatQuestion == 12){DCPQuestion = "What song always puts you in a good mood?"};
        if (DeadChatQuestion == 13){DCPQuestion = "What's the weirdest quirk you find funny?"};
        if (DeadChatQuestion == 14){DCPQuestion = "Survival, Creative or Hardcore Minecraft?"};
        if (DeadChatQuestion == 15){DCPQuestion = "What do you like to do on the weekends?"};
        if (DeadChatQuestion == 16){DCPQuestion = "Would you say you make friends easily?"};
        if (DeadChatQuestion == 17){DCPQuestion = "What do you like to do on a rainy day?"};
        if (DeadChatQuestion == 18){DCPQuestion = "What's your favourite type of music?"};
        if (DeadChatQuestion == 19){DCPQuestion = "What is your favourite Disney movie?"};
        if (DeadChatQuestion == 20){DCPQuestion = "What's your favorite activity?"};
        if (DeadChatQuestion == 21){DCPQuestion = "Laptop, Desktop or Handheld?"};
        if (DeadChatQuestion == 22){DCPQuestion = "What's your favorite food?"};
        if (DeadChatQuestion == 23){DCPQuestion = "Java or Bedrock Minecraft?"};
        if (DeadChatQuestion == 24){DCPQuestion = "What's your first memory?"};
        if (DeadChatQuestion == 25){DCPQuestion = "Windows, MacOS or Linux?"};
        if (DeadChatQuestion == 26){DCPQuestion = "Playstation Or Xbox?"};
        if (DeadChatQuestion == 27){DCPQuestion = "How have you been?"};
        if (DeadChatQuestion == 28){DCPQuestion = "Iphone or Android?"};
        if (DeadChatQuestion == 29){DCPQuestion = "Do you have pets?"};
        if (DeadChatQuestion == 30){DCPQuestion = "Airplane or Car?"};

        const DeadChatMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("RANDOM")
            .setTitle("Dead Chat Ping!")
            .addField(DCPQuestion, `<@&${DCPPingRoleID}>`)
        let PingChannel = bot.channels.cache.get(DCPChannelID);
        PingChannel.send(DeadChatMessage);

        function DCP(message){
            PingChannel.send(`Dead Chat Ping! <@&${DCPPingRoleID}>`).then(message => {
                message.delete();
            }); 
        }
    }, 1000 * 60 * 60 * PingTime);
});