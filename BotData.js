const BotConfiguration = require("./BotConfiguration.js");
const chalk = require("chalk");

var BotData = [
    Version = "2.1.0",
    BuildID = "2021.05.15.2.1.0",
    VN = "2.1.0 Update",//VN stands for Version Name
    Developer = "TheMLGDude#2177 | theopcoder",
    DeveloperDiscord = "TheMLGDude#2177",
    DeveloperGitHub = "theopcoder",
];

var DevPromt = [
    DevWarning = ":warning: You are attempting to access developer features that can cause damage! Proceed with caution!",
    DevAccess = ":no_entry_sign: Access Denied! :no_entry_sign:",
];

var Errors = [
    Error1 = ":warning: **Error 1:** You have no xp!",
    Error2 = ":shield: **Error 2:** Outdated bot version! Please update to the latest version for security patches and for the latest features!",
    Error3 = ":warning: **Error 3:** Sorry, this command/feature hasn't been implemented yet! Please check back in a future update!",
    Error4 = ":no_entry_sign: **Error 4:** You do NOT have the permission to perform this command!",
    Error5 = ":warning: **Error 5:** Invalid description or argument detected! Make sure your performing the command correctly and try again!",
    Error6 = ":warning: **Error 6:** There was no description given! Please give a description or argument!",
    StaffUser = ":no_entry_sign: Sorry, you can't perform this command on a staff member!",
    PermissionError = ":no_entry_sign: You don't have permission to use this command!",
    UserAlreadyUnmuted = ":warning: That user is already unmuted!",
    DMMessage = ":warning: You can't use this command in DM's!",
    UserAlreadyUnbanned = ":warning: That user isn't banned!",
    UserAlreadyMuted = ":warning: That user is already muted!",
    NullUser = ":warning: Sorry, I couldn't find that user!",
];

//Required Bot Setting Checks
var RequiredField = "0";
if (!BotPrefix){
    console.log(`⚠️: ${chalk.red(`BotPrefix is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!LogChannelID){
    console.log(`⚠️: ${chalk.red(`LogChannelID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!MuteRoleID){
    console.log(`⚠️: ${chalk.red(`MuteRoleID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!MuteBypassProtectionSetting){
    console.log(`⚠️: ${chalk.red(`MuteBypassProtectionSetting is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!DeletedMessagesSetting){
    console.log(`⚠️: ${chalk.red(`DeletedMessagesSetting is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!DiscordInviteSetting){
    console.log(`⚠️: ${chalk.red(`DiscordInviteSetting is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!ChatFilterSetting){
    console.log(`⚠️: ${chalk.red(`ChatFilterSetting is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!StaffApplicationsSetting){
    console.log(`⚠️: ${chalk.red(`StaffApplicationsSetting is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!AutoModerationSetting){
    console.log(`⚠️: ${chalk.red(`AutoModerationSetting is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!DeadChatPingSetting){
    console.log(`⚠️: ${chalk.red(`DeadChatPingSetting is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!LevelUpsSetting){
    console.log(`⚠️: ${chalk.red(`LevelUpsSetting is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!ApplicationChannelID){
    console.log(`⚠️: ${chalk.red(`ApplicationChannelID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!SuggestionChannelID){
    console.log(`⚠️: ${chalk.red(`SuggestionChannelID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!PollChannelID){
    console.log(`⚠️: ${chalk.red(`PollChannelID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!BugChannelID){
    console.log(`⚠️: ${chalk.red(`BugChannelID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!MemberLeaveChannelID){
    console.log(`⚠️: ${chalk.red(`MemberLeaveChannelID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!WelcomeChannelID){
    console.log(`⚠️: ${chalk.red(`WelcomeChannelID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!NewMemberRoleID){
    console.log(`⚠️: ${chalk.red(`NewMemberRoleID is empty! This is a required field!`)}`);
    RequiredField = "1";
}

//Highly recomended Bot Setting Checks
if (!BotID){
    console.log(`⚠️: ${chalk.yellow(`BotID is empty! Error's may occur if left empty!`)}`);
}
if (!ActivityMessage){
    console.log(`⚠️: ${chalk.yellow(`ActivityMessage is empty. This is an optional field.`)}`);
}
if (!DeletedMessageLogChannelID){
    console.log(`⚠️: ${chalk.yellow(`DeletedMessageLogChannelID is empty! Error's may occur if left empty!`)}`);
}
if (!ModLogID){
    console.log(`⚠️: ${chalk.yellow(`ModLogID is empty! Error's may occur if left empty!`)}`);
}
if (!LevelUpChannelID){
    console.log(`⚠️: ${chalk.yellow(`LevelUpChannelID is empty! Error's may occur if left empty!`)}`);
}
if (!ChannelExcludeID){
    console.log(`⚠️: ${chalk.yellow(`ChannelExcludeID is empty! Error's may occur if left empty!`)}`);
}
if (!LevelUpMoney){
    console.log(`⚠️: ${chalk.yellow(`LevelUpMoney is empty! Error's may occur if left empty!`)}`);
}
if (!RandomXP){
    console.log(`⚠️: ${chalk.yellow(`RandomXP is empty! Error's may occur if left empty!`)}`);
}
if (!MaxXP){
    console.log(`⚠️: ${chalk.yellow(`MaxXP is empty! Error's may occur if left empty!`)}`);
}
if (!DCPPingRoleID){
    console.log(`⚠️: ${chalk.yellow(`DCPPingRoleID is empty! Error's may occur if left empty!`)}`);
}
if (!DCPChannelID){
    console.log(`⚠️: ${chalk.yellow(`DCPChannelID is empty! Error's may occur if left empty!`)}`);
}
if (!PingTime){
    console.log(`⚠️: ${chalk.yellow(`PingTime is empty! Error's may occur if left empty!`)}`);
}
if (!SeasonRoleID){
    console.log(`⚠️: ${chalk.yellow(`SeasonRoleID is empty! Error's may occur if left empty!`)}`);
}

//Bot Shut off if required fields are left empty
if (RequiredField == "1"){
    console.log(chalk.green("You must fill in the required fields before the bot can turn on!"));
    process.exit();
}