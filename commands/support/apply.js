const BotConfiguration = require("../../Configuration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const token = require("../../Token.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class ApplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'apply',
			group: 'support',
			memberName: 'apply',
			description: 'Apply for staff!',
		});
	}

    //TODO Work on -apply command/fix the issues with it

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        if (db.get("settings.StaffApplications")== 0){
            message.reply("Sorry, staff applications are currently closed!");
            return;
        }
        let ApplyingUser = message.guild.member(message.mentions.users.first());
        let words = args.split(' ');
		let part1 = words.slice(1).join(' ');
        let reason = words.slice(2).join(' ');
        if (message.member.hasPermission("ADMINISTRATOR")){
            if (!ApplyingUser){
                const NullUserMessage = new discord.MessageEmbed()
                    .setColor()
                    .setDescription(NullUser)
                message.channel.send(NullUserMessage).then(message => {
                    message.delete({timeout: 10000});
                });
                return;
            }
            if (ApplyingUser.hasPermission("MANAGE_MESSAGES")){
                const StaffUserMessage = new discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription(StaffUser)
                message.channel.send(StaffUserMessage).then(message => {
                    message.delete({timeout: 10000});
                });
                return;
            }
            if (db.get(`${message.mentions.users.first().id}.applications.Applicant`)== 0 || db.get(`${message.mentions.users.first().id}.applications.Applicant`)==null){
                const NonApplier = new discord.MessageEmbed()
                    .setColor()
                    .setDescription(`:warning: That user has not applied for staff!`)
                message.channel.send(NonApplier).then(message => {
                    message.delete({timeout: 10000});
                });
                return;
            }
            if (!part1){
                const NoPartWarning = new discord.MessageEmbed()
                    .setColor()
                    .setDescription(`:warning: Do you want to accept or deny an application?`)
                message.channel.send(NoPartWarning).then(message => {
                    message.delete({timeout: 10000});
                });
                return;
            }
            if (!reason){
                const NoReasonWarning = new discord.MessageEmbed()
                    .setColor()
                    .setDescription(`:warning: Please supply a reason for the application!`)
                message.channel.send(NoReasonWarning).then(message => {
                    message.delete({timeout: 10000});
                });
                return;
            }
            if (words[1] == "accept"){
                db.set(`${message.mentions.users.first().id}.applications.Applicant`, 0);
                const AcceptMessage = new discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("#00FF00")
                    .setThumbnail(message.mentions.users.first().displayAvatarURL())
                    .setTitle("Accepted Application")
                    .setDescription(`
                        Congratulations, you have been accepted for part 2 of the staff application process!
                        The server owner will message you and have a private voice chat with you and personally interview you!
                        Make sure to have a microphone, a quiet place, and a date that will work for you for the interview!
                    `)
                ApplyingUser.send(AcceptMessage).catch(err =>
                    message.reply("Could not DM user. Requires manual conversation!")
                );

                const AcceptMessageLog = new discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("#FFFF00")
                    .setThumbnail(message.mentions.users.first().displayAvatarURL())
                    .setTitle("Accepted Application Confirmation")
                    .setDescription(`
                        **User:** ${ApplyingUser}
                        **User ID:** ${ApplyingUser.id}
                        **Message:** ${reason}
                    `)
                message.member.send(AcceptMessageLog);
                return;
            }
            if (words[1] == "deny"){
                db.set(`${message.mentions.users.first().id}.applications.Applicant`, 0);
                const DenyMessage = new discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("#0000FF")
                    .setThumbnail(message.mentions.users.first().displayAvatarURL())
                    .setTitle("Accepted Rejected")
                    .setDescription(`
                        I'm sorry, your application was rejected. Better luck next time.
                    `)
                ApplyingUser.send(DenyMessage).catch(err =>
                    message.reply("Could not DM user. Requires manual conversation!")
                );

                const DenyMessageLog = new discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("#FFFF00")
                    .setThumbnail(message.mentions.users.first().displayAvatarURL())
                    .setTitle("Accepted Application Denied")
                    .setDescription(`
                        **User:** ${ApplyingUser}
                        **User ID:** ${ApplyingUser.id}
                        **Message:** ${reason}
                    `)
                message.member.send(DenyMessageLog);
                return;
            }
            return;
        }
        if (message.member.hasPermission("MANAGE_MESSAGES")){
            message.reply("Sorry, your already a staff member! ;)");
            return;
        }
        let ApplicationAttempts = db.get(`${message.author.id}.applications.ApplicationAttempts`);
        let ViolationsCheck = db.get(`${message.author.id}.admin.Violations`);
        let LevelCheck = db.get(`${message.author.id}.basic.level`); if (LevelCheck == null)LevelCheck == "0";

        if (ApplicationAttempts > 2){//If this is 3, it doesn't work
            message.reply("Sorry, you have over 3 application attempts.");
            return;
        }
        if (ViolationsCheck > 3){
            message.reply("Sorry, you have over 3 violations.");
            return;
        }
        if (LevelCheck < 15){
            message.reply("Sorry, you must be level 15 or higher to apply.");
            return;
        }

		let Violations = db.get(`${message.author.id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Warnings = db.get(`${message.author.id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let Mutes = db.get(`${message.author.id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.author.id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.author.id}.admin.Bans`); if (Bans == null)Bans = "0";

        const ApplicationMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#0xde9a12")
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle("Application")
            .setDescription(`
                Please fill out your application [here!](${ApplicationLink})
            `)
            .setFooter(`Do NOT share this link! This is your ${db.get(`${message.author.id}.applications.ApplicationAttempts`)}/3 attempt!`)
        message.member.send(ApplicationMessage).catch(err => {
            db.set(`${message.author.id}.applications.StopMessage`, 1);
        }).then(() => {
            if (db.get(`${message.author.id}.applications.StopMessage`) == 1){
                message.reply("I could not DM you! Please let me message you, then try again!");
                db.set(`${message.author.id}.applications.StopMessage`, 0);
                return;
            }else{
                message.reply("Check your DM's!");
                db.set(`${message.author.id}.applications.Applicant`, 1);
                db.add(`${message.author.id}.applications.ApplicationAttempts`, 1);
                const UserApplicationInfo = new discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("#0000FF")
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTitle("Application")
                    .setDescription(`
                        **User:** ${message.author}
                        **User ID:** ${message.author.id}
                        **Attempt:** ${db.get(`${message.author.id}.applications.ApplicationAttempts`)}/3
                        **Total Offences:** ${Violations}
                        **Other Offences:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
                    `)
                let ApplicationChannel = message.guild.channels.cache.get(ApplicationChannelID);
                ApplicationChannel.send(UserApplicationInfo);
            }
        });
	}
};