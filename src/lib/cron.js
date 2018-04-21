const cron                    = require("node-cron");
const winston                 = require('winston');
const { checkBlockHeights }   = require("./manageNodes");
const { sendMessage }         = require("./manageTelegram");
const settings                = require("../config");

cron.schedule("* * * * *", () => {
  //Every minute
  if (!settings.executeBlockHeightsCron) return;
  winston.log('silly',"Excuting block heights check");
  checkBlockHeights(settings)
    .catch((e) => {
      winston.log('debug',e);
      sendMessage(settings.chatId, "Checking block height cron failed!" );
    })
    .then((retValue) => {
      if(retValue.status != "OK"){
        winston.log('debug',retValue.message);
        sendMessage(settings.chatId, retValue.message );
      }
    });
});

cron.schedule("* * * * *", () => {
  //Every minute
  if (!settings.executeServerStatusCron) return;
  winston.log('silly',"Excuting server status check");
});
