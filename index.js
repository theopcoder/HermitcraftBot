const BootLoader = require("./BootLoader.js");
BootLoader.StartUpChecks();
const Configuration = require("./config.js");
const discord = require('discord.js');
const Token = require("./Token.js");
const fs = require('fs')

//XXX Move these into their own files
//TODO ephemeral can make messages public or private

const bot = new discord.Client({
    messageCacheLifetime: 60,
    fetchAllMembers: true,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    allowedMentions: {
      parse: ["roles", "users", "everyone"],
      repliedUser: true,
    },
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: ["GUILDS", "GUILD_BANS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
});

bot.aliases = new discord.Collection();
bot.slash = new discord.Collection();

//now creating interaction event
["events","slash"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

//Normal code again

bot.login(key);

bot.on("ready", function() {
    console.log("Bot is now online!");
});

bot.on('messageCreate', function(message){
    //Checks
    if (message.author.bot)return;
    //Message Listeners
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
    if (message.content == "UnusAnnus"){
        message.reply("Momento Mori");
    }
    //Level Up System

});

//Auto Moderation

//Dead Chat Pings

//TODO add a check for repeated messages?