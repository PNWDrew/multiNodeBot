// MY CONFIG (Delegate cluster MAINNET)
// Create a new file called "config.js" and replace all the fields with your configuration

// Telegram settings
exports.telegramAPIToken  = "487437457:asdfghjkyxcvbnmqwertzuio"; // Your telegram bot API key. Ask the @botfather for an api key
exports.chatId            = "1234567890"; // your telegram id. This will make sure that the msgs are sent only to you

// 2AF settings (i.e. Google authenticator)
exports.OTPsecret         = "QWERTZUIOPASDFGHJKLYXCVBNMYXCVBNASDFGHJQWERTZUI"; // run "npm run generate-password" in order to get this setting

// Height check settings
exports.maxDeltaBlockHeight = 2; // The difference of block heights between your node and the others before triggering an alarm
exports.minNbrOfMatchingNodes = 3; // The difference of reference nodes that match your node before triggering an alarm

exports.rebootWelcome = true; // The reboot telegram message

exports.executeBlockHeightsCron = true;
exports.executeServerStatusCron = false;
exports.cpuThreshold = 50; // Sends a notification to the user when cpu usage is over this %
exports.spaceUsageThreshold = 50; // Sends a notification to the user when memory usage is over this %
exports.memoryThreshold = 50; // Sends a notification to the user when memory usage is over this %

//Your nodes:
exports.remoteNodes = [
  {
    url: "http://123.45.67.89",
    port: ":11000",
    name: "DelegateName",
    secret: "history history history history history history history history history history history history",
    monitorServicePort: ":8080",
    status: "",
    monitor: true
  },
  {
    url: "http://123.45.67.89",
    port: ":11000",
    name: "DelegateName_BU",    // please do not use the string 'backup' or the button 'Back' will not work
    secret: "history history history history history history history history history history history history",
    monitorServicePort: ":8080",
    status: "",
    monitor: true
  }
];

exports.referenceNodes = [
  //reference nodes to check for the block heights
  {
    url: "https://node01.onzcoin.com",
    port: "",
    name: "onz01"
  },
  {
    url: "https://node02.onzcoin.com",
    port: "",
    name: "onz02"
  },
  {
    url: "https://node03.onzcoin.com",
    port: "",
    name: "onz03"
  },
//  {
//    url: "https://node04.onzcoin.com",
//    port: "",
//    name: "onz04"
//  },
  {
    url: "https://node05.onzcoin.com",
    port: "",
    name: "onz05"
  },
  {
    url: "https://node06.onzcoin.com",
    port: "",
    name: "onz06"
  },
  {
    url: "https://node07.onzcoin.com",
    port: "",
    name: "onz07"
  },
  {
    url: "https://node08.onzcoin.com",
    port: "",
    name: "onz08"
  },
  {
    url: "https://node09.onzcoin.com",
    port: "",
    name: "onz09"
  }
];
