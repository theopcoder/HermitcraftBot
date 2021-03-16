const { CommandoClient } = require("discord.js-commando"); //Refer to https://discord.js.org/#/docs/commando/master/general/welcome for help.
const BadWords = require("./BadWords.js");//Imports the curse words for the Chat Filter Module.
const BotData = require("./BotData.js");//Imports custom BotData information for the bot.
const discord = require("discord.js"); //Refer to https://discord.js.org/#/docs/main/stable/general/welcome for help.
const token = require("./Token.js"); //Imports the token key for the bot to launch.
const db = require("quick.db"); //Refer to https://quickdb.js.org/overview/docs for help.
const path = require("path");

const bot = new CommandoClient({
	commandPrefix: BotPrefix,
});

bot.registry
	.registerDefaultTypes()
	.registerGroups([
        ['admin', 'Admin'],
        ['bot', "Bot"]
        ['economy', 'Economy'],
        ['simple', 'Simple'],
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

//Default Bot Settings | Don't touch!
if (db.get("StaffApplicationsSetting")== null)db.add("StaffApplicationsSetting", StaffApplicationsSetting);
if (db.get("AutoModerationSetting")== null)db.add("AutoModerationSetting", AutoModerationSetting);
if (db.get("DeadChatPingSetting")== null)db.add("DeadChatPingSetting", DeadChatPingSetting);
if (db.get("LevelUpsSetting")== null)db.add("LevelUpsSetting", LevelUpsSetting);
//---------------------------------------------------------------------------

//New Members
bot.on('guildMemberAdd', member => {
    const NewMemberMessage = new discord.MessageEmbed()
        .setColor("#90ee90")
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle(`Welcome to ${member.guild.name}, ${member.user.tag}!`)
        .addField("Information:", `
            :shopping_cart: https://store.pedestriamc.com/
            :globe_with_meridians: https://www.pedestriamc.com/
            :satellite: play.pedestriamc.com
        `)
        .addField("Welcome", "Don't forget to read <#703833697153187840> and <#704893263177580544>! Have fun!")
    let NewMemberChannel = member.guild.channels.cache.get(WelcomeChannelID);
    NewMemberChannel.send(NewMemberMessage);

    let MemberRole = member.guild.roles.cache.get(NewMemberRoleID);
    member.roles.add(MemberRole);
});

//Message Responses
bot.on('message', function(message){
    //Auto Data Transfer
    if (db.get(`${message.author.id}.DataTransferComplete`)== null){
        if(message.author.bot)return;
        let RepP = db.get(`{reputation}_${message.author.id}`); if (RepP == null)RepP = "0";
        let Level = db.get(`{Level}_${message.author.id}`); if (Level == null)Level = "0";
        let Money = db.get(`{money}_${message.author.id}`); if (Money == null)Money = "0";
        let WarnP = db.get(`{warnp}_${message.author.id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.author.id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.author.id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.author.id}`); if (BanP == null)BanP = "0";
		let XP = db.get(`{xp}_${message.author.id}`); if (XP == null)XP = "0";
	
		db.add(`${message.author.id}.admin.Violations`, RepP);
		db.add(`${message.author.id}.admin.Warnings`, WarnP);
		db.add(`${message.author.id}.admin.Kicks`, KickP);
		db.add(`${message.author.id}.admin.Mutes`, MuteP);
		db.add(`${message.author.id}.basic.level`, Level);
		db.add(`${message.author.id}.basic.money`, Money);
		db.add(`${message.author.id}.admin.Bans`, BanP);
		db.add(`${message.author.id}.basic.xp`, XP);

		db.add(`${message.author.id}.DataTransferComplete`, 1);
    }
    //Random XP for Level Ups
    if(db.get("LevelUpsSetting")== 0){
        return;
    }else{
        if (message.author.bot)return;
        if (message.guild === null)return;
        var RandomXP = Math.floor(Math.random() * MaxRandomXP);
        db.add(`${message.author.id}.basic.xp`, RandomXP);
    }
    //Level Up System
    if (db.get(`${message.author.id}.basic.xp`) > MaxXP){
        if (message.author.bot)return;
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
    
    if (message.content == "1234"){
        if (message.author.bot)return;
        message.reply("I declare a Ginger war!");
    }
    if (message.content == "4321"){
        if (message.author.bot)return;
        message.reply("Are you sure about that?");
    }
    if (message.content == "pizza"){
        if (message.author.bot)return;
        message.reply("Can I have a slice of pizza? Please?");
    }
});

//Auto Moderation
bot.on('message', function(message){
    if (db.get(`AutoModerationSetting`)== 0){
        return;
    }else{
        if (message.guild === null)return;
        if (message.author.bot)return;
        //Mute Bypass Protection
        if (MuteBypassProtectionSetting == "1"){
            if (db.get(`${message.author.id}.admin.CurrentlyMuted`)== 1){
                message.delete();
                db.add(`${message.author.id}.admin.TimesBypassedMute`, 1);
                let MuteRole = message.guild.roles.cache.get(MuteRoleID);
                message.member.roles.add(MuteRole);
    
                const MuteBypassMessage = new discord.MessageEmbed()
                    .setColor("#4b5054")
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTitle("Mute Bypass")
                    .setDescription(`
                        **User:** ${message.author}
                        **Time Bypassed Mute:** ${db.get(`${message.author.id}.admin.TimesBypassedMute`)}
                    `)
                message.channel.send(MuteBypassMessage);
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
                        .setColor("0xFFFF00")
                        .setTimestamp()
                        .setThumbnail(message.author.displayAvatarURL())
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setTitle("Auto Moderation: Chat Filter")
                        .setDescription(`${message.author}, cursing is **NOT** allowed on this server!`)
                    message.channel.send(ChatFilterMessage).then(message => {
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
                    .setThumbnail(message.author.displayAvatarURL())
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setTitle("No Discord Invites")
                    .setDescription(`${message.author} Discord invites aren't allowed here!`)
                message.channel.send(DiscordInviteWarning);
            }
        }else{
            return;
        }
    }
});

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