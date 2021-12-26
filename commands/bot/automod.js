const BotConfiguration = require("../../Configuration.js");
const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class AutoModCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'automod',
			group: 'bot',
			memberName: 'automod',
			description: 'Control and change the bot settings.',
		});
	}

	run(message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
        let words = args.split(' ');
        let settings = words.slice(0).join(' ');

        if (settings == "help"){
            const AutoModHelpMessage = new discord.MessageEmbed()
                .setColor("#FFA500")
                .attachFiles('./Images/SettingsCog.png')
                .setThumbnail('attachment://SettingsCog.png')
                .setTitle("AutoMod Help")
                .setDescription(`
                    **(1)** Mute Bypass Protection
                    **(2)** Chat Filter
                    **(3)** Discord Invite Checker
                    **(4)** Edited Message Logger
                    **(5)** Deleted Message Logger

                    To turn a feature off or on, do -automod <number> on/off
                `)
            message.channel.send(AutoModHelpMessage);
            return;
        }

        //Mute Bypass Protection
        if (settings == "1 on"){
            db.set("AutoModeration.MuteBypassProtection", 1);
            const MuteBypassProtectionEnabledMessage = new discord.MessageEmbed()
                .setColor("#00FF00")
                .setDescription(`:white_check_mark: Successfully enabled Mute Bypass Protection!`)
            message.channel.send(MuteBypassProtectionEnabledMessage);
            return;
        }
        if (settings == "1 off"){
            db.set("AutoModeration.MuteBypassProtection", 0);
            const MuteBypassProtectionDisabledMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`:x: Successfully disabled Mute Bypass Protection!`)
            message.channel.send(MuteBypassProtectionDisabledMessage);
            return;
        }
        //ChatFilter
        if (settings == "2 on"){
            db.set("AutoModeration.ChatFilter", 1);
            const ChatFilterEnabledMessage = new discord.MessageEmbed()
                .setColor("#00FF00")
                .setDescription(`:white_check_mark: Successfully enabled Chat Filter!`)
            message.channel.send(ChatFilterEnabledMessage);
            return;
        }
        if (settings == "2 off"){
            db.set("AutoModeration.ChatFilter", 0);
            const ChatFilterDisabledMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`:x: Successfully turned disabled Chat Filter!`)
            message.channel.send(ChatFilterDisabledMessage);
            return;
        }
        //Discord Invite Checker
        if (settings == "3 on"){
            db.set("AutoModeration.DiscordInviteChecker", 1);
            const DiscordInviteCheckerEnabledMessage = new discord.MessageEmbed()
                .setColor("#00FF00")
                .setDescription(`:white_check_mark: Successfully enabled Discord Invite Checker!`)
            message.channel.send(DiscordInviteCheckerEnabledMessage);
            return;
        }
        if (settings == "3 off"){
            db.set("AutoModeration.DiscordInviteChecker", 0);
            const DiscordInviteCheckerDisabledMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`:x: Successfully disabled Discord Invite Checker!`)
            message.channel.send(DiscordInviteCheckerDisabledMessage);
            return;
        }
        //Edited Message Logger
        if (settings == "4 on"){
            db.set("AutoModeration.EditedMessageLogger", 1);
            const EditedMessageLoggerEnabledMessage = new discord.MessageEmbed()
                .setColor("#00FF00")
                .setDescription(`:white_check_mark: Successfully enabled Edited Message Logger!`)
            message.channel.send(EditedMessageLoggerEnabledMessage);
            return;
        }
        if (settings == "4 off"){
            db.set("AutoModeration.EditedMessageLogger", 0);
            const EditedMessageLoggerDisabledMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`:x: Successfully disabled Edited Message Logger!`)
            message.channel.send(EditedMessageLoggerDisabledMessage);
            return;
        }
        //Deleted Message Logger
        if (settings == "5 on"){
            db.set("AutoModeration.DeletedMessageLogger", 1);
            const DeletedMessageLoggerEnabledMessage = new discord.MessageEmbed()
                .setColor("#00FF00")
                .setDescription(`:white_check_mark: Successfully enabled Deleted Message Logger!`)
            message.channel.send(DeletedMessageLoggerEnabledMessage);
            return;
        }
        if (settings == "5 off"){
            db.set("AutoModeration.DeletedMessageLogger", 0);
            const DeletedMessageLoggerDisabledMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`:x: Successfully disabled Deleted Message Logger!`)
            message.channel.send(DeletedMessageLoggerDisabledMessage);
            return;
        }

        let MuteBypassProtection = db.get("AutoModeration.MuteBypassProtection"); if (MuteBypassProtection == 1)MuteBypassProtection = ":white_check_mark: On"; else MuteBypassProtection = ":x: Off"
        let ChatFilter = db.get("AutoModeration.ChatFilter"); if (ChatFilter == 1)ChatFilter = ":white_check_mark: On"; else ChatFilter = ":x: Off"
        let DiscordInviteChecker = db.get("AutoModeration.DiscordInviteChecker"); if (DiscordInviteChecker == 1)DiscordInviteChecker = ":white_check_mark: On"; else DiscordInviteChecker = ":x: Off"
        let EditedMessageLogger = db.get("AutoModeration.EditedMessageLogger"); if (EditedMessageLogger == 1)EditedMessageLogger = ":white_check_mark: On"; else EditedMessageLogger = ":x: Off"
        let DeletedMessageLogger = db.get("AutoModeration.DeletedMessageLogger"); if (DeletedMessageLogger == 1)DeletedMessageLogger = ":white_check_mark: On"; else DeletedMessageLogger = ":x: Off"

        const AutoModMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#FFA500")
            .attachFiles('./Images/SettingsCog.png')
            .setThumbnail('attachment://SettingsCog.png')
            .setTitle("AutoMod settings")
            .setDescription(`
                **(1) Mute Bypass Protection:** ${MuteBypassProtection}
                **(2) Chat Filter:** ${ChatFilter}
                **(3) Discord Invite Checker:** ${DiscordInviteChecker}
                **(4) Edited Message Logger:** ${EditedMessageLogger}
                **(5) Deleted Message Logger:** ${DeletedMessageLogger}
            `)
            .setFooter("-automod help")
        message.channel.send(AutoModMessage);
	}
};