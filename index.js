const Commando = require('discord.js-commando'); //This dependency allows for the use of commands using the Discord.js-commando framework. Refer to https://discord.js.org/#/docs/commando/master/general/welcome for help!
const discord = require('discord.js'); //This dependency allows for the use of Discord features built into Discord. Refer to https://discord.js.org/#/docs/main/stable/general/welcome for help!
const db = require('quick.db'); //This dependency is for a sqlite database for the bot to store data. Refer to https://quickdb.js.org/docs.html for help!
const client = new discord.Client();

const bot = new Commando.Client({
    commandPrefix: "-"
})

var Version = "0.2.0";

const TOKEN = ''//Hide token

bot.registry.registerGroup("admin", 'Admin');
bot.registry.registerGroup("support", 'Support');
bot.registry.registerGroup("war", 'WarCommands');
bot.registry.registerGroup("economy", 'Economy');
bot.registry.registerGroup("simple", 'Simple');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.on('ready', function(){
    console.log('Successfully launched HermitcraftBot!');
    bot.user.setActivity("Hermitcraft Fan Server");//Use to be bot.user.setGame
});

bot.login(TOKEN);

bot.on("guildMemberAdd", function (member)
{
    member.send("Hello. Welcome "+member.guild.name+". Thank you for joining. This is a fan server for Hermitcraft. Make sure to read #rules and have fun!");
    let memberRole = member.guild.roles.find("name", "Member");
    member.addRole(memberRole);
});

bot.on('guildMemberAdd', member => {
    var chance = Math.floor(Math.random() * 8); //The original # is 8
    if (chance == 0)
    {//To send to multiple channels, do ...get('1234', '5678')
        member.guild.channels.get('637691117999095809').send('Welcome, ' +member+ " to, "+member.guild.name+". There are now, "+member.guild.memberCount+" members! Thank you for joining!");
    }
});

bot.on('message', function(message){
    /*if (message.content == "") These are examples of what I could do for the bot responses/detections
    if (message.content.includes)
    {
        if (message.author.bot)return;
        message.reply("")
        message.channel.send("")
    }*/
    if (message.content == "Bob Bingi")
    {
        message.channel.send("It's the one and only Bob Bingi! Introducing Markiplier and B.B! https://www.youtube.com/watch?v=0Pocn8aSWS4 make sure to watch!")
    }
    const swearWords = ["test", "meep"]; //Do ["example1", "example2" to continue on the list!]
    if( swearWords.some(word => message.content.includes(word))){
        //message.delete()
        message.reply('It works!!!')
        message.reply("I like pizza and the commit was successful!")
        /*.then(msg => {
            msg.delete(10000)
        })*/
    }
});

//Message Level System (Refered to as MLS)
bot.on('message', function(message){
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