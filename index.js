const Commando = require("discord.js-commando"); //This dependency allows for the use of commands using the Discord.js-commando framework. Refer to https://discord.js.org/#/docs/commando/master/general/welcome for help!
const discord = require("discord.js"); //This dependency allows for the use of Discord features built into Discord. Refer to https://discord.js.org/#/docs/main/stable/general/welcome for help!
const db = require("quick.db"); //This dependency is for a sqlite database for the bot to store data. Refer to https://quickdb.js.org/docs.html for help!
const BotToken = require("./bot_token.js");
const Errors = require("./BotData.js");
const client = new discord.Client();

const bot = new Commando.Client({
    commandPrefix: "-"
});

bot.registry.registerGroup("admin", 'Admin');
bot.registry.registerGroup("economy", 'Economy');
bot.registry.registerGroup("simple", 'Simple');
bot.registry.registerGroup("staffsignup", 'StaffSignUp');
bot.registry.registerGroup("support", 'Support');
bot.registry.registerGroup("war", 'WarCommands');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.on('ready', function(){
    bot.user.setActivity("Does any one actually read these?");
    console.log(`Successfully logged into ${bot.user.tag}!\nVersion: ${Version}`);
});

const TOKEN = key;
bot.login(TOKEN);

bot.on('guildMemberAdd', member => {
    const WelcomeMessage = new discord.RichEmbed()
        .setTimestamp()
        .setColor("0x008080")
        .setThumbnail(member.user.displayAvatarURL)
        .setTitle(`Welcome to ${member.guild.name} ${member.user.tag}!`)
        .setDescription(`
            **Information:**
            :globe_with_meridians: Discord: https://discord.gg/AURDPCN
            :satellite: Minecraft IP: <#704460219521957907>
            **Member:**
            ${member}, you are the ${member.guild.memberCount} member!
            Don't forget to read <#689198026488545334> and <#704460219521957907>!
        `)
    let WelcomeChannel = member.guild.channels.get('689198081857552463');
    WelcomeChannel.send(WelcomeMessage);

    let memberRole = member.guild.roles.find("name", "Member");
    member.addRole(memberRole);

    const UserWelcomemsg = new discord.RichEmbed()
        .setColor('0x008080')
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL)
        .setTitle(`Thank you for joining ${member.guild.name}!`)
        .addField("Information:", `
            :globe_with_meridians: Discord: https://discord.gg/AURDPCN
            :satellite: Minecraft IP: <#704460219521957907>
        `)
        .addField("Support:", "For help on linking your Discord and Minecraft account, visit <#730659493641453619>")
        .addField("Thanks for joining!", "Thank you for taking the time and joining the server! To get caught up, we highly suggest you read <#689198026488545334> and <#704460219521957907>! Thanks and have a great day!")
    member.sendEmbed(UserWelcomemsg);
});

bot.on('guildMemberRemove', member => {
    const WelcomeMessage = new discord.RichEmbed()
    .setTimestamp()
    .setColor("#00008b")
    .setThumbnail(member.user.displayAvatarURL)
    .setTitle(`Lost a member`)
    .setDescription(`
        ${member} left the server :(
    `)
    let WelcomeChannel = member.guild.channels.get('715377790811242527');
    WelcomeChannel.send(WelcomeMessage);
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
    if (message.content == "4321")
    {
        message.reply("Are you sure about that?");
    }
    if (message.content == "pizza")
    {
        if (message.author.bot)return;
        message.channel.send(`I like pizza! Can I have a slice ${message.author}?`);
    }
    if (message.content == "test"){
        if (message.author.bot)return;
        message.reply(Error1);
    }
});

//Mute Bypass Protection (Refered to as: MBP)
bot.on('message', function(message){
    if (db.get(`{CurrentlyMuted}_${message.author.id}`)== 1){
        message.delete();
        let role = message.guild.roles.find(role => role.name === "Muted");
        if (role)
        message.member.addRole(role);
        db.add(`{AMPSMuteBypass}_${message.author.id}`, 1);

        let MuteBypassCheckmsg = db.get(`{AMPSMuteBypass}_${message.author.id}`);
        const MuteBypassProtection = new discord.RichEmbed()
            .setColor('0x668d3c')
            .setThumbnail(message.author.displayAvatarURL)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTitle("Auto Moderation: Mute Bypass")
            .addField("User:", message.author)
            .addField("Times Bypassed Mute:", MuteBypassCheckmsg)
            .addField("What is this?", "If you are seeing this, that means you have managed to bypass your mute! You have been automatically remuted!")
        message.channel.sendEmbed(MuteBypassProtection);
    }
});

//Chat Filter
var profanities =                                                                                                                                                                                                                                                ["bitch", "fuck", "shit"];
bot.on('message', async message => {//If you don't like seeing curse words, dont scroll to the side. Chat filter ==>
    let msg = message.content.toLowerCase();
    for (x = 0; x < profanities.length; x++){
        if (msg.includes(profanities[x])){
            message.delete()
            db.add(`{AMPSChatFilter}_${message.author.id}`, 1)
            const ChatFilterWarnmsg = new discord.RichEmbed()
                .setColor("0xFFFF00")
                .setTimestamp()
                .setThumbnail(message.author.avatarURL)
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setTitle("Auto Moderation: Chat Filter")
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .addField("User:", message.author)
                .addField("Information", `Please follow chat rules on this server! Make sure to read <#689198026488545334>! This is your **${db.get(`{AMPSChatFilter}_${message.author.id}`)}** time cursing on this server!`)
                .setFooter("This is Auto Moderation Protection System (AMPS): Chat Filter")
            message.channel.sendEmbed(ChatFilterWarnmsg).then(msg => {
                msg.delete(15000);
            });
            return;     
        }
    }
});

//Deleted Messages System
bot.on('messageDelete', async (message) => {
    const logs = message.guild.channels.find(channel => channel.name === "deleted-messages");
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
    
    let DeletedMessageAlert = new discord.RichEmbed()
        .setTimestamp()
        .setColor("#fc3c3c")
        .setThumbnail(message.author.displayAvatarURL)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTitle("**DELETED MESSAGE**")
        .setDescription(`**Author:** ${message.author}\n**Executor:** ${user}\n**Channel:** ${message.channel}\n **Message:** ${message.content}`)
        .setFooter(`Message ID: ${message.id}\nAuthor ID: ${message.author.id}`)
    logs.send(DeletedMessageAlert);
});

//Message Level System (Refered to as MLS)
bot.on('message', function(message){
    if (message.content.includes(""))
    {
        if (message.author.bot)return;
        if (db.get("MLS")== 0)return;
        if (db.get("MLS")== null)return;
        if (message.channel.id === '689198918252232713')return;
        db.add(`{xp}_${message.author.id}`, 1);

        if (db.get(`{xp}_${message.author.id}`)== 60){
            db.add(`{Level}_${message.author.id}`, 1);
            db.add(`{money}_${message.author.id}`, 200);
            db.subtract(`{xp}_${message.author.id}`, 60);
            const LevelUpmsg = new discord.RichEmbed()
                .setColor('0x0000FF')
                .setTimestamp()
                .setThumbnail(message.author.displayAvatarURL)
                .setTitle("Level Up!")
                .addField("User:", message.author)
                .addField("Level:", db.get(`{Level}_${message.author.id}`))
                .setFooter("You have recieved $200! Nice job!")
            let LevelChannel = message.guild.channels.get('733418756247781516');
            LevelChannel.send(LevelUpmsg);
        }
    }
});