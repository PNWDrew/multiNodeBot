// MY CONFIG (tool_462 MAINNET)

// Telegram settings
exports.telegramAPIToken = "487437457:AAGN6cvDod2Cz6N0ycVzkElOE2K4gkpwBOU"; // Your telegram bot API key. Ask the @botfather for an api key
exports.chatId = "502459691"; // your telegram id. This will make sure that the msgs are sent only to you

// 2AF settings (i.e. Google authenticator)
exports.OTPsecret = "FZRGMTBBHRBGW4Z2FBXVAN3LGVEWGQSTG4YGGR32JNKG6PBSIQ2Q"; // run "npm run generate-password" in order to get this setting

// Height check settings
exports.maxDeltaBlockHeight = 2; // The difference of block heights between your node and the others before triggering an alarm
exports.minNbrOfMatchingNodes = 3; // The difference of reference nodes that match your node before triggering an alarm

exports.rebootWelcome = true; // The reboot telegram message

exports.executeBlockHeightsCron = true;
exports.executeServerStatusCron = false;
exports.cpuThreshold = 50; // Sends a notification to the user when cpu usage is over this %
exports.spaceUsageThreshold = 50; // Sends a notification to the user when memory usage is over this %
exports.memoryThreshold = 50; // Sends a notification to the user when memory usage is over this %

//exports.liskPWDFolder = "/home/lisk/lisk-main"; // the path of your lisk node

exports.remoteNodes = [
  {
    url: "http://188.68.51.83",
    port: ":11000",
    name: "tool_462",
    secret: "stable history expire mimic amateur shove proof nephew tobacco often adult reason",
    monitorServicePort: ":8080",
    status: "",
    monitor: true
  },
  {
    url: "http://173.249.34.4",
    port: ":11000",
    name: "tool_462_bu_Co",
    secret: "stable history expire mimic amateur shove proof nephew tobacco often adult reason",
    monitorServicePort: ":8080",
    status: "",
    monitor: true
  },
  {
    //url: "http://5.45.96.250",
    url: "http://127.0.0.1",
    port: ":8000",
    name: "local02",
    secret: "",
    monitorServicePort: ":8080",
    status: "",
    monitor: false
  }
];

exports.referenceNodes = [
  //nodes to check for the block heights
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
