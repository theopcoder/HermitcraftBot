const Commando = require("discord.js-commando"); //This dependency allows for the use of commands using the Discord.js-commando framework. Refer to https://discord.js.org/#/docs/commando/master/general/welcome for help!
const discord = require("discord.js"); //This dependency allows for the use of Discord features built into Discord. Refer to https://discord.js.org/#/docs/main/stable/general/welcome for help!
const db = require("quick.db"); //This dependency is for a sqlite database for the bot to store data. Refer to https://quickdb.js.org/docs.html for help!
const BotToken = require("./bot_token.js");
const Errors = require("./BotData.js");
const client = new discord.Client();

const bot = new Commando.Client({
    commandPrefix: "-"
});

const TOKEN = key;

bot.registry.registerGroup("admin", 'Admin');
bot.registry.registerGroup("economy", 'Economy');
bot.registry.registerGroup("simple", 'Simple');
bot.registry.registerGroup("support", 'Support');
bot.registry.registerGroup("war", 'WarCommands');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.on('ready', function(){
    console.log(`${bot.user.tag} successfully launched on version ${Version}!`)
    bot.user.setActivity("Does any one actually read these?");//Use to be bot.user.setGame
});

bot.login(TOKEN);

bot.on('guildMemberAdd', member => {
    const Welcomemsg = new discord.RichEmbed()
        .setColor('0x008080')
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL)
        .setTitle(`Welcome to ${member.guild.name} ${member.user.tag}!`)
        .addField("Information:", 
        `
            :globe_with_meridians: Discord: https://discord.gg/AURDPCN
            :satellite: Minecraft IP: <#704460219521957907>
        `)
        .addField("Member:", `${member}, you are the ${member.guild.memberCount} member! Thanks for joining!`)
        .addField("Other:", `Welcome to the ${member.guild.name}. Make sure to read <#689198026488545334> and <#704460219521957907> for the Minecraft server IP. Have fun and enjoy!`)
    let WelcomeChannel = member.guild.channels.get('689198081857552463')
    WelcomeChannel.send(Welcomemsg);

    let memberRole = member.guild.roles.find("name", "Member")
    member.addRole(memberRole)

    const UserWelcomemsg = new discord.RichEmbed()
        .setColor('0x008080')
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL)
        .setTitle(`Thank you for joining ${member.guild.name}!`)
        .addField("Information:", 
        `
            :globe_with_meridians: Discord: https://discord.gg/AURDPCN
            :satellite: Minecraft IP: <#704460219521957907>
        `)
        .addField("Thanks for joining!", "Thank you for taking the time and joining the server! To get caught up, we highly suggest you read <#689198026488545334> and <#704460219521957907>! Thanks and have a great day!")
    member.sendEmbed(UserWelcomemsg)
});

bot.on('message', function(message){
    if (message.content == "Bob Bingi")
    {
        if (message.author.bot)return;
        message.channel.send("It's the one and only Bob Bingi! Introducing Markiplier and B.B! https://www.youtube.com/watch?v=0Pocn8aSWS4 make sure to watch!");
    }
    if (message.content == "1234")
    {
        if (message.author.bot)return;
        message.reply("I declare a Ginger war!");
    }
    if (message.content == "pizza")
    {
        if (message.author.bot)return;
        message.channel.send("I like pizza! Can I have a slice "+message.author+"?");
    }
});

bot.on('message', function(message){
    //Bypass Protection Systems
    if (db.get(`{CurrentlyMuted}_${message.author.id}`)== 1)//Mute Bypass Protection (Refered to as: MBP)
    {
        message.delete()
        let role = message.guild.roles.find(role => role.name === "Muted");
        if (role) 
        message.member.addRole(role)
        db.add(`{AMPSMuteBypass}_${message.author.id}`, 1);

        let MuteBypassCheckmsg = db.get(`{AMPSMuteBypass}_${message.author.id}`);
        const MuteBypassProtection = new discord.RichEmbed()
            .setColor(0x668d3c)
            .setThumbnail(message.author.avatarURL)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle("Auto Moderation: Mute Bypass")
            .addField("User:", message.author)
            .addField("Times Bypassed Mute:", MuteBypassCheckmsg)
            .addField("What is this?", "This is an Mute Bypass Protection System to check if you have bypassed your mute! If you are reading this, that means you have bypassed you mute and the mute role has been automatically reapplied to you!")
        message.channel.sendEmbed(MuteBypassProtection);
    }
    //Auto Moderation
    //Chat Filter
    const BadWords =                                                                                                                                                                                                                                            ["fish", "bitch", "fuck", "shit"];
    if( BadWords.some(word => message.content.includes(word))){//If you don't like seeing curse words, dont scroll to the side. Chat filter ==>
        if (message.author.bot)return;
        message.delete();
        db.add(`{AMPSChatFilter}_${message.author.id}`, 1)
        const ChatFilterWarnmsg = new discord.RichEmbed()
            .setColor("0xFFFF00")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle("Auto Moderation: Chat Filter")
            .setAuthor(message.author.tag, message.author.avatarURL)
            .addField("User:", message.author)
            .addField("Information", `Please follow chat rules on this server! Make sure to read <#689198026488545334>! This is your **${db.get(`{AMPSChatFilter}_${message.author.id}`)}** time cursing on this server!`)
            .setFooter("This is Auto Moderation Protection System (AMPS): Chat Filter")
        message.channel.sendEmbed(ChatFilterWarnmsg);
    }
});
//Deleted Messages Warning
bot.on("messageDelete", async msg => {
    if (msg.author.bot)return;
    let logs = await msg.guild.fetchAuditLogs({type: 72});
    let entry = logs.entries.first();
        
    let DeletedMessageAlert = new discord.RichEmbed()
        .setColor("#fc3c3c")
        .setTimestamp()
        .setThumbnail(msg.author.avatarURL)
        .setTitle("**DELETED MESSAGE**")
        //LNC
        .setAuthor(msg.author.tag, msg.author.avatarURL)
        .setDescription(`**Author:** ${msg.author.tag}\n**Executor**: ${entry.executor}\n**Channel:** ${msg.channel}\n**Message:** ${msg.content}`)
        .setFooter(`Message ID: ${msg.id}\nAuthor ID: ${msg.author.id}`)
    let MessageChannel = msg.guild.channels.find(x => x.name === 'deleted-messages');
    MessageChannel.send(DeletedMessageAlert);
    });

//Message Level System (Refered to as MLS)
bot.on('message', function(message){
    if (message.content.includes(""))
    {
        if (message.author.bot)return;
        if (db.get("MLS")== 0)return;
        if (db.get("MLS")== null)return;
        db.add(`{xp}_${message.author.id}`, 1)

        if (db.get(`{xp}_${message.author.id}`)== 60){
            db.add(`{Level}_${message.author.id}`, 1)
            db.add(`{money}_${message.author.id}`, 100)
            db.subtract(`{xp}_${message.author.id}`, 60)
            const LevelUpmsg = new discord.RichEmbed()
                .setColor('0x0000FF')
                .setTimestamp()
                .setThumbnail(message.author.avatarURL)
                .setTitle("Level Up!")
                .addField("User:", message.author)
                .addField("Level:", db.get(`{Level}_${message.author.id}`))
            let LevelChannel = message.guild.channels.get('733418756247781516')
            LevelChannel.send(LevelUpmsg);
        }
    }
});