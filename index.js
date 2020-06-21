const Commando = require('discord.js-commando'); //This dependency allows for the use of commands using the Discord.js-commando framework. Refer to https://discord.js.org/#/docs/commando/master/general/welcome for help!
const discord = require('discord.js'); //This dependency allows for the use of Discord features built into Discord. Refer to https://discord.js.org/#/docs/main/stable/general/welcome for help!
const db = require('quick.db'); //This dependency is for a sqlite database for the bot to store data. Refer to https://quickdb.js.org/docs.html for help!
const BotToken = require('./bot_token.js');
const Errors = require("./Errors.js");
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
    console.log('Successfully launched '+bot.user.tag);
    console.log(bot.user.tag+" is on version: "+Version)
    bot.user.setActivity("Hermitcraft Fan Server");//Use to be bot.user.setGame
});

bot.login(TOKEN);

bot.on("guildMemberAdd", function (member)
{
    member.send("Welcome "+member+" to "+member.guild.name+"! Thank you for joining. This is a fan server for Hermitcraft. Make sure to read #rules and #info and make sure to have fun!");
    let memberRole = member.guild.roles.find("name", "Member");
    member.addRole(memberRole);
});

/*bot.on('guildMemberAdd', member => {
    //To send to multiple channels, do ...get('1234', '5678')
    //member.guild.channels.get('689198918252232713').send('Welcome, ' +member+ " to, "+member.guild.name+". There are now, "+member.guild.memberCount+" members! Thank you for joining!");

    const NewMember = new discord.RichEmbed()
    .setColor(0x32CD32)
    .setThumbnail(bot.user.avatarURL)
    .setTitle("Welcome "+member.guild)
    .addField("Information", `Thank you for joining Hermitcraft Fan Server! The server now has ${member.guild.memberCount} members!`)
    member.guild.channels.get('689198918252232713').send(NewMember)
});*/

bot.on('message', function(message){
    if (message.content == "Bob Bingi")
    {
        if (message.author.bot)return;
        message.channel.send("It's the one and only Bob Bingi! Introducing Markiplier and B.B! https://www.youtube.com/watch?v=0Pocn8aSWS4 make sure to watch!");
    }
    if (message.content == "1234")
    {
        if (message.author.bot)return;
        message.reply("I declare a ginger war!");
    }
    if (message.content == "pizza")
    {
        if (message.author.bot)return;
        message.channel.send("I like pizza! Can I have a slice "+message.author+"?");
    }
});

//Message Level System (Refered to as MLS)
bot.on('message', function(message){//TODO add a scoreboard system
    if (message.content.includes(""))
    {
        if (message.author.bot)return;
        db.add(`{xp}_${message.author.id}`, 1)

        if (db.get(`{xp}_${message.author.id}`)==60)
        {
            db.add(`{Level}_${message.author.id}`, 1)
            db.add(`{money}_${message.author.id}`, 100)
            db.subtract(`{xp}_${message.author.id}`, 60)
            message.channel.send("Congrats, "+message.author+"! You have leveled up! You are now Level, "+db.get(`{Level}_${message.author.id}`));
        }
    }
})