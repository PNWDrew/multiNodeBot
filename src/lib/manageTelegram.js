const winston                   = require('winston');
const constTelegram             = require('./constTelegram');
const manageNodes               = require('./manageNodes');
const manageServer              = require('./manageServer');
const manageIntent              = require("./manageIntent");
const { bot }                   = require('./initTelegram');
const { checkBlockHeight }      = require('./manageNodes');
const { testAuthenticationOTP } = require("./auth");

let promptIntent = {};

const parseMessage = async (settings, msg) => {
    let msgText = msg.text;

    if (settings.chatId == ""){
        sendMessage( msg.chat.id, "Your ChatID: " + msg.chat.id );
        return;
    }
    if (settings.chatId != msg.chat.id) return;

    promptIntent = manageIntent.getIntent();

    //******************************************************************************************************//
    //                                    direct replies no 2FA (menue)                                     //
    //******************************************************************************************************//
    if (msgText.toLowerCase().indexOf('menu') !== -1) {                                                     // reply to menu
        manageIntent.cleanIntent();
        sendMessage(settings.chatId,'👋 Hey! How can I help you?', constTelegram.mainMenu);

    } else if (msgText.toLowerCase().indexOf('cancel') !== -1) {                                            // reply to cancel request
        manageIntent.cleanIntent();
        sendMessage(settings.chatId,'👋 Hey! Back to main.', constTelegram.mainMenu);

    } else if (msgText.indexOf('Back') !== -1) {                                                            // reply to back request
        manageIntent.cleanIntent();
        sendMessage(settings.chatId,'👋 Hey! Back to main.', constTelegram.mainMenu);

    } else if ( msgText.toLowerCase().indexOf('start') !== -1 && 
                msgText.toLowerCase().indexOf('restart') == -1) {                                           // reply to start menu
        manageIntent.cleanIntent();
        sendMessage(settings.chatId,'👋 Hey! Back to main.', constTelegram.mainMenu);

    } else if (msgText.toLowerCase().indexOf('servers') !== -1) {                                           // reply to servers menu
        sendMessage(settings.chatId,'👋 Your servers:', getServersMenu(settings) );

    } else if (msgText.toLowerCase().indexOf('tools') !== -1) {                                             // reply to tools menu
        sendMessage(settings.chatId,'👋 Your tools:', constTelegram.toolsMenu() );

    } else if (msgText.indexOf('🔎 Logs') !== -1) {                                                         // reply to logs menu
        let nodeName = msgText.toLowerCase().substring(8, msgText.length);                                  // for a specific node
        let selectedNode = settings.remoteNodes.filter(node => node.name.toLowerCase() == nodeName);
        sendMessage(settings.chatId,'👋 Your logs', constTelegram.logsMenu(selectedNode) );

    // find out if the received text just consists of a server name. If yes: send menu for that specific server.
    } else if (foundServername(msgText, settings)) {
        let selectedNodeArray = settings.remoteNodes.filter(node => node.name.toLowerCase() == msgText.toLowerCase());
        let serverMenu = constTelegram.serverMenu(selectedNodeArray);
        sendMessage(settings.chatId,'👋 Hey! Server menu for: ', serverMenu);

    //******************************************************************************************************//
    //                                     direct replies no 2FA (logs)                                     //
    //******************************************************************************************************//
    } else if (msgText.indexOf('📄 Recent logs') !== -1) {                                                  // reply to recent logs request
        let nodeName = msgText.toLowerCase().substring(15, msgText.length);                                 // for a specific node
        let selectedNode = settings.remoteNodes.filter(node => node.name.toLowerCase() == nodeName);
        manageServer.getServerLogs(selectedNode, 'recent').then( (retValue) => {
            sendMessage(settings.chatId, retValue.message );
        });

    } else if (msgText.indexOf('⚠️ Forks cause') !== -1) {                                                  // reply to fork cause logs request
        let cause = msgText.substring(15, 16);
        let nodeName = msgText.toLowerCase().substring(17, msgText.length);                                 // for a specific node
        let selectedNode = settings.remoteNodes.filter(node => node.name.toLowerCase() == nodeName);
        manageServer.getServerLogs(selectedNode, 'fork', cause).then( (retValue) => {
            sendMessage(settings.chatId, retValue.message );
        });

    } else if (msgText.indexOf('Logs All Forks') !== -1) {                                                  // reply to fork cause logs request
        let cause = "all";
        let nodeName = msgText.toLowerCase().substring(15, msgText.length);                                 // for a specific node
        let selectedNode = settings.remoteNodes.filter(node => node.name.toLowerCase() == nodeName);
        manageServer.getServerLogs(selectedNode, 'fork', cause).then( (retValue) => {
            sendMessage(settings.chatId, retValue.message );
        });

    } else if (msgText.indexOf('Logs SIGKILL') !== -1) {                                                    // reply to fork cause logs request
        let cause = "SIGKILL";
        let nodeName = msgText.toLowerCase().substring(13, msgText.length);                                 // for a specific node
        let selectedNode = settings.remoteNodes.filter(node => node.name.toLowerCase() == nodeName);
        manageServer.getServerLogs(selectedNode, 'fork', cause).then( (retValue) => {
            sendMessage(settings.chatId, retValue.message );
        });

    } else if (msgText.indexOf('Logs SIGABRT') !== -1) {                                                    // reply to fork cause logs request
        let cause = "SIGABRT";
        let nodeName = msgText.toLowerCase().substring(13, msgText.length);                                 // for a specific node
        let selectedNode = settings.remoteNodes.filter(node => node.name.toLowerCase() == nodeName);
        manageServer.getServerLogs(selectedNode, 'fork', cause).then( (retValue) => {
            sendMessage(settings.chatId, retValue.message );
        });

    } else if (msgText.indexOf('Logs Consensus') !== -1) {                                                  // reply to fork cause logs request
        let cause = "Consensus";
        let nodeName = msgText.toLowerCase().substring(15, msgText.length);                                 // for a specific node
        let selectedNode = settings.remoteNodes.filter(node => node.name.toLowerCase() == nodeName);
        manageServer.getServerLogs(selectedNode, 'fork', cause).then( (retValue) => {
            sendMessage(settings.chatId, retValue.message );
        });

    //******************************************************************************************************//
    //                                         direct replies no 2FA                                        //
    //******************************************************************************************************//
    } else if (msgText.toLowerCase().indexOf('block heights') !== -1) {                                     // reply to block heights request
        manageNodes.checkBlockHeights(settings).then( (retValue) => {
            sendMessage(settings.chatId, retValue.message );
        });

    } else if (msgText.toLowerCase().indexOf('block height') !== -1) {                                      // reply to block height request
    let nodeName = msgText.toLowerCase().substring(16, msgText.length);                                     // for a specific node
    let selectedNode = settings.remoteNodes.filter(node => node.name.toLowerCase() == nodeName);
    manageNodes.checkBlockHeight(settings, selectedNode).then( (retValue) => {
        sendMessage(settings.chatId, retValue.message );
    });

    } else if (msgText.toLowerCase().indexOf('server status') !== -1) {                                     // reply to get server status
        let nodeName = msgText.toLowerCase().substring(17, msgText.length);
        let selectedNode = settings.remoteNodes.filter(node => node.name.toLowerCase() == nodeName);
        manageServer.getServerStatus(selectedNode).then( (retValue) => {
            sendMessage(settings.chatId, retValue.message );
        });

    //******************************************************************************************************//
    //                                                Intents                                               //
    //******************************************************************************************************//
    } else if (msgText.toLowerCase().indexOf('test 2fa') !== -1) {
        if (!promptIntent.waitingPrompt){
            manageIntent.setIntent(manageIntent.intents.ASK_PASSWORD_TEST, msgText);
            sendMessage(settings.chatId,'🔐 Please provide the password to test 2FA..', constTelegram.cancelMenu());
        }
 
    } else if (msgText.toLowerCase().indexOf('forge on') !== -1) {                                          // set intent to forge on
        if (!promptIntent.waitingPrompt){
            manageIntent.setIntent(manageIntent.intents.ASK_PASSWORD_SET_FORGING_ON, msgText);
            sendMessage(settings.chatId,'🔐 Please provide the password to switch forging on..', constTelegram.cancelMenu());
        }

    } else if (msgText.toLowerCase().indexOf('forge off') !== -1) {                                         // set intent to forge on
        if (!promptIntent.waitingPrompt){
            manageIntent.setIntent(manageIntent.intents.ASK_PASSWORD_SET_FORGING_OFF, msgText);
            sendMessage(settings.chatId,'🔐 Please provide the password to switch forging off..', constTelegram.cancelMenu());
        }
 
    } else if (msgText.toLowerCase().indexOf('restart') !== -1) {                                           // set intent restart core
        if (!promptIntent.waitingPrompt){
            manageIntent.setIntent(manageIntent.intents.ASK_PASSWORD_RESTART, msgText);
            sendMessage(settings.chatId,'🔐 Please provide the password to restart core..', constTelegram.cancelMenu());
        }

    //******************************************************************************************************//
    //                                           Actions after 2FA                                          //
    //******************************************************************************************************//
    } else if ( promptIntent.waitingPrompt && promptIntent.lastMessage != "" && msgText != "" ) {
        const otpToken = msgText.toString();
        const validOTP = await testAuthenticationOTP(otpToken, true);
        let lMsgText = promptIntent.lastMessage;

        if (promptIntent.lastIntent == manageIntent.intents.ASK_PASSWORD_TEST &&                            // do 2FA test and reply
            promptIntent.lastMessage.toLowerCase().indexOf('test 2fa') !== -1 ){
            if (validOTP)
                sendMessage(settings.chatId, '✅ Your password works!!', constTelegram.mainMenu );
            else
                sendMessage(settings.chatId, 'Password NOT OK' );
            
            manageIntent.cleanIntent();   
        }

        if (promptIntent.lastIntent == manageIntent.intents.ASK_PASSWORD_SET_FORGING_ON &&                  // do forge on and reply
            promptIntent.lastMessage.toLowerCase().indexOf('forge on') !== -1 ){

            if (validOTP){
                let nodeName = lMsgText.toLowerCase().substring(12, lMsgText.length);
                let selectedNode = settings.remoteNodes.filter(node => node.name.toLowerCase() == nodeName);
                manageNodes.setForgingOn(selectedNode).then( ( retValue ) => {
                    sendMessage(settings.chatId, retValue.message, constTelegram.mainMenu );
                });
            }
        }

        if (promptIntent.lastIntent == manageIntent.intents.ASK_PASSWORD_SET_FORGING_OFF &&                  // do forge off and reply
            promptIntent.lastMessage.toLowerCase().indexOf('forge off') !== -1 ){

            if (validOTP){      
                let nodeName = lMsgText.toLowerCase().substring(13, lMsgText.length);
                let selectedNode = settings.remoteNodes.filter(node => node.name.toLowerCase() == nodeName);
                manageNodes.setForgingOff(selectedNode).then( ( retValue ) => {
                    sendMessage(settings.chatId, retValue.message, constTelegram.mainMenu );
                });
            }
        }

        if (promptIntent.lastIntent == manageIntent.intents.ASK_PASSWORD_RESTART &&                         // do restart and reply
            promptIntent.lastMessage.toLowerCase().indexOf('restart') !== -1 ){

            if (validOTP){
                let nodeName = lMsgText.toLowerCase().substring(11, lMsgText.length);
                let selectedNode = settings.remoteNodes.filter(node => node.name.toLowerCase() == nodeName);
                manageNodes.restartCore(selectedNode).then( ( retValue ) => {
                    sendMessage(settings.chatId, retValue.message, constTelegram.mainMenu );
                });
            }
        }

        if (validOTP)
            manageIntent.cleanIntent();
        else
            sendMessage(settings.chatId, 'Sorry, password NOT OK. Please try again or select Cancel' );
            
//**********************************************************************************************************//

    } else if (msgText == "") {
        winston.log('warn', 'Received unknown telegram message!');
    } else {
        winston.log('warn', 'Received unknown telegram message!');
        sendMessage(settings.chatId,"👋 Hey. Sorry. I didn't understand that command");
    }
};

//**********************************************************************************************************//
//                                                                                                          //
//                                          helper functions                                                //
//                                                                                                          //
//**********************************************************************************************************//

function sendMessage(chatId, msgText, msgMenu){
    if (msgMenu)
        bot.sendMessage( chatId, msgText, msgMenu );
    else
        bot.sendMessage( chatId, msgText, { parse_mode: 'HTML' } );
}

function foundServername(messageText, settings){
    for (node of settings.remoteNodes){
        //console.log(node.name);
        if (node.name == messageText)
            return true;
    }
    return false;
}

function getServersMenu(settings){
    const MAX_BUTTONS_IN_ROW = 3;
    let arrayKeyboard = [];
    let arrayLine = [];
    let iCounter = 0;
    let iRowCounter = 0;

    for (let node of settings.remoteNodes){

        // set menu items in row
        if (iRowCounter >= MAX_BUTTONS_IN_ROW){
            iRowCounter=0;
            arrayLine = [];
        }
        arrayLine.push( node.name );
        iRowCounter++;
        iCounter++;

        // add complete line to Keyboard Array
        if ( (iRowCounter == MAX_BUTTONS_IN_ROW) || (iCounter >= settings.remoteNodes.length) ) {
            arrayKeyboard.push(arrayLine);
        }        
    }

    arrayLine = ['❌ Cancel'];
    arrayKeyboard.push(arrayLine);

    let serversMenu = {
        reply_markup: {
          keyboard: arrayKeyboard
        }
    };

    return serversMenu;
}

exports.parseMessage = parseMessage;
exports.sendMessage = sendMessage;
