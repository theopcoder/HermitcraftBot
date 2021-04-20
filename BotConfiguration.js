var BotConfiguration = [//TODO move over required components for 2.0.0 update to BotConfiguration2
    //--------------------------------------------------
    //Bot Configuration---------------------------------
    StaffApplicationsSetting = "0",
    AutoModerationSetting = "1",
    DeadChatPingSetting = "1",
    LevelUpsSetting = "0",
    //--------------------------------------------------
    //Channel Configuration-----------------------------
    WelcomeChannelID = "799862812884074566",
    NewMemberRoleID = "799863064455282689",
    //--------------------------------------------------
    //Admin Configuration-------------------------------
    DeletedMessageLogChannelID = "799862866475220992",
    LogChannelID = "799862844253798441",
    MuteRoleID = "799863227269775371",
    ApplicationChannelID = "833571972150591508",
    //--------------------------------------------------
    //Auto Moderation Configuration---------------------
    MuteBypassProtectionSetting = "1",
    DeletedMessagesSetting = "1",
    DiscordInviteSetting = "1",
    ChatFilterSetting = "1",
    //--------------------------------------------------
    //Dead Chat Ping Configuration----------------------
    DCPPingChannelID = "704802753565949992",
    DCPPingRoleID = "705577160328347658",
    DCPTime = "6",
    //--------------------------------------------------
    //Support Channel Configuration---------------------
    TicketStaffPingRoleID = "747186171750252645",//maybe
    TicketLogChannelID = "767032869473878066",//maybe
    TicketCategoryID = "767029093379473438",//maybe
    PollChannelID = "799863719998783545",
];

var BotConfiguration2 = [
    //======================
    //BotConfiguration======
        BotPrefix = "-",
        BotID = "762199290365607936",
        ActivityMessage = "2.0.0 Early Access",
    //======================
    //AdminConfiguration====
        PurgeLogChannelID = "821310689976123393",
        ModLogID = "821310689976123393",
    //======================
    //SupportConfiguration==
        SuggestionChannelID = "799862897563795457",
        BugChannelID = "799862914545614888",
    //======================
    //LevelUpConfiguration==
        LevelUpChannelID = "799863344907419678",
        LevelUpMoney = "200",
        MaxRandomXP = "5",
        MaxXP = "10",//Make 150?
    //======================
    //DCPConfiguration======
        DCPPingRoleID = "825568176178855977",
        DCPChannelID = "799862796065308693",
        PingTime = "6",
    //======================
    //OtherConfiguration====
        SeasonRoleID = "825556515284844544",
    //======================//TODO Move this and make official later
    //MoveLater====
        MemberLeaveChannelID = "799862831183822868",
];

//---------------Configuration Help---------------//
//--------------------------
//##Bot Configuration


//BotPrefix: This is the prefix for commmands. Example -settings or !settings
//ActivityMessage: This is the message displayed under the bots name on Discord
//StaffApplicationSetting: This is where you can change the default setting for Staff Applications. 0 = off | 1 = on | There are no staff application points at this time!
//AutoModerationSetting: This is where you can change the default setting for Auto Modertation. 0 = off | 1 = on
//DeadChatPingSetting: This is where you can change the default setting for Dead Chat Pings. 0 = off | 1 = on
//LevelUpsSetting: This is where you can change the default setting for Level Ups. 0 = off | 1 = on


//--------------------------
//##Channel Configuration


//WelcomeChannelID: Put the ID of the channel you want new member messages to be sent to
//NewMemberRoleID: Put the ID of the role you want new members to get


//--------------------------
//##Admin Configuration


//DeletedMessageLogChannelID: The channel ID to log deleted messages
//PurgeLogChannelID: The channel ID to log message purges
//LogChannelID: The channel ID to log admin commands like bans, kicks, mutes, etc
//MuteRoleID: The role ID to apply to mute a user


//--------------------------
//##Auto Moderation Configuration


//MuteBypassProtection: Turn the Mute Bypass Protection off/on. 0 = off | 1 = on
//DeletedMessageSetting: Turn the Deleted Messages off/on. 0 = off | 1 = on
//DiscordInviteSetting: Turn the Discord Invite Protection off/on. 0 = off | 1 = on
//ChatFilterSetting: Turn the chat filter off/on. 0 = off | 1 = on


//--------------------------
//##Level Up Configuration


//LevelUpChannelID: Channel ID to send level up messages
//LevelUpMoney: The amount of money a user gets for each level up
//MaxRandomXP: The maximum amount of xp a user can get per message
//MaxXP: The amount of xp a user needs to level up


//--------------------------
//##Dead Chat Ping Configuration


//DCPPingChannelID: The channel to send the Dead Chat Ping in
//DCPPingRoleID: The role to ping for the Dead Chat Ping
//DCPTime: The amount of time in hours between pings


//--------------------------
//##Support Channel Configuration


//TicketStaffPingRoleID: The role tickets should ping when created
//SuggestionPingRoleID: The role to ping when there is a new suggestion
//SuggestionChannelID: The channel ID suggestion messages should go
//TicketLogChannelID: The channel ID Ticket logs should go
//BugReportChannelID: The channel ID bug report message go
//TicketCategoryID: The category ID tickets should be made under
//PollChannelID: The channel ID poll messages should go


//--------------------------
//##IMPORTANT


//For the bot configuration settings for groups of commands, once the json.sqlite file is made, you need to do -settings to change them from on/off!
//To have these changes take effect, you must turn the bot off then back on!
//Not configuring some of these fields may break the bot!


//------------------------------------------------//