const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const Errors = require("../../BotData.js");

class ApplyCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "apply",
            group: "staffsignup",
            memberName: 'apply',
            description: 'Lets you apply for staff!'
        });
    }

    async run(message, args)
    {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        if (db.get("closedrequests")== null)return message.channel.send(`I'm sorry ${message.author}, Staff applications are currently closed!`);
        if (db.get("closedrequests")== 0)return message.channel.send(`I'm sorry ${message.author}, Staff applications are currently closed!`);
        if (message.member.hasPermission("MANAGE_MESSAGES")){
            message.reply("Sorry, your already a staff member! ;)");
            return;
        }
        if (db.get(`{ApplicationSent}`)== 3){
            message.channel.send(`Sorry ${message.author}, You have sent over 3 application requests!`)
            return;
        }
        if(db.get(`{reputation}_${message.author.id}`) > 1){
            message.channel.send(`I'm sorry ${message.author}, you have over 1 reputation point.`)
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        if(db.get(`{Level}_${message.author.id}`) < 10)return message.reply("You need to be over level 10 to become a staff member! Do -rank to check your current level!");
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        if (words[0] == "answers"){
            message.delete();
            if (db.get(`{ApplicationSent}_${message.author.id}`)== 1){
                message.member.send("You already have an application pending for review! Please wait as staff review your application!")
                return;
            }
            if (!reason){
                message.reply("Please say your answers!");
                return;
            }
            let RepP = db.get(`{reputation}_${message.author.id}`); if (RepP == null)RepP = "0";
            let WarnP = db.get(`{warnp}_${message.author.id}`); if (WarnP == null)WarnP = "0";
            let MuteP = db.get(`{mutep}_${message.author.id}`); if (MuteP == null)MuteP = "0";
            let KickP = db.get(`{kickp}_${message.author.id}`); if (KickP == null)KickP = "0";
            let BanP = db.get(`{banp}_${message.author.id}`); if (BanP == null)BanP = "0";
            db.add(`{ApplicationSent}_${message.author.id}`, 1);
            db.add(`{ApplicationAttempts}_${message.author.id}`, 1);
            const ApplicationAnswers = new discord.RichEmbed()
                .setColor("#0000FF")
                .setTimestamp()
                .setThumbnail(message.author.avatarURL)
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setTitle("Application Answers")
                .addField('User:', `${message.author}`)
                .addField("User ID:", message.author.id)
                .addField("Application Attempts:", db.get(`{ApplicationAttempts}_${message.author.id}`)+"/3")
                .addField('Offences:', message.author+" has **"+RepP+"** offence(s).")
                .addField('Info:', message.author+' Has, '+WarnP+' Warning(s), '+MuteP+' Mute(s), '+KickP+' Kick(s), '+BanP+' Ban(s)!')
                .addField('Answers:', reason)
            let logchannel = message.guild.channels.find('name', 'applications');
            logchannel.send(ApplicationAnswers);
            
            const MessageUserApplication = new discord.RichEmbed()
                .setColor("0xde9a12")
                .setTimestamp()
                .setTitle("Application Questions")
                .addField("Application Attempts", db.get(`{ApplicationAttempts}_${message.author.id}`)+"/3")
                .addField("Your Application:", reason)
                .setFooter("Good luck! Remember, you only get 3 attempts!")
            message.member.sendEmbed(MessageUserApplication)
            return;
        }else{
            const ApplicationQuestions1 = new discord.RichEmbed()
                .setColor("0xde9a12")
                .setTitle("Application Questions")
                .addField("Questions:", 
                `
                1. How old are you?
                2. When did you join this discord server?
                3. Can you VoiceChat?
                4. Do you have Minecraft Java or Bedrock? (Java highly recomended)
                5. What's your Minecraft username
                6. Do you own the account? Is it a legit account?
                7. Are you able to record evidence/proof?
                8. Have you been staff on other servers?
                9. Have you been in trouble on this server? If so, what for? (Minecraft and Discord)
                10. How long have you had discord?
                11. Are you trust worthy?
                12. How active are you?
                13. Can you attent staff meetings?
                14. Do you have previous expirience with Coreprotect and other plugins?
                15. Do you read new anouncements, changes to rules and info and, stay up to date on whats going on?
                16. What time zone are you in?
                `)
            message.member.sendEmbed(ApplicationQuestions1)
            
            const ApplicationQuestions2 = new discord.RichEmbed()
                .setColor("0xde9a12")
                .setTimestamp()
                .addField("Questions Continued:", 
                `
                17. Will you follow and enforce all rules?
                18. Will you be able to attent staff training?
                19. How engaged are you with the community?
                20. Are you good at grammar/spelling?
                21. Do you have any questions?
                
                Note: Try being as accurate as possible and make sure to be honest! You only get 3 application attempts!
                `)
                .setFooter("To send your answers, do -apply answers 1. pizza 2. apple 3. ice cream!")
            message.member.sendEmbed(ApplicationQuestions2)
        }
    }
}

module.exports = ApplyCommand;