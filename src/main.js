'use strict';
require("./lib/cron");
require("./lib/initWinston");

const settings                        = require("./config");
const { checkBlockHeight }            = require("./lib/manageNodes");
const { parseMessage, sendMessage }   = require("./lib/manageTelegram");
const { bot }                         = require("./lib/initTelegram");
const manageIntent                    = require("./lib/manageIntent");

manageIntent.initPrompt();

if (settings.chatId && settings.rebootWelcome)
  sendMessage( settings.chatId, `🤖 Cheers, I've just been rebooted.` );

bot.on("message", async function(msg) {
  console.log(msg.text);
  parseMessage(settings, msg.text);
});
